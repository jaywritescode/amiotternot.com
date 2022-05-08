import { createWriteStream, unlink } from "node:fs";
import { pipeline } from "node:stream/promises";

import fetch from "node-fetch";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import _ from "lodash";

const db = new sqlite3.Database("pics.db");
sqlite3.verbose();

const loadEnv = dotenv.config({ path: ".env.local" });
if (loadEnv.error) {
  throw loadEnv.error;
}

function pixabayURL(keyword, page) {
  const query = [
    `key=${process.env.PIXABAY_API_KEY}`,
    `q=${keyword}`,
    "image_type=photo",
    "order=latest",
  ];
  if (page) {
    query.push(`page=${page}`);
  }

  return "https://pixabay.com/api/?" + query.join("&");
}

async function update(keyword) {
  db.serialize();
  db.run(
    "CREATE TABLE IF NOT EXISTS images " +
      "(id INTEGER PRIMARY KEY, keyword, original_id, source, width, height, " +
      "user, user_id, filename, created_on DEFAULT CURRENT_TIMESTAMP)"
  );
  db.run("CREATE TABLE IF NOT EXISTS votes (image_id REFERENCES images(id), is_otter)");

  const response = await fetch(pixabayURL(keyword));
  const { totalHits, hits } = await response.json();

  db.parallelize();
  const pageRequests = _.range(Math.ceil(totalHits / hits.length))
    .map((x) => x + 1)
    .map((page) => fetch(pixabayURL(keyword, page)));

  Promise.all(pageRequests)
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then((pages) =>
      Promise.allSettled(
        pages
          .map((page) => _.get(page, "hits"))
          .flatMap(_.identity)
          .map(async (record) => {
            const {
              id,
              pageURL,
              webformatURL,
              webformatWidth,
              webformatHeight,
              user_id,
              user,
            } = record;
            const filename = pageURL.match(/\/([^/]+)\/$/)[1] + ".jpg";

            if (!filename) {
              console.warn("Couldn't parse filename from page URL. Aborting.");
              return;
            }

            const image = await fetch(webformatURL);
            await pipeline(
              image.body,
              createWriteStream(`public/pics/${filename}`)
            );

            return db.run(
              "INSERT INTO images " +
                "(keyword, original_id, source, width, height, user, user_id, filename) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
              [
                keyword,
                id,
                pageURL,
                webformatWidth,
                webformatHeight,
                user,
                user_id,
                filename,
              ]
            );
          })
      )
    )
    .then(() => db.close());
}

async function remove(filename) {
  unlink(filename, (err) => {
    if (err) {
      throw err;
    }

    db.run("DELETE FROM images WHERE filename=?", path.basename(filename));
  });
}

import yargs from "yargs";
import path from "node:path";
const argv = await yargs(process.argv.slice(2))
  .scriptName("pixaby-pic-manager")
  .usage("$0 <cmd> [args]")
  .command(
    "update [keyword]",
    "get the most recent photos from pixabay",
    (yargs) => {
      yargs.positional("keyword", {
        type: "string",
        default: "otter",
        description: "the keyword to search for in pixabay",
      });
    }
  )
  .command(
    "delete [filenames...]",
    "delete photos from the filesystem and db",
    (yargs) => {
      yargs.positional("keyword", {
        type: "string",
        description: "the filename to delete",
      });
    }
  )
  .help().argv;

switch (_.head(argv._)) {
  case "update":
    update(argv.keyword);
    break;
  case "delete":
    argv.filenames.forEach(remove);
    break;
}

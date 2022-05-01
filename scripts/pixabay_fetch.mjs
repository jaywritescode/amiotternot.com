import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

import fetch from 'node-fetch';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';

const streamPipeline = promisify(pipeline);

const db = new sqlite3.Database(':memory:');

const loadEnv = dotenv.config({path: '.env.local'});
if (loadEnv.error) {
  throw loadEnv.error;
}

async function main(keyword) {
  const response = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${keyword}&image_type=photo`
  );

  const data = await response.json();
  const { hits } = data;

  const {
    id,
    webformatWidth,
    webformatHeight,
    user,
    user_id,
    webformatURL
  } = hits[0];
  const image = await fetch(webformatURL);
  const filename = webformatURL.match(/\/(g[0-9a-f]+_\d+\.jpg)$/)[1]
  await streamPipeline(image.body, createWriteStream(`public/pics/${filename}`));
  

  // const blob = await image.blob();
  
  // db.serialize(() => {
  //   db.run("CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, original_id, source, width, height, notes, data");

  //   db.run("INSERT INTO images VALUES (?, ?, ?, ?, ?, ?)", 
  //     [id, webformatURL, webformatWidth, webformatHeight, user, blob]);


  //   db.each("SELECT rowid AS id, original_id, source, width, height, notes, data FROM images", (err, row) => {
  //     console.log(row.id + ": " + row.info);
  //   })
  // });
}

main('ferret');
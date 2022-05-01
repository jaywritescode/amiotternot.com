import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import fetch from 'node-fetch';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import _ from 'lodash';

const db = new sqlite3.Database(':memory:');

const loadEnv = dotenv.config({path: '.env.local'});
if (loadEnv.error) {
  throw loadEnv.error;
}

async function main(keyword) {
  const response = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${keyword}&image_type=photo&order=latest`
  );

  const data = await response.json();
  const { hits } = data;
  const urls = hits.map(obj => _.get(obj, 'webformatURL'));
  
  fetchImages(keyword, urls);

  
  // db.serialize(() => {
  //   db.run("CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, original_id, source, width, height, notes, data");

  //   db.run("INSERT INTO images VALUES (?, ?, ?, ?, ?, ?)", 
  //     [id, webformatURL, webformatWidth, webformatHeight, user, blob]);


  //   db.each("SELECT rowid AS id, original_id, source, width, height, notes, data FROM images", (err, row) => {
  //     console.log(row.id + ": " + row.info);
  //   })
  // });
}

async function fetchImages(keyword, urls) {
  // let's do it synchronously first
  urls.forEach(async (url) => {
    const filename = url.match(/\/(g[0-9a-f]+_\d+\.jpg)$/)[1]
    if (!filename) {
      return;
    }

    const image = await fetch(url);
    await pipeline(image.body, createWriteStream(`public/pics/${filename}`));
  });
}


main('ferret');
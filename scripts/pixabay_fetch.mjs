import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import fetch from 'node-fetch';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import _ from 'lodash';

const db = new sqlite3.Database('pics.db');

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
//  const urls = hits.map(obj => _.get(obj, 'webformatURL'));

  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS images " + 
      "(id INTEGER PRIMARY KEY, keyword, original_id, source, width, height, notes, filename, votes DEFAULT 0, upvotes DEFAULT 0)")
  });

  hits.forEach(result => downloadAndProcessImage(keyword, result));
}

async function downloadAndProcessImage(keyword, result) {
  const {
    id,
    pageURL,
    type,
    tags,
    previewURL,
    previewWidth,
    previewHeight,
    webformatURL,
    webformatWidth,
    webformatHeight,
    largeImageURL,
    imageWidth,
    imageHeight,
    imageSize,
    views,
    downloads,
    collections,
    likes,
    comments,
    user_id,
    user,
    userImageURL,
  } = result;

  const filename = webformatURL.match(/\/(g[0-9a-f]+_\d+\.jpg)$/)[1];
  if (!filename) {
    return;
  }

  const image = await fetch(webformatURL);
  await pipeline(image.body, createWriteStream(`public/pics/${filename}`));

  db.serialize(() => {
    db.run("INSERT INTO images (keyword, original_id, source, width, height, notes, filename) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [keyword, id, webformatURL, webformatWidth, webformatHeight, JSON.stringify({ user, user_id }), filename])
  });
}

main('otter');
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("pics.db");
sqlite3.verbose();

export default function handler(req, res) {
  console.log("query: ", req.query);
  const {
    query: { image_id },
  } = req;

  db.serialize(() => {
    db.run("INSERT INTO votes VALUES (?, true)", image_id);
  });

  res.send(204);
}
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("pics.db");
sqlite3.verbose();

export default function handler(req, res) {
  const {
    query: { image_id },
  } = req;
  const body = JSON.parse(req.body);

  db.serialize(() => {
    db.run(
      "INSERT INTO votes (image_id, is_otter) VALUES (?, ?)",
      image_id,
      body.isOtter
    );
  });

  res.send(204);
}

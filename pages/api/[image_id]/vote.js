import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL + "?sslmode=disable",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  const {
    query: { image_id },
  } = req;
  const body = JSON.parse(req.body);

  await client.connect();

  client.query(
    "INSERT INTO amiotternot.votes (image_id, is_otter) VALUES (?, ?)",
    image_id,
    body.isOtter
  );

  res.send(204);
}

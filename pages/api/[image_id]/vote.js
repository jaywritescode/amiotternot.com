import { Client } from "pg";

const clientConn = Object.assign(
  {},
  {
    connectionString: process.env.DATABASE_URL,
  },
  process.env.ENVIRONMENT == "prod"
    ? { ssl: { rejectUnauthorized: false } }
    : {}
);

export default async function handler(req, res) {
  const {
    query: { image_id },
  } = req;
  const body = JSON.parse(req.body);

  const client = new Client(clientConn);
  await client.connect();

  client.query(
    "INSERT INTO amiotternot.votes (image_id, is_otter) VALUES ($1, $2)",
    [image_id, body.isOtter]
  );

  res.send(204);
}

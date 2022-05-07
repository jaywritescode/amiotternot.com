import { ButtonGroup, Heading, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { Attribution, OtterButton} from "../components";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { keyword, width, height, user, user_id, filename } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h1" size="3xl" fontFamily="primary" color="green.600">
          Am I Otter Not?!?
        </Heading>

        <Text color="yellow.800" fontFamily="secondary">
          {"mustelids don't give a shit"}
        </Text>

        <Stack>
          <Image
            src={`/pics/${filename}`}
            width={width}
            height={height}
            alt={`${keyword} pic`}
          />
          <Attribution user={user} user_id={user_id} />

          <ButtonGroup>
            <OtterButton>Otter!</OtterButton>
            <OtterButton>
              <Text>Not!</Text>
              <Text> </Text>
              <Text fontSize="sm" fontWeight="thin">
                …ter
              </Text>
            </OtterButton>
          </ButtonGroup>
        </Stack>
      </main>

      <footer className={styles.footer}>
        <a
          href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
        >
          <small>
            amiotternot by jay harris is licensed under CC BY 4.0
            <img
              style={{
                height: "22px",
                marginLeft: "3px",
                verticalAlign: "text-bottom",
              }}
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
            />
            <img
              style={{
                height: "22px",
                marginLeft: "3px",
                verticalAlign: "text-bottom",
              }}
              src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
            />
          </small>
        </a>

        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

import sqlite3 from "sqlite3";

const DATABASE = "pics.db";

export async function getServerSideProps(context) {
  const db = new sqlite3.Database(DATABASE);

  const result = await new Promise((resolve, reject) => {
    db.get("SELECT keyword, width, height, user, user_id, filename FROM images ORDER BY random() limit 1", (err, row) => {
      if (err) reject(err);
      else resolve(row);      
    });
  });
  return { props: result };
}

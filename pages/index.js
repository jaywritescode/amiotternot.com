import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreativeCommons,
  faCreativeCommonsBy,
} from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import Image from "next/image";
import { Attribution, OtterButton, VoteResults } from "../components";

import styles from "../styles/Home.module.css";

export default function Home(props) {
  const {
    current: { id: image_id, keyword, width, height, user, user_id },
    previous
  } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Am I Otter Not?</title>
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

        <Box width={880}>
          <HStack spacing={"12"}>
            <Box width={640} height={480}>
              <Center h={480}>
                <Image
                  src={`/pics/${image_id}.jpg`}
                  width={width}
                  height={height}
                  layout="intrinsic"
                  alt={`${keyword} pic`}
                />
              </Center>

              <Attribution user={user} user_id={user_id} />

              <Flex justify="space-around">
                <OtterButton id={image_id} isOtter={true}>
                  Otter!
                </OtterButton>
                <OtterButton id={image_id} isOtter={false}>
                  Not!
                </OtterButton>
              </Flex>
            </Box>

            <VoteResults {...previous} />
          </HStack>
        </Box>
      </main>

      <footer className={styles.footer}>
        <Text fontSize={"xs"}>
          <a href="https://amiotternot.com">amiotternot</a> by{" "}
          <a href="https://jaywritesco.de">jay harris</a> is{" "}
          <a
            href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
            target="_blank"
            rel="license noopener noreferrer"
          >
            licensed
          </a>{" "}
          under CC BY 4.0 <FontAwesomeIcon icon={faCreativeCommons} />{" "}
          <FontAwesomeIcon icon={faCreativeCommonsBy} />
        </Text>
      </footer>
    </div>
  );
}

import sqlite3 from "sqlite3";
import _ from "lodash";

const DATABASE = "pics.db";

export async function getServerSideProps(context) {
  const db = new sqlite3.Database(DATABASE);
  const { query } = context;

  try {
    const current = await new Promise((resolve, reject) => {
      db.get(
        "SELECT id, keyword, width, height, user, user_id FROM images ORDER BY random() limit 1",
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });

    const previous = await new Promise((resolve, reject) => {
      if (_.isEmpty(query)) {
        resolve({});
        return;
      }

      db.all(
        "SELECT image_id, is_otter, COUNT(is_otter) as count FROM votes WHERE image_id=? GROUP BY is_otter",
        query.previousImage,
        (err, rows) => {
          if (err) reject(err);
          else {
            resolve({
              image_id: query.previousImage,
              upvotes: _.find(rows, ["is_otter", 1])["count"],
              totalVotes: _.sumBy(rows, "count"),
            });
          }
        }
      );
    });

    return { props: { current, previous } };
  } catch (err) {
    return { notFound: true };
  }
}

import { Button, ButtonGroup, Heading, Stack, Text } from '@chakra-ui/react'
import { map, pick } from "lodash";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  console.log(props);

  const { previewURL, webformatWidth, webformatHeight, user } = props.results[0];

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h1" size="3xl">Am I Otter Not?!?</Heading>

        <Text color="yellow.800">{"mustelids don't give a shit"}</Text>

        <Stack>
          <Image
            src="/otter.jpg"
            width={640}
            height={368}
            alt={`otter pic by ${user}`}
          />
          <small>Image by <a href="https://pixabay.com/users/pixel2013-2364555/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1438381">S. Hermann &amp; F. Richter</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1438381">Pixabay</a></small>
        
          <ButtonGroup>
            <Button size='lg'>Otter!</Button>
            <Button size='lg'>Not! ...ter</Button>
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

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=otter&image_type=photo`
  );
  const data = await res.json();
  const { total, hits } = data;

  if (total === 0) {
    return { notFound: true };
  }

  return {
    props: {
      total,
      results: map(hits, (result) =>
        pick(result, [
          "previewURL",
          "previewWidth",
          "previewHeight",
          "webformatURL",
          "webformatWidth",
          "webformatHeight",
          "user",
        ])
      ),
    },
  };
}

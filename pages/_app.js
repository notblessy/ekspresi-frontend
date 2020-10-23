import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Head from "next/head";
import { SWRConfig } from "swr";
import fetch from "../libs/fetch.js";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>Ekspresi - Todo List</title>
      </Head>
      <CSSReset />
      <SWRConfig
        value={{
          fetcher: fetch,
        }}
      ></SWRConfig>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

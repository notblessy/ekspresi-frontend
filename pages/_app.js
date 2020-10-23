import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import { SWRConfig } from "swr";
import fetch from "../libs/fetch.js";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
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

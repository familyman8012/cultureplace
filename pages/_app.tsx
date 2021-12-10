/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { ThemeProvider } from "@emotion/react";

//next-auth
import { Provider } from "next-auth/client";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      // I only want to allow these two routes!
      // if (as !== "/oneday" && as !== "/month") {
      //   // Have SSR render bad routes as a 404.
      //   console.log("router as", as);
      //   return false;
      // }
      console.log("router as", as);
      return true;
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider
          theme={{
            color: {
              brand: "#ff7900",
              brandbg: "#ffecd9",
              darkgray: "#f4eeea",
              gray: "#838380",
              lightgray: "#6e6e6c",
              white: "#fff;",
              event: "#1778b5"
            }
          }}
        >
          <Provider
            options={{
              clientMaxAge: 0,
              keepAlive: 0
            }}
            session={pageProps.session}
          >
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
export default MyApp;

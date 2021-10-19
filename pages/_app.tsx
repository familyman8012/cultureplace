/** @jsxImportSource @emotion/react */
import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import "antd/dist/antd.css";
import { ThemeProvider } from "@emotion/react";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
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
              lightgaray: "#6e6e6c",
              white: "#fff;",
              event: "#1778b5",
            },
          }}
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
export default MyApp;

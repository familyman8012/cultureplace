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
import { searchStore } from "@src/mobx/store";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();

  // queryClient.removeQueries();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log("/detailview", url.includes("/detailview"));
      console.log(`App is changing to ${url}`);
      if (url === "/month") {
        queryClient.removeQueries(["list", "oneday"]);
      } else if (url === "/oneday") {
        queryClient.removeQueries(["list", "month"]);
      } else if (
        !url.includes("/detailview") &&
        (searchStore.filterFind.every((el: []) => el.length === 0) ||
          searchStore.searchInput !== "")
      ) {
        queryClient.removeQueries("list");
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider
          theme={{
            color: {
              brand: "#3399ff",
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

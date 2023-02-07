import "../styles/globals.css";
import "../styles/loadingAnimation.css";
import "../styles/analytic.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";

/**
 * @return {JSX.Element}
 */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={true}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;

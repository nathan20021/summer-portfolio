/* eslint-disable require-jsdoc */
import "../styles/globals.css";
import type { AppProps } from "next/app";

/**
 * @return {JSX.Element}
 */

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <Component {...pageProps} />;
}

export default MyApp;

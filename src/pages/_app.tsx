import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {

  const { session } = pageProps;

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

import Appbar from "@/components/Appbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Appbar />
        <Component {...pageProps} />;
      </RecoilRoot>
    </SessionProvider>
  );
}

import Head from "next/head";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import PreLoader from "@/src/layouts/PreLoader";

// Inter for body text (via next/font)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Metropolis for headings (via Fontsource)
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/600.css";
import "@fontsource/metropolis/700.css";

import "@/styles/theme.css";
import "@/styles/typography.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [preLoader, setPreLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPreLoader(false);
    }, 1500);
  }, []);

  return (
    <div className={inter.variable}>
      <Head>
        {/* seo begin */}
        <title>Remotive Logistics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* seo end */}
      </Head>
      {preLoader && <PreLoader />}
      {!preLoader && <Component {...pageProps} />}
    </div>
  );
}

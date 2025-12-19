import Head from "next/head";
import { useEffect, useState } from "react";
import { Inter, Sora } from "next/font/google";
import PreLoader from "@/src/layouts/PreLoader";
import "@/styles/theme.css";
import "@/styles/typography.css";
import "@/styles/globals.css";

// Body/UI font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Heading font
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const [preLoader, setPreLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPreLoader(false);
    }, 1500);
  }, []);

  return (
    <div className={`${inter.variable} ${sora.variable}`}>
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

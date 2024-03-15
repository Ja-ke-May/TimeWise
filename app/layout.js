import { Inter } from "next/font/google"; 
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TimeWise Quiz",
  description: "The quiz where Every Second Counts.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <style>
          {`
            body {
              margin: 0;
              overflow: hidden;
            }
          `}
        </style>
      </Head>
      <html lang="en">
        <body className={`${inter.className} bg-black`}>
          {/* Video Background */}
          <video id="video-background" autoPlay loop muted className="fixed top-0 left-0 w-full h-full object-cover">
  <source src="4K_13.mp4" type="video/mp4" />
  <source src="4K_13.webm" type="video/webm" />
  Unsupported video
</video>
          {children}
        </body>
      </html>
    </>
  );
}

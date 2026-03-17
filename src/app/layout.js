import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/page";
import SessionUID from "@/components/SessionUID";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import LoginGate from "@/components/home/LoginGate";
import { Provider } from "./context";
import LayoutClient from "./layoutClient";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Alta booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <Provider>
        <ReactQueryProvider>
          <SessionUID />
          <LayoutClient>
            <LoginGate>
              <Header />
              {children}
            </LoginGate>
            </LayoutClient>
        </ReactQueryProvider>
        </Provider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

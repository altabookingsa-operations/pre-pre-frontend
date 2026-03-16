import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/page";
import SessionUID from "@/components/SessionUID";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import LoginGate from "@/components/home/LoginGate";

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
        <ReactQueryProvider>
          {/* <Provider> */}
          <SessionUID />

          <div
            className="relative pb-[50px] lg:pb-[70px] w-full text-white bg-cover bg-center main-pre-pre-lnch-start"
            style={{ backgroundImage: "url(/images/banner-img.png)" }}
          >
            <LoginGate>
              <Header />

              {children}
              {/* jQuery & plugins */}

              {/* <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
                strategy="beforeInteractive"
              /> */}

              {/* Navbar Script */}
              {/* <Script id="navbar-script" strategy="afterInteractive">
                {`
              window.addEventListener("load", function () {

                (function($) {

                  $('#navbar-toggle').click(function() {
                    $('nav ul').slideToggle();
                  });

                  $('#navbar-toggle').on('click', function() {
                    this.classList.toggle('active');
                  });

                  $('nav ul li a:not(:only-child)').click(function(e) {
                    $(this).siblings('.navbar-dropdown').slideToggle("slow");
                    $('.navbar-dropdown').not($(this).siblings()).hide("slow");
                    e.stopPropagation();
                  });

                  $('html').click(function() {
                    $('.navbar-dropdown').hide();
                  });

                })(jQuery);

              });
              `}npm install sweetalert2@11.26.18
              </Script> */}
            </LoginGate>
          </div>
          {/* </Provider> */}
        </ReactQueryProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

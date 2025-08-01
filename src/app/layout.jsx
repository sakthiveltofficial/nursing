import FooterSection from "@/components/Common/Footer";
import "./globals.css";
import ToggleMenu from "@/components/Common/Header";
import ScrollToTop from "@/components/Common/ScrollToTop";
import Footer from "@/components/Footer";
import { Readex_Pro } from 'next/font/google';

const readexPro = Readex_Pro({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${readexPro.className} antialiased overflow-x-hidden`}>
      <ToggleMenu/>
        {children}
        <Footer/>
        {/* <FooterSection/> */}
        <ScrollToTop/>
      </body>
    </html>
  );
}

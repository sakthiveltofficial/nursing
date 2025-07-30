import FooterSection from "@/components/Common/Footer";
import "./globals.css";
import ToggleMenu from "@/components/Common/Header";
import ScrollToTop from "@/components/Common/ScrollToTop";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
      <ToggleMenu/>
        {children}
        <Footer/>
        {/* <FooterSection/> */}
        <ScrollToTop/>
      </body>
    </html>
  );
}

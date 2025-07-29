import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}

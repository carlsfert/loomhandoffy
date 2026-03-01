import "./globals.css";

export const metadata = {
  title: "Flooom Player",
  description: "Flooom video player clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

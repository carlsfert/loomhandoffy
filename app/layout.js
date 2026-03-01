import "./globals.css";

export const metadata = {
  title: "Loom Player",
  description: "Loom video player clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "Happy Birthday!",
  description: "Celebrate your day with joy and happiness!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-background select-none">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jambinno Shuttle Services | Premium African Travel",
    template: "%s | Jambinno Shuttle Services",
  },
  description:
    "Discover comfortable, reliable and personalised airport transfers, executive transport and private shuttle services with Jambinno Shuttle Services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

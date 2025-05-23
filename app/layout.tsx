import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Henoc AMAVIGAN | Portfolio",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  description: "Portfolio de Henoc AMAVIGAN",
  keywords: [
    "Henoc AMAVIGAN",
    "Portfolio",
    "Développeur Web",
    "Développeur Frontend",
    "Développeur Backend",
    "Développeur Fullstack",
    "Développeur React",
    "Développeur Next.js",
    "Développeur Node.js",
    "Data Scientist",
    "Machine Learning",
    "Intelligence Artificielle",
    "Deep Learning",
    "Big Data",
    "Data Engineer",
    "Data Analyst",
    "Data Visualization",
    "Data Mining",
    "Data Science",
    "Data Analysis",
    "Data Engineering",
    "Data Analytics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

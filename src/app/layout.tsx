import { MotionConfig } from "framer-motion";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { getSiteSettings } from "@/lib/sanity/data";
import { imgSrc } from "@/lib/sanity/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_TITLE = "N4MES — MAKE IT MEAN SOMETHING.";
const DEFAULT_DESCRIPTION = "N4MES — MAKE IT MEAN SOMETHING.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = settings?.seoTitle ?? DEFAULT_TITLE;
  const description = settings?.seoDescription ?? DEFAULT_DESCRIPTION;
  const ogImage = imgSrc(settings?.seoOgImage, 1200);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <MotionConfig reducedMotion="user">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionConfig>
      </body>
    </html>
  );
}

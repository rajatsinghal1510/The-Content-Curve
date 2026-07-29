import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "The Content Curve | Creative Branding Studio",
  description: "The Content Curve is a world-class creative branding studio turning scrolls into sales. Shaping high-end visual systems, cinematic content, and luxury identities.",
  keywords: ["branding studio", "luxury brand styling", "cinematic photography", "conversions", "editorial website design"],
  authors: [{ name: "The Content Curve" }],
  icons: {
    icon: "/images/logo-red.png",
  },
  openGraph: {
    title: "The Content Curve | Creative Branding Studio",
    description: "The Content Curve is a world-class creative branding studio turning scrolls into sales. Shaping high-end visual systems, cinematic content, and luxury identities.",
    url: "https://thecontentcurve.com",
    siteName: "The Content Curve",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/logo-original.png",
        width: 640,
        height: 640,
        alt: "The Content Curve Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Content Curve | Creative Branding Studio",
    description: "The Content Curve is a world-class creative branding studio turning scrolls into sales. Shaping high-end visual systems, cinematic content, and luxury identities.",
    images: ["/images/logo-original.png"],
  },
  metadataBase: new URL("https://thecontentcurve.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Content Curve",
    "url": "https://thecontentcurve.com",
    "logo": "https://thecontentcurve.com/images/logo-original.png",
    "sameAs": [
      "https://twitter.com/thecontentcurve",
      "https://instagram.com/thecontentcurve"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Content Curve",
    "url": "https://thecontentcurve.com"
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-obsidian text-primary-text flex flex-col font-sans select-none selection:bg-brand-red/30 selection:text-primary-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>
          <Loader />
          <CustomCursor />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "../../src/index.css";
import { GeoGuard } from "@/components/GeoGuard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { LicenseBanner } from "@/components/LicenseBanner";
import { MobileNav } from "@/components/MobileNav";
import { ComplianceProvider } from "@/src/context/ComplianceContext";

export const metadata: Metadata = {
  title: "VerifiedSlots - Independent Assessments & Compliance Reviews",
  description: "Objective, developer-led analysis of regulated KSA online casinos and offshore entities.",
  applicationName: "VerifiedSlots",
  keywords: ["KSA Casinos", "MGA Casinos", "Curaçao Casinos", "Casino Compliance", "Online Casino Reviews", "iGaming Reviews", "Casino Licenses", "Responsible Gambling", "Safe Online Casinos"],
  authors: [{ name: "VerifiedSlots Team" }],
  creator: "VerifiedSlots",
  publisher: "VerifiedSlots",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://VerifiedSlots.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VerifiedSlots - Independent Assessments & Compliance Reviews",
    description: "Objective, developer-led analysis of regulated KSA online casinos and offshore entities.",
    url: "https://VerifiedSlots.com",
    siteName: "VerifiedSlots",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VerifiedSlots",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VerifiedSlots - Independent Assessments & Compliance Reviews",
    description: "Objective, developer-led analysis of regulated KSA online casinos and offshore entities.",
    images: ["/images/og-image.jpg"],
    creator: "@VerifiedSlots",
    site: "@VerifiedSlots",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/loogo_twitter.png", sizes: "192x192", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/loogo_twitter.png", sizes: "180x180", type: "image/png" }
    ]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-200">
        <ComplianceProvider>
          <GeoGuard>
            <LicenseBanner />
            <div className="relative flex flex-col flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
              <Navbar />
              {/* Less top padding on mobile — 64px (py-16) on a narrow
                  viewport reads as dead space between the nav and the first
                  card; desktop keeps the original spacious gap. */}
              <div className="flex-1 pt-6 pb-16 md:pt-16">
                {children}
              </div>
              <Footer />
            </div>
            <MobileNav />
          </GeoGuard>
        </ComplianceProvider>
      </body>
    </html>
  );
}

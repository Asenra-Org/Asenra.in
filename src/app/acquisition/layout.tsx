import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Website Demo Generator for Indian Businesses | Asenra",
  description:
    "See your business website live in seconds — no payment, no signup. Instant AI-powered demo for cafes, gyms, salons, architects & more. India's smartest website preview tool by Asenra.",
  keywords: [
    "free website demo India",
    "website preview generator",
    "AI website builder India",
    "demo website for business",
    "restaurant website demo",
    "gym website demo India",
    "salon website design India",
    "free web design tool",
    "Asenra demo engine",
  ],
  openGraph: {
    title: "See Your Business Website Live — Free Demo by Asenra",
    description:
      "Enter your business name and instantly generate a live website demo. Used by cafes, gyms, salons, and agencies across India.",
    url: "https://asenra.in/acquisition",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asenra Free Website Demo Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Demo for Indian Businesses — Asenra",
    description:
      "See how your cafe, gym, or salon would look online. Generate a live demo in seconds — completely free.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/acquisition",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AcquisitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

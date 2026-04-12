import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asenra Architecture | Engineered for Performance & Scale",
  description: "Explore the Asenra Engine. Our high-performance tech stack: Next.js 15, GSAP 3, and autonomous AI layers built for sub-second responses and high conversions.",
  openGraph: {
    title: "Asenra Architecture | The Engineering Engine",
    description: "Deep dive into our elite technology stack and software lifecycle architecture.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/architecture",
  },
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

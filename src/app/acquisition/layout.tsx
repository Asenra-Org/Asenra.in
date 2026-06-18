import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asenra Live Demo & Tech Audit Engine",
  description: "Generate a live mock layout and run a comprehensive digital presence audit for your business in seconds. Experience the Asenra difference.",
  alternates: {
    canonical: "/acquisition",
  },
};

export default function AcquisitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

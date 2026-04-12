import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Asenra Labs",
  description: "Read the Asenra Terms of Service. Protocol and agreement for using our elite engineering systems and services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

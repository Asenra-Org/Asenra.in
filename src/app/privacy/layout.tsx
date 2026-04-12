import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Asenra Labs",
  description: "Learn how Asenra handles your data. Our privacy protocols ensure digital sovereignty and elite protection for our clients.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

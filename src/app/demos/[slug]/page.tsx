import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  CafeTemplate, 
  GymTemplate, 
  SalonTemplate, 
  ServicesTemplate, 
  GeneralTemplate 
} from "@/components/demo/Templates";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Fetch lead data from Supabase
  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !lead) {
    return notFound();
  }

  // Render template based on category
  switch (lead.category) {
    case "cafe":
      return <CafeTemplate lead={lead} />;
    case "gym":
      return <GymTemplate lead={lead} />;
    case "salon":
      return <SalonTemplate lead={lead} />;
    case "services":
      return <ServicesTemplate lead={lead} />;
    default:
      return <GeneralTemplate lead={lead} />;
  }
}

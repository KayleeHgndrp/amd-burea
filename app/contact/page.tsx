import { Contact, type Plan } from "./components/contact";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: `Plan een gratis kennismaking met ${siteConfig.name}. Antwoord binnen 24 uur.`,
  path: "/contact",
});

const PLANS: Plan[] = ["growth", "pro", "premium"];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ pakket?: string; type?: string }>;
}) {
  const { pakket, type } = await searchParams;
  const plan = PLANS.find((p) => p === pakket) ?? "";
  const audience = type === "mkb" ? ("mkb" as const) : ("zzp" as const);
  return <Contact initialPlan={plan} initialAudience={audience} />;
}

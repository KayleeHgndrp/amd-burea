import { Contact } from "./components/contact";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: `Plan een gratis kennismaking met ${siteConfig.name}. Antwoord binnen 24 uur.`,
  path: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}
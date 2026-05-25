import { Contact } from "./components/contact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "Plan een gratis kennismaking met AMD Bureau. Antwoord binnen 24 uur.",
  path: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}
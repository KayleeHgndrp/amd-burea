import { FileText } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function BlogsEmptyState(): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-foreground/5 mb-6">
        <FileText className="w-7 h-7 text-foreground/50" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-medium text-foreground">Nog geen artikelen</h2>
      <p className="mt-3 text-sm text-foreground/60 max-w-md leading-relaxed">
        We publiceren binnenkort tips en nieuws over boekhouding, belasting en ondernemen.
        Kom later terug of neem contact op.
      </p>

    </div>
  );
}

import type { TeamMember } from "@/lib/cms/types";
import Image from "next/image";
import type { ReactNode } from "react";

type BlogAuthorProps = {
  author: TeamMember;
};

export function BlogAuthor({ author }: BlogAuthorProps): ReactNode {
  const subtitle = [author.role, author.company].filter(Boolean).join(" · ");

  return (
    <div className="flex items-center gap-4 py-6 border-y border-foreground/10">
      <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-full bg-muted">
        <Image
          src={author.image}
          alt={author.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium font-display text-foreground/50">
          Geschreven door
        </p>
        <p className="text-base font-medium text-foreground mt-0.5">{author.name}</p>
        {subtitle && <p className="text-sm text-foreground/60 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

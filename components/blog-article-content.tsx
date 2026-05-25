import type { ReactNode } from "react";

type BlogArticleContentProps = {
  content: string;
};

function looksLikeHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

export function BlogArticleContent({ content }: BlogArticleContentProps): ReactNode {
  if (!content.trim()) return null;

  if (looksLikeHtml(content)) {
    return (
      <div
        className="blog-prose text-foreground/80 leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-foreground [&_h2]:mt-10 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mt-8 [&_p]:leading-relaxed [&_a]:text-accent [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className="text-foreground/80 leading-relaxed space-y-4">
      {content.split(/\n\n+/).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

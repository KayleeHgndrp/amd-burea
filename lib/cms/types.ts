export type BlogArticle = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
};

export type BlogArticleDetail = BlogArticle & {
  slug: string;
  content: string;
  /** UUID's van gerelateerde blogposts */
  relatedIds: string[];
  /** UUID van teamlid (author) */
  authorId?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  linkedIn?: string;
};

export type BlogPostPageData = {
  article: BlogArticleDetail;
  author: TeamMember | null;
  related: BlogArticle[];
};

export type CmsEntry = Record<string, unknown>;

export type HomeCollections = {
  blogs: BlogArticle[];
  teams: TeamMember[];
};

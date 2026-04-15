export type PublishStatus = "draft" | "published";

export interface BaseContent {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  status: PublishStatus;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service extends BaseContent {
  icon: string;
  outcomes: string[];
  process: string[];
  ctaLabel?: string;
  ctaHref?: string;
  priceFrom?: string;
}

export interface Product extends BaseContent {
  launchStage: string;
  benefits: string[];
  stack: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface Blog extends BaseContent {
  author: string;
  readTime: number;
}

export interface Insight extends BaseContent {
  author: string;
  readTime: number;
}

export interface CaseStudy extends BaseContent {
  client: string;
  sector: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string[];
  stack: string[];
}

export interface Career extends BaseContent {
  location: string;
  employmentType: string;
  department: string;
  salaryRange?: string;
}

export interface ContactSubmission {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest: string;
  message: string;
  createdAt?: string;
}

export interface MediaAsset {
  key: string;
  url: string;
  storageUrl?: string;
  lastModified?: string;
  size?: number;
}

export type ResourceKey = "services" | "products" | "blogs" | "insights" | "case-studies" | "careers";

export type ResourceItemMap = {
  services: Service;
  products: Product;
  blogs: Blog;
  insights: Insight;
  "case-studies": CaseStudy;
  careers: Career;
};

export type ResourceCollectionMap = {
  services: Service[];
  products: Product[];
  blogs: Blog[];
  insights: Insight[];
  "case-studies": CaseStudy[];
  careers: Career[];
};

export type ResourceDocument = ResourceItemMap[ResourceKey];

export type DashboardSnapshot = {
  counts: Record<ResourceKey, number>;
  featured: {
    services: Service[];
    products: Product[];
    blogs: Blog[];
    insights: Insight[];
    "case-studies": CaseStudy[];
    careers: Career[];
  };
};

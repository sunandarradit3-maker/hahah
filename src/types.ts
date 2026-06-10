export interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  gallery?: string[];
  techStack?: string[];
  liveDemo?: string;
  github?: string;
  featured?: boolean;
  createdAt?: any;
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  order?: number;
  createdAt?: any;
}

export interface PricingPlan {
  id?: string;
  name: string;
  price: string;
  description: string;
  features?: string[];
  popular?: boolean;
  createdAt?: any;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
  createdAt?: any;
}

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  createdAt?: any;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  category?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
  createdAt?: any;
}

export interface Lead {
  id?: string;
  name: string;
  email?: string;
  whatsapp?: string;
  message: string;
  status?: 'New' | 'Contacted' | 'Negotiation' | 'Won' | 'Lost';
  createdAt?: any;
}

export interface SiteSettings {
  logo?: string;
  brandName?: string;
  email?: string;
  whatsapp?: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

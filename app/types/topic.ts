export type CategoryId =
  | "networking"
  | "data"
  | "software-development"
  | "cybersecurity"
  | "ai-ml";

export interface Topic {
  id: string;
  category: CategoryId;
  title: string;
  description: string;
  definition: string;
  analogy: string;
  howItWorks: string; 
  whyItMatters: string;
  keyTakeaway: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}
export type CategorySlug =
  | "git"
  | "bash"
  | "linux"
  | "powershell"
  | "docker"
  | "curl";

export interface Category {
  slug: CategorySlug;
  label: string;
  icon: string;
  available: boolean;
}

export interface Command {
  id: string;
  syntax: string;
  label: string;
  description: string;
  keywords: string[];
  category: CategorySlug;
}

import type { Category, CategorySlug, Command } from "./types";
import { gitCommands } from "./git.commands";

export const categories: Category[] = [
  { slug: "git", label: "Git", icon: "git", available: true },
  { slug: "bash", label: "Bash", icon: "bash", available: false },
  { slug: "linux", label: "Linux", icon: "linux", available: false },
  {
    slug: "powershell",
    label: "PowerShell",
    icon: "powershell",
    available: false,
  },
  { slug: "docker", label: "Docker", icon: "docker", available: false },
];

export const commandsByCategory: Partial<Record<CategorySlug, Command[]>> = {
  git: gitCommands,
};

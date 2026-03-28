import type { Category, CategorySlug, Command } from "./types";
import { gitCommands } from "./git.commands";
import { bashCommands } from "./bash.commands";
import { curlCommands } from "./curl.commands";
import { linuxCommands } from "./linux.commands";

export const categories: Category[] = [
  { slug: "git", label: "Git", icon: "git", available: true },
  { slug: "bash", label: "Bash", icon: "bash", available: true },
  { slug: "curl", label: "cURL", icon: "curl", available: true },
  { slug: "linux", label: "Linux", icon: "linux", available: true },
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
  bash: bashCommands,
  curl: curlCommands,
  linux: linuxCommands,
};

import { useMemo } from "react";
import { useDebounce } from "./useDebounce";
import type { Command } from "@/data/types";

export function useSearch(commands: Command[], query: string) {
  const debouncedQuery = useDebounce(query, 250);

  const filteredCommands = useMemo(() => {
    if (!debouncedQuery.trim()) return commands;

    const terms = debouncedQuery.toLowerCase().split(/\s+/);

    return commands.filter(cmd => {
      const searchText =
        `${cmd.syntax} ${cmd.label} ${cmd.description} ${cmd.keywords.join(" ")}`.toLowerCase();
      return terms.every(term => searchText.includes(term));
    });
  }, [commands, debouncedQuery]);

  return { filteredCommands, isFiltering: debouncedQuery !== query };
}

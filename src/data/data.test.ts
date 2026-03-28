import { describe, it, expect } from "vitest";
import { gitCommands } from "./git.commands";
import { bashCommands } from "./bash.commands";
import { curlCommands } from "./curl.commands";
import { categories, commandsByCategory } from "./index";

describe("git.commands", () => {
  it("contains commands", () => {
    expect(gitCommands.length).toBeGreaterThan(0);
  });

  it("all commands have required fields", () => {
    for (const cmd of gitCommands) {
      expect(cmd.id).toBeTruthy();
      expect(cmd.syntax).toBeTruthy();
      expect(cmd.label).toBeTruthy();
      expect(cmd.description).toBeTruthy();
      expect(cmd.category).toBe("git");
      expect(Array.isArray(cmd.keywords)).toBe(true);
      expect(cmd.keywords.length).toBeGreaterThan(0);
    }
  });

  it("has unique IDs for all commands", () => {
    const ids = gitCommands.map(cmd => cmd.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all syntaxes start with "git"', () => {
    for (const cmd of gitCommands) {
      expect(cmd.syntax.startsWith("git")).toBe(true);
    }
  });
});

describe("bash.commands", () => {
  it("contains commands", () => {
    expect(bashCommands.length).toBeGreaterThan(0);
  });

  it("all commands have required fields", () => {
    for (const cmd of bashCommands) {
      expect(cmd.id).toBeTruthy();
      expect(cmd.syntax).toBeTruthy();
      expect(cmd.label).toBeTruthy();
      expect(cmd.description).toBeTruthy();
      expect(cmd.category).toBe("bash");
      expect(Array.isArray(cmd.keywords)).toBe(true);
      expect(cmd.keywords.length).toBeGreaterThan(0);
    }
  });

  it("has unique IDs for all commands", () => {
    const ids = bashCommands.map(cmd => cmd.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all IDs start with "bash-"', () => {
    for (const cmd of bashCommands) {
      expect(cmd.id.startsWith("bash-")).toBe(true);
    }
  });
});

describe("curl.commands", () => {
  it("is an empty array", () => {
    expect(curlCommands).toEqual([]);
  });
});

describe("categories", () => {
  it("contains all expected categories", () => {
    const slugs = categories.map(c => c.slug);
    expect(slugs).toContain("git");
    expect(slugs).toContain("bash");
    expect(slugs).toContain("curl");
    expect(slugs).toContain("linux");
    expect(slugs).toContain("powershell");
    expect(slugs).toContain("docker");
  });

  it("git, bash, and curl are available", () => {
    const available = categories.filter(c => c.available);
    expect(available).toHaveLength(3);
    const slugs = available.map(c => c.slug);
    expect(slugs).toContain("git");
    expect(slugs).toContain("bash");
    expect(slugs).toContain("curl");
  });

  it("all categories have required fields", () => {
    for (const cat of categories) {
      expect(cat.slug).toBeTruthy();
      expect(cat.label).toBeTruthy();
      expect(cat.icon).toBeTruthy();
      expect(typeof cat.available).toBe("boolean");
    }
  });
});

describe("commandsByCategory", () => {
  it("maps git commands correctly", () => {
    expect(commandsByCategory.git).toBe(gitCommands);
  });

  it("maps bash commands correctly", () => {
    expect(commandsByCategory.bash).toBe(bashCommands);
  });

  it("maps curl commands correctly (empty)", () => {
    expect(commandsByCategory.curl).toBe(curlCommands);
    expect(commandsByCategory.curl).toHaveLength(0);
  });

  it("returns undefined for unavailable categories", () => {
    expect(commandsByCategory.linux).toBeUndefined();
  });
});

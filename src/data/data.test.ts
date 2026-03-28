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
  it("contains commands", () => {
    expect(curlCommands.length).toBeGreaterThan(0);
  });

  it("all commands have required fields", () => {
    for (const cmd of curlCommands) {
      expect(cmd.id).toBeTruthy();
      expect(cmd.syntax).toBeTruthy();
      expect(cmd.label).toBeTruthy();
      expect(cmd.description).toBeTruthy();
      expect(cmd.category).toBe("curl");
      expect(Array.isArray(cmd.keywords)).toBe(true);
      expect(cmd.keywords.length).toBeGreaterThan(0);
    }
  });

  it("has unique IDs for all commands", () => {
    const ids = curlCommands.map(cmd => cmd.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all IDs start with "curl-"', () => {
    for (const cmd of curlCommands) {
      expect(cmd.id.startsWith("curl-")).toBe(true);
    }
  });

  it("covers all HTTP methods", () => {
    const syntaxes = curlCommands.map(cmd => cmd.syntax);
    const hasMethod = (method: string) =>
      syntaxes.some(
        s =>
          s.includes(`-X ${method}`) ||
          (method === "GET" && s.startsWith("curl http"))
      );
    expect(hasMethod("GET")).toBe(true);
    expect(hasMethod("POST")).toBe(true);
    expect(hasMethod("PUT")).toBe(true);
    expect(hasMethod("PATCH")).toBe(true);
    expect(hasMethod("DELETE")).toBe(true);
    expect(hasMethod("OPTIONS")).toBe(true);
  });

  it("covers authentication patterns", () => {
    const ids = curlCommands.map(cmd => cmd.id);
    expect(ids.some(id => id.includes("bearer"))).toBe(true);
    expect(ids.some(id => id.includes("basic"))).toBe(true);
    expect(ids.some(id => id.includes("api-key"))).toBe(true);
    expect(ids.some(id => id.includes("jwt"))).toBe(true);
    expect(
      ids.some(id => id.includes("session") || id.includes("cookie"))
    ).toBe(true);
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

  it("maps curl commands correctly", () => {
    expect(commandsByCategory.curl).toBe(curlCommands);
    expect(commandsByCategory.curl!.length).toBeGreaterThan(0);
  });

  it("returns undefined for unavailable categories", () => {
    expect(commandsByCategory.linux).toBeUndefined();
  });
});

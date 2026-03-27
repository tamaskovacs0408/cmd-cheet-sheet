import type { Command } from "./types";

export const gitCommands: Command[] = [
  {
    id: "git-status",
    syntax: "git status",
    label: "Check working tree status",
    description:
      "Before committing or switching branches, run this to see which files have been modified, staged, or are untracked. It gives you a snapshot of your current working directory so you don't accidentally commit something unexpected.",
    keywords: [
      "changes",
      "modified",
      "untracked",
      "staged",
      "working directory",
    ],
    category: "git",
  },
  {
    id: "git-status-short",
    syntax: "git status -s",
    label: "Compact working tree status",
    description:
      "Need a quick overview without the verbose output? The -s (short) flag gives you a condensed, two-column format — the first column shows the staging area status and the second shows working tree changes. Great for scripting or when you just want the gist.",
    keywords: ["short", "compact", "brief", "summary", "quick status"],
    category: "git",
  },
  {
    id: "git-add-all",
    syntax: "git add .",
    label: "Stage all changes",
    description:
      "When you've made several changes across multiple files and want to include all of them in your next commit, this stages everything in the current directory. Be mindful — it picks up all modifications, including files you might not intend to commit.",
    keywords: ["stage", "track", "add files", "working directory", "index"],
    category: "git",
  },
  {
    id: "git-add-patch",
    syntax: "git add -p",
    label: "Stage changes interactively",
    description:
      "Want fine-grained control over what gets staged? The -p (patch) flag walks you through each chunk of changes and lets you decide individually — stage this hunk, skip that one. Perfect when a single file contains changes belonging to different logical commits.",
    keywords: ["patch", "interactive", "hunk", "partial", "selective", "chunk"],
    category: "git",
  },
  {
    id: "git-commit",
    syntax: 'git commit -m "<message>"',
    label: "Commit staged changes",
    description:
      "After staging your changes with git add, this creates a new commit with a descriptive message. Write clear, concise messages — your future self (and teammates) will thank you when reading the commit history.",
    keywords: ["save", "snapshot", "message", "history", "record"],
    category: "git",
  },
  {
    id: "git-commit-amend",
    syntax: "git commit --amend",
    label: "Amend the last commit",
    description:
      "Forgot to include a file or made a typo in your commit message? Instead of creating a whole new commit, --amend lets you modify the most recent one. It replaces the last commit with a new one that includes your staged changes and updated message. Don't use this after pushing — it rewrites history.",
    keywords: ["amend", "fix", "edit", "rewrite", "last commit", "modify"],
    category: "git",
  },
  {
    id: "git-commit-no-edit",
    syntax: "git commit --amend --no-edit",
    label: "Amend last commit, keep message",
    description:
      "Staged a file you forgot to include in the last commit? This amends the previous commit with the newly staged changes but keeps the original commit message untouched. A quick fixup without opening an editor.",
    keywords: ["amend", "no edit", "quick fix", "add file", "forgot"],
    category: "git",
  },
  {
    id: "git-push",
    syntax: "git push origin <branch>",
    label: "Push branch to remote",
    description:
      "Once your local commits are ready to share, push them to the remote repository. Replace <branch> with your current branch name. This makes your work available to your team and triggers any CI/CD pipelines configured on the remote.",
    keywords: ["upload", "remote", "origin", "share", "publish", "upstream"],
    category: "git",
  },
  {
    id: "git-push-set-upstream",
    syntax: "git push -u origin <branch>",
    label: "Push and set upstream tracking",
    description:
      "The first time you push a new local branch, use -u (--set-upstream) to link your local branch to the remote one. After this, plain git push and git pull will know which remote branch to use without you specifying it every time.",
    keywords: ["upstream", "tracking", "set upstream", "first push", "link"],
    category: "git",
  },
  {
    id: "git-push-force-lease",
    syntax: "git push --force-with-lease",
    label: "Force push safely",
    description:
      "After rebasing or amending commits, your local history diverges from the remote. A regular push will be rejected. --force-with-lease lets you force-push, but only if nobody else has pushed new commits in the meantime — a safety net that prevents accidentally overwriting a teammate's work.",
    keywords: [
      "force push",
      "safe force",
      "rebase",
      "overwrite",
      "lease",
      "diverged",
    ],
    category: "git",
  },
  {
    id: "git-pull",
    syntax: "git pull",
    label: "Fetch and merge from remote",
    description:
      "This fetches the latest changes from the remote and immediately merges them into your current branch. Run this regularly to keep your local branch in sync, especially before starting new work or pushing your changes.",
    keywords: [
      "fetch",
      "merge",
      "update",
      "sync",
      "download",
      "remote changes",
    ],
    category: "git",
  },
  {
    id: "git-pull-rebase",
    syntax: "git pull --rebase",
    label: "Pull with rebase instead of merge",
    description:
      "Don't want a merge commit cluttering your history every time you pull? The --rebase flag replays your local commits on top of the fetched changes instead of merging. This keeps a linear, cleaner history — especially useful on feature branches.",
    keywords: [
      "rebase",
      "linear",
      "clean history",
      "no merge commit",
      "pull rebase",
    ],
    category: "git",
  },
  {
    id: "git-clone",
    syntax: "git clone <url>",
    label: "Clone a repository",
    description:
      "Starting on a new project? This downloads the entire repository — all files, branches, and commit history — to your local machine. You only need to do this once per project, then you can pull updates going forward.",
    keywords: ["download", "copy", "repository", "new project", "setup"],
    category: "git",
  },
  {
    id: "git-clone-shallow",
    syntax: "git clone --depth 1 <url>",
    label: "Shallow clone (latest only)",
    description:
      "Working with a massive repo or just need to peek at the code? A shallow clone with --depth 1 downloads only the most recent commit, skipping the entire history. It's dramatically faster and uses less disk space — ideal for CI/CD pipelines or quick inspections.",
    keywords: ["shallow", "depth", "fast", "ci", "partial", "latest"],
    category: "git",
  },
  {
    id: "git-checkout-b",
    syntax: "git checkout -b <branch>",
    label: "Create and switch to a new branch",
    description:
      "Need to start working on a new feature or bugfix? This creates a fresh branch from your current position and immediately switches to it — a two-in-one shortcut that keeps your main branch clean while you experiment.",
    keywords: ["new branch", "feature branch", "create", "switch", "start"],
    category: "git",
  },
  {
    id: "git-switch",
    syntax: "git switch <branch>",
    label: "Switch to an existing branch",
    description:
      "The modern way to move between branches. Unlike the overloaded checkout command, switch does one thing well — it changes your working directory to another branch. Clearer intent, fewer accidents.",
    keywords: ["change branch", "move", "navigate", "checkout alternative"],
    category: "git",
  },
  {
    id: "git-switch-create",
    syntax: "git switch -c <branch>",
    label: "Create and switch to a new branch (modern)",
    description:
      "The modern equivalent of git checkout -b. The -c flag creates a brand-new branch and immediately switches to it in one command. Prefer this over checkout -b — the intent is clearer, and switch is designed specifically for branch operations.",
    keywords: [
      "create branch",
      "new branch",
      "switch create",
      "modern",
      "shortcut",
    ],
    category: "git",
  },
  {
    id: "git-merge",
    syntax: "git merge <branch>",
    label: "Merge a branch into current",
    description:
      "You've been working on a feature branch and now it's time to bring those changes into your current branch. If develop has moved forward while you worked, switch to your feature branch and merge develop into it to incorporate the latest upstream changes.",
    keywords: ["combine", "integrate", "join", "branch", "develop", "main"],
    category: "git",
  },
  {
    id: "git-merge-no-ff",
    syntax: "git merge --no-ff <branch>",
    label: "Merge with explicit merge commit",
    description:
      "By default, Git may fast-forward if there's no divergence. The --no-ff flag forces a merge commit even when one isn't strictly needed, preserving a clear record that a feature branch was merged. Many teams prefer this for better traceability in the log.",
    keywords: [
      "no fast forward",
      "merge commit",
      "explicit",
      "history",
      "preserve",
    ],
    category: "git",
  },
  {
    id: "git-merge-abort",
    syntax: "git merge --abort",
    label: "Abort an in-progress merge",
    description:
      "Ran into a nasty merge conflict and want to bail? --abort cancels the merge in progress and restores your branch to the state it was in before you started. No changes are lost — you're just back to square one, ready to try a different approach.",
    keywords: ["abort", "cancel", "conflict", "undo merge", "bail", "rollback"],
    category: "git",
  },
  {
    id: "git-rebase",
    syntax: "git rebase <branch>",
    label: "Rebase current branch onto another",
    description:
      "Instead of merging, rebase replays your branch's commits on top of the target branch. This creates a cleaner, linear history. Use it when you want to incorporate upstream changes without merge commits — but avoid rebasing branches that others are also working on.",
    keywords: [
      "replay",
      "linear history",
      "clean",
      "rewrite",
      "onto",
      "interactive",
    ],
    category: "git",
  },
  {
    id: "git-rebase-interactive",
    syntax: "git rebase -i HEAD~<n>",
    label: "Interactive rebase (edit last N commits)",
    description:
      "The power tool for rewriting history. Interactive rebase opens an editor listing your last N commits, letting you reorder, squash, edit messages, or drop commits entirely. Ideal for cleaning up messy work-in-progress commits into logical chunks before opening a pull request.",
    keywords: [
      "interactive",
      "squash",
      "reorder",
      "edit",
      "fixup",
      "cleanup",
      "history",
    ],
    category: "git",
  },
  {
    id: "git-rebase-abort",
    syntax: "git rebase --abort",
    label: "Abort an in-progress rebase",
    description:
      "Rebase gone sideways? --abort stops the rebase operation and puts your branch back exactly where it was before you started. All your original commits are intact — nothing is lost.",
    keywords: ["abort", "cancel", "rebase conflict", "undo", "bail"],
    category: "git",
  },
  {
    id: "git-stash",
    syntax: "git stash",
    label: "Stash uncommitted changes",
    description:
      "You're in the middle of something but need to quickly switch branches — stash saves your uncommitted changes and reverts your working directory to a clean state. Your work isn't lost; it's safely stored on a stack you can restore later.",
    keywords: [
      "save",
      "temporary",
      "store",
      "hide",
      "clean",
      "work in progress",
      "wip",
    ],
    category: "git",
  },
  {
    id: "git-stash-message",
    syntax: 'git stash push -m "<message>"',
    label: "Stash with a descriptive message",
    description:
      "If you stash frequently, entries pile up and become hard to tell apart. Adding a message with -m labels each stash so you can quickly identify what you stored when you run git stash list later.",
    keywords: ["stash", "message", "label", "named", "organized", "identify"],
    category: "git",
  },
  {
    id: "git-stash-pop",
    syntax: "git stash pop",
    label: "Restore the last stash",
    description:
      "Done with your detour? Pop brings back the most recently stashed changes and removes them from the stash stack. If you want to keep the stash entry around for later use, try git stash apply instead.",
    keywords: ["restore", "recover", "apply", "unstash", "retrieve"],
    category: "git",
  },
  {
    id: "git-stash-list",
    syntax: "git stash list",
    label: "List all stash entries",
    description:
      "See everything you have stashed. Each entry shows an index (stash@{0}, stash@{1}, …) and the branch/commit it was created from. Combine with descriptive -m messages when stashing to make this list actually useful.",
    keywords: ["stash", "list", "entries", "show", "all stashes", "stack"],
    category: "git",
  },
  {
    id: "git-log",
    syntax: "git log --oneline --graph",
    label: "Visualize commit history",
    description:
      "Get a bird's-eye view of your project's history with a condensed, graphical output. Each commit appears on a single line with branch and merge paths drawn as ASCII art — perfect for understanding how branches diverge and converge.",
    keywords: [
      "history",
      "graph",
      "commits",
      "tree",
      "visualization",
      "oneline",
    ],
    category: "git",
  },
  {
    id: "git-log-author",
    syntax: 'git log --author="<name>"',
    label: "Filter commits by author",
    description:
      "Want to see what a specific teammate has been working on, or review your own recent contributions? Filter the log by author name (or email) to narrow down exactly who committed what. Accepts partial matches too.",
    keywords: ["author", "filter", "who", "contributor", "user", "by person"],
    category: "git",
  },
  {
    id: "git-diff",
    syntax: "git diff",
    label: "Show unstaged changes",
    description:
      "Review exactly what you've modified before staging. This shows a line-by-line diff of all changes in your working directory that haven't been added to the staging area yet — a last check before you commit.",
    keywords: [
      "changes",
      "compare",
      "difference",
      "modified",
      "review",
      "before staging",
    ],
    category: "git",
  },
  {
    id: "git-diff-staged",
    syntax: "git diff --staged",
    label: "Show staged changes",
    description:
      "Already ran git add but want to double-check what's about to be committed? This shows the diff of only the staged changes, giving you a final review before you lock in that commit.",
    keywords: ["cached", "staged", "review", "pre-commit", "verify"],
    category: "git",
  },
  {
    id: "git-diff-branches",
    syntax: "git diff <branch1>..<branch2>",
    label: "Compare two branches",
    description:
      "Need to see what changed between your feature branch and main before merging? The double-dot syntax shows all differences between the tips of two branches. Helpful for final reviews or understanding the scope of a merge.",
    keywords: [
      "compare",
      "branches",
      "difference",
      "between",
      "review",
      "scope",
    ],
    category: "git",
  },
  {
    id: "git-reset-soft",
    syntax: "git reset HEAD~1",
    label: "Undo last commit, keep changes",
    description:
      "Made a commit too early or with the wrong message? This undoes the last commit but keeps all your changes in the working directory so you can re-stage and recommit. A safe way to fix your most recent mistake.",
    keywords: ["undo", "uncommit", "soft reset", "fix", "amend", "rollback"],
    category: "git",
  },
  {
    id: "git-reset-hard",
    syntax: "git reset --hard HEAD~1",
    label: "Undo last commit, discard changes",
    description:
      "Nuclear option — this removes the last commit AND all associated changes from your working directory. Use it when you want to completely erase recent work. There's no easy undo, so make sure you really mean it.",
    keywords: [
      "undo",
      "discard",
      "destroy",
      "hard reset",
      "dangerous",
      "permanent",
    ],
    category: "git",
  },
  {
    id: "git-revert",
    syntax: "git revert <commit-hash>",
    label: "Undo a commit safely",
    description:
      "Unlike reset, revert creates a new commit that undoes the changes from a specific past commit. This is the safe way to undo work on shared branches because it doesn't rewrite history — everyone sees the fix in the log.",
    keywords: [
      "undo",
      "safe",
      "new commit",
      "reverse",
      "shared branch",
      "public",
    ],
    category: "git",
  },
  {
    id: "git-cherry-pick",
    syntax: "git cherry-pick <commit-hash>",
    label: "Apply a specific commit",
    description:
      "Need just one specific commit from another branch without merging the whole thing? Cherry-pick copies that single commit and applies it to your current branch. Handy for hotfixes or pulling in specific features.",
    keywords: [
      "pick",
      "specific",
      "single commit",
      "copy",
      "hotfix",
      "selective",
    ],
    category: "git",
  },
  {
    id: "git-fetch-prune",
    syntax: "git fetch --prune",
    label: "Fetch and clean up stale refs",
    description:
      "Fetches the latest state from the remote and removes references to branches that no longer exist there. Run this periodically to keep your local refs tidy — especially useful on active repos where branches are frequently merged and deleted.",
    keywords: [
      "fetch",
      "cleanup",
      "prune",
      "stale",
      "remote branches",
      "housekeeping",
    ],
    category: "git",
  },
  {
    id: "git-branch-list",
    syntax: "git branch -a",
    label: "List all branches (local + remote)",
    description:
      "See every branch — both local and remote-tracking. The -a flag gives the full picture so you know exactly what branches exist, which can help before creating a new one or deciding what to clean up.",
    keywords: ["list", "all branches", "local", "remote", "show", "overview"],
    category: "git",
  },
  {
    id: "git-branch-delete",
    syntax: "git branch -d <branch>",
    label: "Delete a merged branch",
    description:
      "Finished with a feature branch that's been merged? Clean it up with this command. The -d flag is the safe option — Git will refuse to delete the branch if it hasn't been fully merged, protecting you from accidental data loss.",
    keywords: ["delete", "remove", "cleanup", "merged", "safe delete"],
    category: "git",
  },
  {
    id: "git-branch-force-delete",
    syntax: "git branch -D <branch>",
    label: "Force-delete a branch",
    description:
      "Sometimes you need to delete a branch regardless of its merge status — maybe it was an experiment that didn't pan out. The uppercase -D flag forces deletion without the safety check. Make sure you won't need those commits.",
    keywords: [
      "force delete",
      "abandon",
      "discard branch",
      "unmerged",
      "force",
    ],
    category: "git",
  },
  {
    id: "git-branch-rename",
    syntax: "git branch -m <old-name> <new-name>",
    label: "Rename a branch",
    description:
      "Typo in your branch name, or want to adopt a naming convention? The -m flag renames a branch locally. If you've already pushed it, you'll need to push the new name and delete the old one on the remote.",
    keywords: ["rename", "move", "name", "branch name", "change"],
    category: "git",
  },
  {
    id: "git-remote-v",
    syntax: "git remote -v",
    label: "List remote connections",
    description:
      "See all configured remote repositories along with their fetch and push URLs. Useful for verifying you're connected to the right upstream repo, or when troubleshooting push/pull issues in a multi-remote setup.",
    keywords: ["remote", "url", "origin", "upstream", "connections", "list"],
    category: "git",
  },
  {
    id: "git-remote-add",
    syntax: "git remote add <name> <url>",
    label: "Add a new remote",
    description:
      "Working with a fork or need to pull from a second repository? Add another remote with a custom name (upstream, fork, etc.) and its URL. You can then fetch from or push to multiple remotes independently.",
    keywords: [
      "remote",
      "add",
      "fork",
      "upstream",
      "second remote",
      "configure",
    ],
    category: "git",
  },
  {
    id: "git-tag",
    syntax: 'git tag -a v1.0.0 -m "<message>"',
    label: "Create an annotated tag",
    description:
      "Mark a specific point in history as important — typically a release. Annotated tags store the tagger's name, date, and message, making them ideal for version releases. Don't forget to push tags separately with git push --tags.",
    keywords: ["tag", "version", "release", "annotated", "mark", "milestone"],
    category: "git",
  },
  {
    id: "git-clean",
    syntax: "git clean -fd",
    label: "Remove untracked files and directories",
    description:
      "Your working directory is cluttered with generated files, build artifacts, or other junk that isn't tracked by Git? The -f (force) and -d (directories) flags remove all untracked files and empty directories. Add -n first for a dry run to see what would be deleted.",
    keywords: ["clean", "remove", "untracked", "delete", "junk", "artifacts"],
    category: "git",
  },
  {
    id: "git-bisect",
    syntax: "git bisect start",
    label: "Binary search for a bug",
    description:
      "Something broke but you don't know which commit caused it? Bisect uses binary search to efficiently narrow down the offending commit. You mark commits as good or bad, and Git tests the midpoint — drastically reducing the number of commits you need to check.",
    keywords: [
      "bisect",
      "debug",
      "find bug",
      "binary search",
      "regression",
      "broken",
    ],
    category: "git",
  },
  {
    id: "git-reflog",
    syntax: "git reflog",
    label: "View reference log (undo safety net)",
    description:
      "Accidentally deleted a branch or did a hard reset? The reflog records every change to HEAD, even ones not in the normal log. It's your safety net — you can find the commit hash of almost anything you did and recover it with git checkout or git reset.",
    keywords: [
      "reflog",
      "recover",
      "undo",
      "history",
      "safety",
      "lost commits",
      "rescue",
    ],
    category: "git",
  },
  {
    id: "git-blame",
    syntax: "git blame <file>",
    label: "Show who changed each line",
    description:
      "Need to understand why a particular line of code exists or who last modified it? Blame annotates each line of a file with the commit hash, author, and date of the last change. Despite the name, it's more about understanding context than assigning fault.",
    keywords: [
      "blame",
      "annotate",
      "author",
      "who",
      "line history",
      "last change",
    ],
    category: "git",
  },
];

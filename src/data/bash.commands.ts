import type { Command } from "./types";

export const bashCommands: Command[] = [
  {
    id: "bash-ls",
    syntax: "ls",
    label: "List directory contents",
    description:
      "The most basic command for seeing what's in a directory. By default it shows filenames in the current folder. Pipe it to other commands or combine with flags to get exactly the output you need.",
    keywords: ["list", "directory", "files", "folder", "contents"],
    category: "bash",
  },
  {
    id: "bash-ls-la",
    syntax: "ls -la",
    label: "List all files with details",
    description:
      "Combines -l (long format with permissions, owner, size, date) and -a (show hidden dotfiles). This is the go-to command when you need the full picture of a directory — nothing is hidden, and every detail is visible.",
    keywords: [
      "long",
      "hidden",
      "dotfiles",
      "permissions",
      "details",
      "all files",
    ],
    category: "bash",
  },
  {
    id: "bash-ls-lh",
    syntax: "ls -lh",
    label: "List files with human-readable sizes",
    description:
      "The -h flag converts file sizes from raw bytes to human-friendly units like KB, MB, and GB. Much easier to scan than a wall of numbers when you're looking for large files or checking disk usage.",
    keywords: ["human readable", "size", "kilobytes", "megabytes", "readable"],
    category: "bash",
  },
  {
    id: "bash-cd",
    syntax: "cd <directory>",
    label: "Change directory",
    description:
      "Navigate to a different folder in the filesystem. Use absolute paths starting with / or relative paths from your current location. The foundation of terminal navigation — you'll use this hundreds of times a day.",
    keywords: ["change", "navigate", "directory", "folder", "move", "path"],
    category: "bash",
  },
  {
    id: "bash-cd-home",
    syntax: "cd ~",
    label: "Go to home directory",
    description:
      "The tilde ~ is a shortcut for your home directory (/home/username on Linux, /Users/username on macOS). No matter where you are in the filesystem, this takes you straight home.",
    keywords: ["home", "tilde", "user directory", "shortcut"],
    category: "bash",
  },
  {
    id: "bash-cd-back",
    syntax: "cd -",
    label: "Go to previous directory",
    description:
      "Jumps back to the last directory you were in — like an undo for navigation. Incredibly handy when you're constantly switching between two directories deep in the filesystem.",
    keywords: ["previous", "back", "last", "toggle", "switch"],
    category: "bash",
  },
  {
    id: "bash-cd-up",
    syntax: "cd ..",
    label: "Go up one directory level",
    description:
      "Move up to the parent directory. Chain them together like cd ../.. to go up two levels, or cd ../../other to go up and then into a sibling directory tree.",
    keywords: ["parent", "up", "level", "back", "above"],
    category: "bash",
  },
  {
    id: "bash-pwd",
    syntax: "pwd",
    label: "Print working directory",
    description:
      "Lost in the filesystem? This prints the full absolute path of your current directory. Useful in scripts where you need to capture the current location, or when your prompt doesn't show the full path.",
    keywords: ["current", "path", "location", "where", "working directory"],
    category: "bash",
  },
  {
    id: "bash-mkdir",
    syntax: "mkdir <directory>",
    label: "Create a directory",
    description:
      "Creates a new empty directory with the given name. If you need to create deeply nested directories in one go, check out the -p flag variant.",
    keywords: ["create", "folder", "new", "directory", "make"],
    category: "bash",
  },
  {
    id: "bash-mkdir-p",
    syntax: "mkdir -p path/to/nested/dir",
    label: "Create nested directories",
    description:
      "The -p flag creates the entire directory tree in one shot, including any missing parent directories along the way. Without it, mkdir fails if intermediate directories don't exist. Also silently succeeds if the directory already exists.",
    keywords: ["nested", "recursive", "parent", "tree", "deep", "path"],
    category: "bash",
  },
  {
    id: "bash-touch",
    syntax: "touch <file>",
    label: "Create an empty file or update timestamp",
    description:
      "If the file doesn't exist, it creates an empty one. If it does exist, it updates the modification timestamp without changing the content. Often used to quickly scaffold empty files.",
    keywords: ["create", "empty", "file", "new", "timestamp", "update"],
    category: "bash",
  },
  {
    id: "bash-cp",
    syntax: "cp <source> <destination>",
    label: "Copy files",
    description:
      "Creates a duplicate of a file at the specified destination. For copying entire directories with their contents, you'll need the -r (recursive) flag.",
    keywords: ["copy", "duplicate", "clone", "file"],
    category: "bash",
  },
  {
    id: "bash-cp-r",
    syntax: "cp -r <source> <destination>",
    label: "Copy directories recursively",
    description:
      "The -r flag tells cp to descend into directories and copy everything inside — subdirectories, files, the whole tree. Essential when duplicating project folders or creating backups.",
    keywords: [
      "recursive",
      "directory",
      "folder",
      "copy all",
      "deep copy",
      "backup",
    ],
    category: "bash",
  },
  {
    id: "bash-mv",
    syntax: "mv <source> <destination>",
    label: "Move or rename files",
    description:
      "Moves a file or directory to a new location. If the destination is in the same directory, it effectively renames the file. Unlike cp, the original is removed — it's a move, not a copy.",
    keywords: ["move", "rename", "relocate", "transfer"],
    category: "bash",
  },
  {
    id: "bash-rm",
    syntax: "rm <file>",
    label: "Remove a file",
    description:
      "Permanently deletes a file. There's no trash can in the terminal — once it's gone, it's gone. Double-check the filename before hitting Enter, especially when using wildcards.",
    keywords: ["delete", "remove", "file", "permanent", "erase"],
    category: "bash",
  },
  {
    id: "bash-rm-rf",
    syntax: "rm -rf <directory>",
    label: "Force-remove a directory and contents",
    description:
      "The nuclear option: -r means recursive (delete everything inside) and -f means force (don't ask for confirmation). Extremely powerful and equally dangerous — a misplaced space or wrong path can cause irreversible damage. Always verify the target path.",
    keywords: [
      "recursive",
      "force",
      "directory",
      "dangerous",
      "delete all",
      "nuke",
    ],
    category: "bash",
  },
  {
    id: "bash-cat",
    syntax: "cat <file>",
    label: "Display file contents",
    description:
      "Dumps the entire content of a file to the terminal. Fast and simple, but for large files you'll want to pipe to less or head instead. Also useful for concatenating multiple files: cat file1 file2.",
    keywords: ["read", "display", "show", "content", "print", "output"],
    category: "bash",
  },
  {
    id: "bash-head",
    syntax: "head -n <number> <file>",
    label: "Show first N lines of a file",
    description:
      "Displays the first N lines of a file — great for peeking at log files, CSV headers, or large configs without loading the whole thing. Default is 10 lines if you omit -n.",
    keywords: ["first", "lines", "top", "beginning", "preview", "peek"],
    category: "bash",
  },
  {
    id: "bash-tail",
    syntax: "tail -n <number> <file>",
    label: "Show last N lines of a file",
    description:
      "Displays the last N lines of a file — the standard tool for checking the end of log files. Default is 10 lines without -n.",
    keywords: ["last", "lines", "bottom", "end", "log", "recent"],
    category: "bash",
  },
  {
    id: "bash-tail-follow",
    syntax: "tail -f <file>",
    label: "Follow a file in real time",
    description:
      "The -f flag keeps the file open and streams new lines as they're appended — perfect for monitoring log files in real time. Press Ctrl+C to stop. Combine with grep to filter for specific patterns.",
    keywords: [
      "follow",
      "realtime",
      "live",
      "stream",
      "monitor",
      "watch",
      "log",
    ],
    category: "bash",
  },
  {
    id: "bash-grep",
    syntax: "grep <pattern> <file>",
    label: "Search for a pattern in a file",
    description:
      "Scans a file line by line and prints every line that matches the given pattern. The bread and butter of text searching in Unix — combine it with pipes, flags, and regex to build powerful filtering pipelines.",
    keywords: ["search", "find", "pattern", "match", "filter", "text"],
    category: "bash",
  },
  {
    id: "bash-grep-ri",
    syntax: "grep -ri <pattern> <directory>",
    label: "Search recursively, case-insensitive",
    description:
      "The -r flag searches through all files in a directory tree, and -i makes the match case-insensitive. The go-to combination when you're hunting for a string across an entire project and aren't sure about the casing.",
    keywords: [
      "recursive",
      "case insensitive",
      "directory",
      "search all",
      "find in files",
    ],
    category: "bash",
  },
  {
    id: "bash-grep-v",
    syntax: "grep -v <pattern> <file>",
    label: "Exclude lines matching a pattern",
    description:
      "The -v flag inverts the match — it prints every line that does NOT contain the pattern. Handy for filtering out noise from log files or piped output.",
    keywords: [
      "invert",
      "exclude",
      "not",
      "filter out",
      "remove lines",
      "negate",
    ],
    category: "bash",
  },
  {
    id: "bash-find",
    syntax: "find <path> -name <pattern>",
    label: "Find files by name",
    description:
      "Recursively searches a directory tree for files matching a name pattern. Supports wildcards like *.ts or *.log. The most versatile file-finding tool in Unix, with dozens of additional filters for size, date, type, and more.",
    keywords: ["find", "search", "locate", "filename", "wildcard", "recursive"],
    category: "bash",
  },
  {
    id: "bash-find-type",
    syntax: "find <path> -type f -name <pattern>",
    label: "Find only files (not directories)",
    description:
      "Adding -type f restricts results to regular files only, excluding directories that might match the pattern. Use -type d if you specifically want directories instead.",
    keywords: ["type", "file only", "filter", "no directories", "regular file"],
    category: "bash",
  },
  {
    id: "bash-find-exec",
    syntax: "find <path> -name <pattern> -exec <command> {} \\;",
    label: "Find files and execute a command on each",
    description:
      "Combines searching with action — -exec runs a command on every file found. The {} placeholder is replaced with each filename, and \\; terminates the command. Replace \\; with + to batch files into a single command invocation for better performance.",
    keywords: ["exec", "execute", "action", "batch", "process", "transform"],
    category: "bash",
  },
  {
    id: "bash-chmod",
    syntax: "chmod <permissions> <file>",
    label: "Change file permissions",
    description:
      "Controls who can read, write, or execute a file. Use numeric notation (755, 644) or symbolic notation (u+x, go-w). Getting permissions right is critical for security and for making scripts executable.",
    keywords: [
      "permissions",
      "access",
      "read",
      "write",
      "execute",
      "security",
      "mode",
    ],
    category: "bash",
  },
  {
    id: "bash-chmod-x",
    syntax: "chmod +x <file>",
    label: "Make a file executable",
    description:
      "The most common chmod usage — adding execute permission so you can run a script directly (./script.sh). Without this, you'd have to invoke the interpreter explicitly (bash script.sh).",
    keywords: ["executable", "run", "script", "permission", "execute"],
    category: "bash",
  },
  {
    id: "bash-chown",
    syntax: "chown <user>:<group> <file>",
    label: "Change file owner and group",
    description:
      "Transfers ownership of a file or directory to a different user and/or group. Often needed with sudo when setting up services or fixing permission issues after copying files between systems.",
    keywords: ["owner", "group", "ownership", "user", "transfer", "sudo"],
    category: "bash",
  },
  {
    id: "bash-echo",
    syntax: "echo <text>",
    label: "Print text to stdout",
    description:
      "Outputs text to the terminal. Simple but essential — used in scripts for logging, generating output, writing to files with redirection (echo 'data' > file), and debugging by printing variable values.",
    keywords: ["print", "output", "text", "display", "write", "stdout"],
    category: "bash",
  },
  {
    id: "bash-echo-append",
    syntax: "echo <text> >> <file>",
    label: "Append text to a file",
    description:
      "The >> operator appends text to the end of a file without overwriting existing content. Use > (single) to overwrite instead. A quick way to add lines to config files or logs from scripts.",
    keywords: ["append", "write", "redirect", "file", "add line", "output"],
    category: "bash",
  },
  {
    id: "bash-pipe",
    syntax: "command1 | command2",
    label: "Pipe output to another command",
    description:
      "The pipe operator connects the stdout of one command to the stdin of another, forming a processing pipeline. This is the Unix philosophy in action — small, focused commands chained together to accomplish complex tasks.",
    keywords: ["pipe", "chain", "connect", "stdin", "stdout", "pipeline"],
    category: "bash",
  },
  {
    id: "bash-wc",
    syntax: "wc -l <file>",
    label: "Count lines in a file",
    description:
      "Use -l for lines, -w for words, or -c for bytes. Commonly piped with other commands like `ls | wc -l` to count files in a directory, or `grep pattern file | wc -l` to count matches.",
    keywords: ["count", "lines", "words", "bytes", "number", "length"],
    category: "bash",
  },
  {
    id: "bash-sort",
    syntax: "sort <file>",
    label: "Sort lines alphabetically",
    description:
      "Sorts the lines of a file or piped input in alphabetical order. Add -n for numeric sorting, -r for reverse, or -u for unique (removing duplicates). Often piped after other commands to organize output.",
    keywords: ["sort", "order", "alphabetical", "arrange", "organize"],
    category: "bash",
  },
  {
    id: "bash-uniq",
    syntax: "sort <file> | uniq",
    label: "Remove duplicate adjacent lines",
    description:
      "Filters out consecutive duplicate lines — which is why you almost always sort first. Add -c to count occurrences, or -d to show only duplicates. A staple for log analysis and data processing.",
    keywords: [
      "unique",
      "duplicate",
      "deduplicate",
      "remove duplicates",
      "count",
    ],
    category: "bash",
  },
  {
    id: "bash-awk",
    syntax: "awk '{print $1}' <file>",
    label: "Extract columns from text",
    description:
      "A powerful text-processing language. In its simplest form, $1, $2, etc. refer to the first, second, ... columns of whitespace-delimited input. Perfect for pulling specific fields from command output, CSVs, or log files.",
    keywords: [
      "column",
      "extract",
      "field",
      "text processing",
      "parse",
      "data",
    ],
    category: "bash",
  },
  {
    id: "bash-sed",
    syntax: "sed 's/old/new/g' <file>",
    label: "Find and replace text in a file",
    description:
      "The stream editor — processes text line by line. The s/old/new/g syntax replaces all occurrences of 'old' with 'new'. Add -i to edit the file in place, or pipe output to a new file. Supports regular expressions for complex patterns.",
    keywords: [
      "replace",
      "substitute",
      "find and replace",
      "stream editor",
      "regex",
      "transform",
    ],
    category: "bash",
  },
  {
    id: "bash-xargs",
    syntax: "command | xargs <another_command>",
    label: "Build commands from piped input",
    description:
      "Takes input from stdin and converts it into arguments for another command. Essential when you need to pass the output of one command as arguments (not stdin) to another. Combine with find for powerful file operations.",
    keywords: [
      "arguments",
      "stdin",
      "build command",
      "pass",
      "convert",
      "batch",
    ],
    category: "bash",
  },
  {
    id: "bash-tar-create",
    syntax: "tar -czf archive.tar.gz <directory>",
    label: "Create a compressed archive",
    description:
      "Packs a directory into a single compressed .tar.gz file. The flags: -c (create), -z (gzip compression), -f (filename follows). The standard way to package files for transfer or backup on Unix systems.",
    keywords: [
      "archive",
      "compress",
      "gzip",
      "tar",
      "package",
      "backup",
      "zip",
    ],
    category: "bash",
  },
  {
    id: "bash-tar-extract",
    syntax: "tar -xzf archive.tar.gz",
    label: "Extract a compressed archive",
    description:
      "Unpacks a .tar.gz archive into the current directory. The flags: -x (extract), -z (gzip), -f (filename follows). Add -C <path> to extract to a specific directory instead.",
    keywords: ["extract", "decompress", "untar", "unzip", "unpack", "archive"],
    category: "bash",
  },
  {
    id: "bash-du-sh",
    syntax: "du -sh <directory>",
    label: "Show directory size (human-readable)",
    description:
      "Displays the total size of a directory in a human-friendly format. The -s flag shows only the summary (not every file inside), and -h converts to KB/MB/GB. Drop the -s to see a breakdown by subdirectory.",
    keywords: ["disk", "size", "space", "usage", "folder size", "storage"],
    category: "bash",
  },
  {
    id: "bash-df-h",
    syntax: "df -h",
    label: "Show disk space usage",
    description:
      "Reports how much disk space is used and available on all mounted filesystems, in human-readable units. The first thing to check when a server is running low on space or builds start failing due to disk full errors.",
    keywords: [
      "disk",
      "free space",
      "filesystem",
      "storage",
      "capacity",
      "mount",
    ],
    category: "bash",
  },
  {
    id: "bash-ps-aux",
    syntax: "ps aux",
    label: "List all running processes",
    description:
      "Shows every process running on the system with details like PID, CPU/memory usage, and the command that started it. Pipe to grep to find a specific process: ps aux | grep node.",
    keywords: ["process", "running", "pid", "list", "system", "status"],
    category: "bash",
  },
  {
    id: "bash-kill",
    syntax: "kill <pid>",
    label: "Terminate a process by PID",
    description:
      "Sends a signal to a process. By default it sends SIGTERM (graceful shutdown). If the process doesn't respond, escalate with kill -9 <pid> (SIGKILL) to force termination. Get the PID from ps or pgrep.",
    keywords: ["terminate", "stop", "process", "signal", "end", "pid"],
    category: "bash",
  },
  {
    id: "bash-kill-9",
    syntax: "kill -9 <pid>",
    label: "Force-kill a process",
    description:
      "SIGKILL — the process gets no chance to clean up, save state, or say goodbye. It's terminated immediately by the kernel. Use only when a regular kill doesn't work. The process can't catch or ignore this signal.",
    keywords: [
      "force",
      "sigkill",
      "unresponsive",
      "stuck",
      "force terminate",
      "hard kill",
    ],
    category: "bash",
  },
  {
    id: "bash-env",
    syntax: "env",
    label: "List environment variables",
    description:
      "Prints all currently set environment variables and their values. Useful for debugging path issues, checking configurations, or verifying that a variable is set before running a command that depends on it.",
    keywords: [
      "environment",
      "variables",
      "config",
      "path",
      "settings",
      "show",
    ],
    category: "bash",
  },
  {
    id: "bash-export",
    syntax: "export VAR=value",
    label: "Set an environment variable",
    description:
      "Sets a variable and makes it available to child processes. Without export, the variable only exists in the current shell. For permanent variables, add the export line to your .bashrc or .bash_profile.",
    keywords: [
      "set",
      "variable",
      "environment",
      "config",
      "persist",
      "session",
    ],
    category: "bash",
  },
  {
    id: "bash-which",
    syntax: "which <command>",
    label: "Show the path of a command",
    description:
      "Reveals the full path of the executable that would run when you type a command. Essential for debugging 'command not found' errors or figuring out which version of a tool you're actually using when multiple are installed.",
    keywords: ["path", "location", "executable", "where", "find command"],
    category: "bash",
  },
  {
    id: "bash-alias",
    syntax: "alias <name>='<command>'",
    label: "Create a command shortcut",
    description:
      "Defines a shortcut for a longer command. For example, alias ll='ls -la'. Aliases only last for the current session — add them to your .bashrc to make them permanent. Use unalias to remove.",
    keywords: ["shortcut", "alias", "abbreviation", "custom", "quick"],
    category: "bash",
  },
  {
    id: "bash-history",
    syntax: "history",
    label: "Show command history",
    description:
      "Lists previously executed commands with line numbers. Use !<number> to re-run a specific command, or !! to repeat the last one. Press Ctrl+R for interactive reverse search through history.",
    keywords: [
      "history",
      "previous",
      "past commands",
      "recall",
      "repeat",
      "log",
    ],
    category: "bash",
  },
  {
    id: "bash-ctrl-r",
    syntax: "Ctrl+R",
    label: "Reverse search command history",
    description:
      "Start typing and bash will search backward through your command history for a match. Press Ctrl+R again to cycle through older matches. Press Enter to execute, or Esc/Ctrl+C to cancel. The fastest way to find and reuse past commands.",
    keywords: [
      "search",
      "history",
      "reverse",
      "find command",
      "recall",
      "shortcut",
    ],
    category: "bash",
  },
  {
    id: "bash-redirect-stdout",
    syntax: "command > file",
    label: "Redirect stdout to a file",
    description:
      "Sends the standard output of a command to a file instead of the terminal. Overwrites the file if it exists. Use >> to append instead. Use 2> for stderr redirection, or &> for both stdout and stderr.",
    keywords: ["redirect", "output", "file", "write", "overwrite", "stdout"],
    category: "bash",
  },
  {
    id: "bash-redirect-stderr",
    syntax: "command 2>&1",
    label: "Redirect stderr to stdout",
    description:
      "Merges the error stream into the standard output stream. Useful when you want to capture or pipe both regular output and errors together — for example, command 2>&1 | grep error catches errors regardless of which stream they arrive on.",
    keywords: [
      "stderr",
      "error",
      "redirect",
      "merge",
      "combine",
      "output streams",
    ],
    category: "bash",
  },
];

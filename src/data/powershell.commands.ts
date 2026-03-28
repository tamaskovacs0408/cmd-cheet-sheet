import type { Command } from "./types";

export const powershellCommands: Command[] = [
  // --- Navigation & File System ---
  {
    id: "ps-get-location",
    syntax: "Get-Location",
    label: "Print current directory",
    description:
      "Returns the current working directory path. The built-in alias is `pwd`. Useful in scripts to confirm or store the working directory before performing file operations.",
    keywords: ["pwd", "current", "directory", "path", "location"],
    category: "powershell",
  },
  {
    id: "ps-set-location",
    syntax: "Set-Location <path>",
    label: "Change directory",
    description:
      "Navigates to the specified directory. Aliased as `cd`. Works with absolute and relative paths, and even registry or certificate provider paths — PowerShell treats them all as drives.",
    keywords: ["cd", "change", "directory", "navigate", "path"],
    category: "powershell",
  },
  {
    id: "ps-get-childitem",
    syntax: "Get-ChildItem",
    label: "List directory contents",
    description:
      "Lists files and folders in the current directory. Aliased as `ls` and `dir`. Add `-Recurse` for recursive listing, `-Filter` for wildcard matching, and `-Force` to show hidden items.",
    keywords: ["ls", "dir", "list", "files", "folders", "directory"],
    category: "powershell",
  },
  {
    id: "ps-get-childitem-recurse",
    syntax: "Get-ChildItem -Recurse -Filter *.txt",
    label: "Find files recursively by pattern",
    description:
      "Walks through all subdirectories and returns only files matching the given wildcard pattern. Faster than piping through `Where-Object` because `-Filter` is handled by the provider directly.",
    keywords: ["recurse", "find", "search", "wildcard", "filter", "pattern"],
    category: "powershell",
  },
  {
    id: "ps-new-item-file",
    syntax: "New-Item -Path <file> -ItemType File",
    label: "Create a new file",
    description:
      "Creates an empty file at the specified path. Add `-Value` to write initial content. If the parent folder doesn't exist, use `-Force` to create intermediate directories automatically.",
    keywords: ["create", "file", "touch", "new"],
    category: "powershell",
  },
  {
    id: "ps-new-item-dir",
    syntax: "New-Item -Path <dir> -ItemType Directory",
    label: "Create a new directory",
    description:
      "Creates a new folder. Equivalent to `mkdir`. Use `-Force` to silently skip creation if the directory already exists — handy in setup scripts.",
    keywords: ["mkdir", "create", "folder", "directory"],
    category: "powershell",
  },
  {
    id: "ps-copy-item",
    syntax: "Copy-Item <source> <dest>",
    label: "Copy files or folders",
    description:
      "Copies items from one location to another. Aliased as `cp` and `copy`. Add `-Recurse` for folders and `-Force` to overwrite existing items without prompting.",
    keywords: ["cp", "copy", "duplicate", "file"],
    category: "powershell",
  },
  {
    id: "ps-move-item",
    syntax: "Move-Item <source> <dest>",
    label: "Move or rename files",
    description:
      "Moves an item to a new location, effectively renaming it if the destination is in the same directory. Aliased as `mv` and `move`.",
    keywords: ["mv", "move", "rename", "file"],
    category: "powershell",
  },
  {
    id: "ps-remove-item",
    syntax: "Remove-Item <path>",
    label: "Delete files or folders",
    description:
      "Removes the specified item. Aliased as `rm`, `del`, and `rmdir`. Use `-Recurse` for non-empty directories and `-Force` to delete read-only or hidden items.",
    keywords: ["rm", "del", "delete", "remove", "file", "folder"],
    category: "powershell",
  },
  {
    id: "ps-test-path",
    syntax: "Test-Path <path>",
    label: "Check if a path exists",
    description:
      "Returns `$true` or `$false` depending on whether the file, folder, or registry key exists. A quick guard before attempting file operations in scripts.",
    keywords: ["exists", "check", "path", "file", "folder", "test"],
    category: "powershell",
  },

  // --- Content & Text ---
  {
    id: "ps-get-content",
    syntax: "Get-Content <file>",
    label: "Read file contents",
    description:
      "Reads a file line by line and returns an array of strings. Aliased as `cat` and `type`. Use `-Tail 20` to read the last 20 lines, or `-Wait` to follow a log file in real time.",
    keywords: ["cat", "type", "read", "file", "content", "text"],
    category: "powershell",
  },
  {
    id: "ps-set-content",
    syntax: "Set-Content -Path <file> -Value <text>",
    label: "Write content to a file",
    description:
      "Writes the given value to a file, replacing its entire contents. For appending instead of overwriting, use `Add-Content`. Both handle encoding via the `-Encoding` parameter.",
    keywords: ["write", "file", "save", "overwrite", "content"],
    category: "powershell",
  },
  {
    id: "ps-add-content",
    syntax: "Add-Content -Path <file> -Value <text>",
    label: "Append content to a file",
    description:
      "Adds one or more lines to the end of a file without removing existing content. Works the same way as >> in traditional shells.",
    keywords: ["append", "file", "add", "content", "write"],
    category: "powershell",
  },
  {
    id: "ps-select-string",
    syntax: "Select-String -Path <file> -Pattern <regex>",
    label: "Search text with regex",
    description:
      "PowerShell's equivalent of `grep`. Searches file contents for lines matching a regular expression. Returns match objects with line numbers, filenames, and matched text. Pipe `Get-ChildItem` into it for recursive searching.",
    keywords: ["grep", "search", "regex", "find", "text", "pattern", "match"],
    category: "powershell",
  },

  // --- Pipeline & Object Manipulation ---
  {
    id: "ps-where-object",
    syntax: "... | Where-Object { $_.Property -eq 'value' }",
    label: "Filter objects in the pipeline",
    description:
      "Filters pipeline objects based on a script block condition. Uses `$_` to reference the current object. Comparison operators include `-eq`, `-ne`, `-gt`, `-lt`, `-like`, `-match`, and more.",
    keywords: ["filter", "where", "condition", "pipeline", "query"],
    category: "powershell",
  },
  {
    id: "ps-select-object",
    syntax: "... | Select-Object -Property Name, Size",
    label: "Pick specific properties",
    description:
      "Projects only the properties you care about from objects in the pipeline. Also supports `-First`, `-Last`, `-Skip`, and `-Unique` for limiting and deduplicating results.",
    keywords: ["select", "properties", "columns", "project", "pick"],
    category: "powershell",
  },
  {
    id: "ps-sort-object",
    syntax: "... | Sort-Object -Property <prop> -Descending",
    label: "Sort objects by property",
    description:
      "Sorts pipeline objects by one or more properties. Add `-Descending` for reverse order. Supports multi-level sorting by passing multiple property names.",
    keywords: ["sort", "order", "ascending", "descending", "arrange"],
    category: "powershell",
  },
  {
    id: "ps-group-object",
    syntax: "... | Group-Object -Property <prop>",
    label: "Group objects by property",
    description:
      "Groups pipeline objects that share the same property value. Returns group objects with `Count`, `Name`, and `Group` properties — great for quick aggregation and analysis.",
    keywords: ["group", "aggregate", "count", "categorize"],
    category: "powershell",
  },
  {
    id: "ps-measure-object",
    syntax: "... | Measure-Object -Property <prop> -Sum -Average",
    label: "Calculate statistics",
    description:
      "Computes numeric statistics (count, sum, average, min, max) for a property. Without a property, it counts objects in the pipeline. Essential for quick data analysis.",
    keywords: [
      "measure",
      "count",
      "sum",
      "average",
      "statistics",
      "min",
      "max",
    ],
    category: "powershell",
  },
  {
    id: "ps-foreach-object",
    syntax: "... | ForEach-Object { $_ }",
    label: "Iterate over pipeline objects",
    description:
      "Executes a script block for each object in the pipeline. Aliased as `%`. Use `$_` to reference the current object. Ideal for transformation, side effects, or calling methods on each item.",
    keywords: ["foreach", "loop", "iterate", "each", "pipeline"],
    category: "powershell",
  },
  {
    id: "ps-format-table",
    syntax: "... | Format-Table -AutoSize",
    label: "Display results as a table",
    description:
      "Formats pipeline output as a table with auto-sized columns. Use `-Property` to pick specific columns, or `-Wrap` to prevent truncation of wide values. Aliased as `ft`.",
    keywords: ["format", "table", "display", "output", "columns"],
    category: "powershell",
  },
  {
    id: "ps-format-list",
    syntax: "... | Format-List -Property *",
    label: "Display results as a list",
    description:
      "Formats each object as a vertical list of property-value pairs. Use `-Property *` to show every property. Best for inspecting a single object in detail. Aliased as `fl`.",
    keywords: ["format", "list", "display", "properties", "detail"],
    category: "powershell",
  },

  // --- Variables & Data Types ---
  {
    id: "ps-variable",
    syntax: "$myVar = 'value'",
    label: "Create a variable",
    description:
      "All PowerShell variables start with `$`. They are dynamically typed — assign a string, number, array, or object and the type is inferred. Use `[type]$var` to constrain the type.",
    keywords: ["variable", "assign", "set", "store", "value"],
    category: "powershell",
  },
  {
    id: "ps-array",
    syntax: "$arr = @(1, 2, 3)",
    label: "Create an array",
    description:
      "Creates an array using the array sub-expression operator `@()`. Access elements with `$arr[0]`. Use `+=` to append, `.Count` for length, and pipeline cmdlets for filtering and transformation.",
    keywords: ["array", "list", "collection", "elements"],
    category: "powershell",
  },
  {
    id: "ps-hashtable",
    syntax: "$ht = @{ Key = 'Value'; Num = 42 }",
    label: "Create a hashtable",
    description:
      "Hashtables are key-value dictionaries. Access values with `$ht.Key` or `$ht['Key']`. They're the foundation of many PowerShell patterns — splatting, custom objects, and configuration data all use hashtables.",
    keywords: ["hashtable", "dictionary", "key", "value", "map", "object"],
    category: "powershell",
  },

  // --- Process & Service Management ---
  {
    id: "ps-get-process",
    syntax: "Get-Process",
    label: "List running processes",
    description:
      "Returns all running processes with CPU, memory, and handle information. Filter by name with `Get-Process -Name chrome` or use `Where-Object` for complex conditions.",
    keywords: ["process", "running", "task", "list", "ps"],
    category: "powershell",
  },
  {
    id: "ps-stop-process",
    syntax: "Stop-Process -Name <name> -Force",
    label: "Kill a process by name",
    description:
      "Terminates processes matching the name. Use `-Id` to target a specific PID instead. `-Force` suppresses confirmation prompts. Equivalent to `taskkill` in cmd.",
    keywords: ["kill", "stop", "terminate", "process", "end"],
    category: "powershell",
  },
  {
    id: "ps-get-service",
    syntax: "Get-Service",
    label: "List Windows services",
    description:
      "Returns all Windows services with their status (Running, Stopped, etc.). Filter with `-Name` or pipe to `Where-Object` to find specific services by display name or status.",
    keywords: ["service", "list", "windows", "status", "running"],
    category: "powershell",
  },
  {
    id: "ps-restart-service",
    syntax: "Restart-Service -Name <service>",
    label: "Restart a Windows service",
    description:
      "Stops and then starts a service. Requires administrator privileges. Also available: `Start-Service` and `Stop-Service` for one-directional control.",
    keywords: ["restart", "service", "start", "stop", "windows"],
    category: "powershell",
  },

  // --- System Information ---
  {
    id: "ps-get-computerinfo",
    syntax: "Get-ComputerInfo",
    label: "Get system information",
    description:
      "Returns a comprehensive object with OS version, hardware details, BIOS info, timezone, and more. Pipe to `Select-Object` to pick specific properties from the large output.",
    keywords: ["system", "info", "computer", "hardware", "os", "version"],
    category: "powershell",
  },
  {
    id: "ps-get-disk",
    syntax: "Get-PSDrive -PSProvider FileSystem",
    label: "List disk drives and free space",
    description:
      "Shows all filesystem drives with used and free space in bytes. For physical disk info, use `Get-Disk` or `Get-Volume` from the Storage module on Windows.",
    keywords: ["disk", "drive", "space", "free", "storage", "filesystem"],
    category: "powershell",
  },
  {
    id: "ps-get-history",
    syntax: "Get-History",
    label: "Show command history",
    description:
      "Lists commands run in the current session. Use `Invoke-History <id>` to re-run a command by its ID. For persistent history across sessions, PSReadLine stores it in a file accessible via `Get-PSReadLineOption`.",
    keywords: ["history", "commands", "previous", "session"],
    category: "powershell",
  },

  // --- Networking ---
  {
    id: "ps-test-connection",
    syntax: "Test-Connection <hostname> -Count 4",
    label: "Ping a host",
    description:
      "PowerShell's `ping` equivalent. Sends ICMP echo requests and returns response objects with latency, TTL, and status. Add `-Quiet` for a simple `$true`/`$false` result in scripts.",
    keywords: ["ping", "network", "test", "connection", "latency"],
    category: "powershell",
  },
  {
    id: "ps-test-netconnection",
    syntax: "Test-NetConnection <host> -Port <port>",
    label: "Test TCP port connectivity",
    description:
      "Checks if a specific TCP port is reachable on a remote host. Returns detailed info including latency, remote address, and whether the TCP connection succeeded. Essential for firewall and service troubleshooting.",
    keywords: ["port", "tcp", "network", "firewall", "test", "connection"],
    category: "powershell",
  },
  {
    id: "ps-invoke-webrequest",
    syntax: "Invoke-WebRequest -Uri <url>",
    label: "Make an HTTP request",
    description:
      "Sends an HTTP/HTTPS request and returns the response object with status code, headers, and content. Use `-Method`, `-Body`, `-Headers`, and `-ContentType` for full control. Aliased as `iwr`.",
    keywords: ["http", "web", "request", "api", "curl", "download", "url"],
    category: "powershell",
  },
  {
    id: "ps-invoke-restmethod",
    syntax: "Invoke-RestMethod -Uri <url> -Method Get",
    label: "Call a REST API",
    description:
      "Similar to `Invoke-WebRequest` but automatically parses JSON/XML responses into PowerShell objects. Preferred for API calls because you can immediately access properties without manual parsing.",
    keywords: ["rest", "api", "json", "web", "http", "invoke"],
    category: "powershell",
  },

  // --- Modules & Help ---
  {
    id: "ps-get-command",
    syntax: "Get-Command <name>",
    label: "Find available commands",
    description:
      "Searches for cmdlets, functions, aliases, and scripts by name. Use wildcards like `Get-Command *Service*` to discover commands. Add `-Module` to search within a specific module.",
    keywords: ["find", "command", "search", "cmdlet", "discover"],
    category: "powershell",
  },
  {
    id: "ps-get-help",
    syntax: "Get-Help <cmdlet> -Full",
    label: "Show detailed help for a command",
    description:
      "Displays comprehensive documentation for a cmdlet including syntax, parameters, examples, and notes. Run `Update-Help` first to download the latest help files. Use `-Examples` for just the examples.",
    keywords: ["help", "man", "documentation", "manual", "usage"],
    category: "powershell",
  },
  {
    id: "ps-get-member",
    syntax: "... | Get-Member",
    label: "Inspect object properties and methods",
    description:
      "Shows all properties, methods, and events available on objects in the pipeline. The single most important discovery tool in PowerShell — use it whenever you need to know what you can do with an object.",
    keywords: ["member", "properties", "methods", "inspect", "type", "object"],
    category: "powershell",
  },
  {
    id: "ps-install-module",
    syntax: "Install-Module -Name <module> -Scope CurrentUser",
    label: "Install a PowerShell module",
    description:
      "Downloads and installs a module from the PowerShell Gallery. Use `-Scope CurrentUser` to avoid needing admin privileges. Check available modules with `Find-Module <name>`.",
    keywords: ["install", "module", "gallery", "package", "add"],
    category: "powershell",
  },
  {
    id: "ps-import-module",
    syntax: "Import-Module <module>",
    label: "Load a module into the session",
    description:
      "Imports a module so its cmdlets, functions, and variables become available. Most installed modules auto-load on first use, but explicit import is needed for scripts or when you want to force a reload with `-Force`.",
    keywords: ["import", "module", "load", "session"],
    category: "powershell",
  },

  // --- Scripting Essentials ---
  {
    id: "ps-if-else",
    syntax: "if ($condition) { ... } elseif ($other) { ... } else { ... }",
    label: "Conditional branching",
    description:
      "Standard if/elseif/else control flow. Conditions use PowerShell comparison operators: `-eq`, `-ne`, `-gt`, `-lt`, `-ge`, `-le`, `-like`, `-match`, `-in`, `-contains`. Combine with `-and`, `-or`, `-not`.",
    keywords: ["if", "else", "elseif", "condition", "branch", "logic"],
    category: "powershell",
  },
  {
    id: "ps-foreach",
    syntax: "foreach ($item in $collection) { ... }",
    label: "Loop over a collection",
    description:
      "Iterates over each element in an array or collection. Faster than the `ForEach-Object` cmdlet for in-memory collections. Use `break` and `continue` to control flow within the loop.",
    keywords: ["foreach", "loop", "iterate", "collection", "array"],
    category: "powershell",
  },
  {
    id: "ps-try-catch",
    syntax: "try { ... } catch { $_.Exception.Message } finally { ... }",
    label: "Error handling",
    description:
      "Catches terminating errors. The `catch` block receives the error in `$_`. Chain multiple `catch` blocks for different exception types. The `finally` block always runs — for cleanup logic.",
    keywords: ["try", "catch", "finally", "error", "exception", "handling"],
    category: "powershell",
  },
  {
    id: "ps-function",
    syntax: "function Verb-Noun { param($Param1, $Param2) ... }",
    label: "Define a function",
    description:
      "Creates a reusable function. Follow the Verb-Noun naming convention for discoverability. Use `param()` for parameters with optional type constraints, default values, and validation attributes.",
    keywords: ["function", "define", "param", "reusable", "verb", "noun"],
    category: "powershell",
  },

  // --- Output & Export ---
  {
    id: "ps-export-csv",
    syntax: "... | Export-Csv -Path <file> -NoTypeInformation",
    label: "Export data to CSV",
    description:
      "Writes pipeline objects to a CSV file. Each property becomes a column. Use `-NoTypeInformation` to skip the type header line. Import back with `Import-Csv`.",
    keywords: ["export", "csv", "file", "save", "data", "spreadsheet"],
    category: "powershell",
  },
  {
    id: "ps-convertto-json",
    syntax: "... | ConvertTo-Json -Depth 5",
    label: "Convert objects to JSON",
    description:
      "Serializes PowerShell objects to JSON strings. Set `-Depth` to control nesting level (default is 2, which truncates deep objects). Pair with `ConvertFrom-Json` for round-tripping.",
    keywords: ["json", "convert", "serialize", "export", "data"],
    category: "powershell",
  },
  {
    id: "ps-out-file",
    syntax: "... | Out-File -FilePath <file>",
    label: "Redirect output to a file",
    description:
      "Sends formatted output to a file. Similar to `>` redirection but gives you control over encoding and append mode via `-Encoding` and `-Append`. For raw object data, prefer `Set-Content` or `Export-Csv`.",
    keywords: ["output", "file", "redirect", "save", "write"],
    category: "powershell",
  },

  // --- Execution Policy & Security ---
  {
    id: "ps-get-executionpolicy",
    syntax: "Get-ExecutionPolicy",
    label: "Check script execution policy",
    description:
      "Returns the current execution policy (Restricted, RemoteSigned, Unrestricted, etc.). This policy determines which scripts PowerShell is allowed to run — it's the first thing to check when scripts won't execute.",
    keywords: ["execution", "policy", "security", "scripts", "permission"],
    category: "powershell",
  },
  {
    id: "ps-set-executionpolicy",
    syntax:
      "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser",
    label: "Change script execution policy",
    description:
      "Updates the execution policy. `RemoteSigned` is the recommended balance — local scripts run freely, downloaded scripts need a signature. Use `-Scope CurrentUser` to avoid needing admin privileges.",
    keywords: [
      "execution",
      "policy",
      "set",
      "security",
      "unrestricted",
      "remotesigned",
    ],
    category: "powershell",
  },
];

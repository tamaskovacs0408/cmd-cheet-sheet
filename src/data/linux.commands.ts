import type { Command } from "./types";

export const linuxCommands: Command[] = [
  // ─── System Information ─────────────────────────────────────────────

  {
    id: "linux-uname",
    syntax: "uname -a",
    label: "Show system information",
    description:
      "Prints everything about the running kernel in one line: kernel name, hostname, kernel version, architecture, and OS. The go-to command when you need to quickly identify what system you're working on — especially useful when SSHing into unfamiliar servers.",
    keywords: ["system", "kernel", "version", "architecture", "os", "info"],
    category: "linux",
  },
  {
    id: "linux-hostname",
    syntax: "hostname",
    label: "Show or set the system hostname",
    description:
      "Prints the current hostname of the machine. On most systems, you can also use hostnamectl to see a richer set of details including the operating system, kernel, and chassis type. Helpful for verifying you're on the right server.",
    keywords: ["hostname", "machine name", "server", "identity"],
    category: "linux",
  },
  {
    id: "linux-uptime",
    syntax: "uptime",
    label: "Show how long the system has been running",
    description:
      "Displays current time, how long the system has been up, number of logged-in users, and load averages for the past 1, 5, and 15 minutes. A quick health check — if the load average consistently exceeds your CPU count, something's hogging resources.",
    keywords: ["uptime", "load", "running", "boot", "duration", "load average"],
    category: "linux",
  },
  {
    id: "linux-whoami",
    syntax: "whoami",
    label: "Print the current username",
    description:
      "Shows which user you're currently logged in as. Sounds trivial, but it's essential when switching between regular and root accounts with su or sudo — a quick sanity check before running destructive commands.",
    keywords: ["user", "current user", "identity", "logged in", "account"],
    category: "linux",
  },
  {
    id: "linux-id",
    syntax: "id",
    label: "Show user ID and group memberships",
    description:
      "Displays your UID, GID, and all group memberships. Crucial for debugging permission issues — if a process can't access a file, check whether your user belongs to the required group with this command.",
    keywords: ["uid", "gid", "groups", "user id", "membership", "permissions"],
    category: "linux",
  },
  {
    id: "linux-lsb-release",
    syntax: "lsb_release -a",
    label: "Show Linux distribution info",
    description:
      "Prints the distribution name, version, and codename. Not available on every distro, but when it is, it's the clearest way to identify whether you're on Ubuntu 22.04, Debian 12, or something else entirely. On newer systems, try cat /etc/os-release as an alternative.",
    keywords: [
      "distro",
      "distribution",
      "version",
      "ubuntu",
      "debian",
      "release",
    ],
    category: "linux",
  },

  // ─── User & Permission Management ──────────────────────────────────

  {
    id: "linux-sudo",
    syntax: "sudo <command>",
    label: "Run a command as root",
    description:
      "Executes a single command with superuser privileges. You'll be prompted for your own password (not root's). Use it for administrative tasks like installing packages, editing system configs, or managing services. Avoid running a full shell as root when you only need one command.",
    keywords: ["root", "superuser", "admin", "elevated", "privilege"],
    category: "linux",
  },
  {
    id: "linux-su",
    syntax: "su - <username>",
    label: "Switch to another user",
    description:
      "Opens a login shell as a different user. The dash (-) ensures you get the target user's full environment — PATH, home directory, and all. Without the dash, you inherit the current environment which can cause confusing behavior.",
    keywords: ["switch user", "login", "other user", "shell", "session"],
    category: "linux",
  },
  {
    id: "linux-useradd",
    syntax: "sudo useradd -m -s /bin/bash <username>",
    label: "Create a new user with home directory",
    description:
      "Creates a user account with a home directory (-m) and sets their default shell to bash (-s). Follow up with passwd <username> to set their password. The most common recipe for adding interactive users to a system.",
    keywords: ["create user", "add user", "account", "new user", "home"],
    category: "linux",
  },
  {
    id: "linux-passwd",
    syntax: "passwd <username>",
    label: "Change a user's password",
    description:
      "Sets or changes the password for a user account. Without a username argument, it changes your own password. Root can change any user's password without knowing the old one — useful for resetting locked-out accounts.",
    keywords: [
      "password",
      "change password",
      "reset",
      "credentials",
      "security",
    ],
    category: "linux",
  },
  {
    id: "linux-usermod",
    syntax: "sudo usermod -aG <group> <username>",
    label: "Add a user to a group",
    description:
      "The -aG flags append the user to a supplementary group without removing them from existing groups. Critical distinction: without -a, the user gets removed from all other groups. Common use cases: adding users to docker, sudo, or www-data groups.",
    keywords: ["group", "add to group", "modify user", "membership", "append"],
    category: "linux",
  },
  {
    id: "linux-groups",
    syntax: "groups <username>",
    label: "Show a user's group memberships",
    description:
      "Lists all groups a user belongs to. A quick way to verify whether someone has the right access — for instance, checking if a user is in the docker group before telling them to restart the daemon.",
    keywords: ["groups", "membership", "list groups", "belongs to", "access"],
    category: "linux",
  },

  // ─── Package Management ─────────────────────────────────────────────

  {
    id: "linux-apt-update",
    syntax: "sudo apt update",
    label: "Update package index (Debian/Ubuntu)",
    description:
      "Refreshes the list of available packages and their versions from all configured repositories. This doesn't install anything — it just syncs the local index so you know what's available. Always run this before apt install or apt upgrade.",
    keywords: ["apt", "update", "package list", "refresh", "index", "debian"],
    category: "linux",
  },
  {
    id: "linux-apt-upgrade",
    syntax: "sudo apt upgrade -y",
    label: "Upgrade all installed packages",
    description:
      "Installs the newest versions of all currently installed packages. The -y flag automatically confirms the prompt. Run apt update first to ensure you're pulling the latest versions. Does not remove packages or install new dependencies.",
    keywords: ["upgrade", "update packages", "patch", "latest", "security"],
    category: "linux",
  },
  {
    id: "linux-apt-install",
    syntax: "sudo apt install <package>",
    label: "Install a package (Debian/Ubuntu)",
    description:
      "Downloads and installs a package along with all its dependencies. The bread and butter of software management on Debian-based systems. Add -y to skip the confirmation prompt in scripts.",
    keywords: ["install", "apt", "package", "software", "download", "setup"],
    category: "linux",
  },
  {
    id: "linux-apt-remove",
    syntax: "sudo apt remove <package>",
    label: "Remove a package",
    description:
      "Uninstalls a package but keeps its configuration files. Use apt purge instead if you want to remove config files too — useful when you want a completely clean slate before reinstalling.",
    keywords: ["remove", "uninstall", "delete", "package", "clean"],
    category: "linux",
  },
  {
    id: "linux-apt-search",
    syntax: "apt search <keyword>",
    label: "Search for a package",
    description:
      "Searches package names and descriptions for the given keyword. Returns a list of matching packages with a short description of each. Handy when you know roughly what you need but not the exact package name.",
    keywords: ["search", "find package", "lookup", "discover", "available"],
    category: "linux",
  },
  {
    id: "linux-dpkg-list",
    syntax: "dpkg -l | grep <package>",
    label: "Check if a package is installed",
    description:
      "Lists installed packages and filters for a name. The dpkg database knows every .deb ever installed on the system. Combine with grep to quickly confirm whether something is present and see its version.",
    keywords: ["installed", "check", "verify", "dpkg", "list", "package info"],
    category: "linux",
  },

  // ─── Service Management (systemd) ──────────────────────────────────

  {
    id: "linux-systemctl-status",
    syntax: "systemctl status <service>",
    label: "Check a service's status",
    description:
      "Shows whether a service is active, inactive, or failed, along with recent log lines. The first thing to run when something isn't working — nginx not responding? Check systemctl status nginx for the error right there.",
    keywords: ["status", "service", "running", "active", "failed", "check"],
    category: "linux",
  },
  {
    id: "linux-systemctl-start",
    syntax: "sudo systemctl start <service>",
    label: "Start a service",
    description:
      "Starts a service immediately. It won't persist across reboots unless you also enable it. Common after installing new software like nginx, postgresql, or docker that needs to be launched manually the first time.",
    keywords: ["start", "launch", "service", "run", "activate"],
    category: "linux",
  },
  {
    id: "linux-systemctl-stop",
    syntax: "sudo systemctl stop <service>",
    label: "Stop a service",
    description:
      "Gracefully stops a running service. The service can be restarted later with start. Use this when you need to take a service offline for maintenance or troubleshooting without completely disabling it.",
    keywords: ["stop", "halt", "service", "shutdown", "offline"],
    category: "linux",
  },
  {
    id: "linux-systemctl-restart",
    syntax: "sudo systemctl restart <service>",
    label: "Restart a service",
    description:
      "Stops and then starts a service. This is the standard operation after changing a service's configuration file — most services need a restart to pick up config changes. Brief downtime is expected during the restart.",
    keywords: ["restart", "reload", "service", "config change", "refresh"],
    category: "linux",
  },
  {
    id: "linux-systemctl-enable",
    syntax: "sudo systemctl enable <service>",
    label: "Enable a service at boot",
    description:
      "Configures a service to start automatically when the system boots. This just creates the symlink — it doesn't start the service now. Combine with --now to enable and start in one command: systemctl enable --now <service>.",
    keywords: ["enable", "boot", "autostart", "persistent", "startup"],
    category: "linux",
  },
  {
    id: "linux-journalctl",
    syntax: "journalctl -u <service> -f",
    label: "Follow a service's logs in real time",
    description:
      "The systemd journal captures all service output. The -u flag filters by service name and -f follows new entries in real time — like tail -f but for any systemd service. Add --since '5 min ago' to limit the time window.",
    keywords: ["logs", "journal", "follow", "realtime", "debug", "output"],
    category: "linux",
  },

  // ─── Disk & Filesystem ─────────────────────────────────────────────

  {
    id: "linux-lsblk",
    syntax: "lsblk",
    label: "List block devices (disks & partitions)",
    description:
      "Shows all block devices in a tree-like format: disks, partitions, and their mount points. Faster and cleaner than fdisk -l for getting an overview of your storage layout. Add -f to see filesystem types and UUIDs.",
    keywords: [
      "disks",
      "partitions",
      "block devices",
      "storage",
      "mount",
      "list",
    ],
    category: "linux",
  },
  {
    id: "linux-mount",
    syntax: "sudo mount /dev/sdb1 /mnt/data",
    label: "Mount a filesystem",
    description:
      "Attaches a partition or disk to a directory so you can access its files. The device (/dev/sdb1) becomes accessible at the mount point (/mnt/data). For permanent mounts that survive reboots, add an entry to /etc/fstab.",
    keywords: ["mount", "attach", "filesystem", "disk", "partition", "access"],
    category: "linux",
  },
  {
    id: "linux-umount",
    syntax: "sudo umount /mnt/data",
    label: "Unmount a filesystem",
    description:
      "Detaches a mounted filesystem. Always unmount before physically removing drives — failing to do so can cause data corruption. If you get 'target is busy', check for open files with lsof /mnt/data.",
    keywords: ["unmount", "detach", "eject", "remove", "safe"],
    category: "linux",
  },
  {
    id: "linux-fdisk",
    syntax: "sudo fdisk -l",
    label: "List all disk partitions",
    description:
      "Shows detailed partition tables for all disks: sizes, types, and sector ranges. More verbose than lsblk — use it when you need to verify partition layout before resizing, formatting, or debugging boot issues.",
    keywords: ["partition", "disk", "fdisk", "layout", "table", "sectors"],
    category: "linux",
  },

  // ─── Networking ─────────────────────────────────────────────────────

  {
    id: "linux-ip-addr",
    syntax: "ip addr show",
    label: "Show network interfaces and IP addresses",
    description:
      "The modern replacement for ifconfig. Lists every network interface with its IP addresses, MAC addresses, and state (UP/DOWN). The first command to run when debugging connectivity — verify the interface is up and has the expected IP.",
    keywords: ["ip", "address", "interface", "network", "inet", "mac"],
    category: "linux",
  },
  {
    id: "linux-ip-route",
    syntax: "ip route show",
    label: "Show routing table",
    description:
      "Displays the kernel's routing table — where traffic goes for each destination. Look for the 'default via' line to see your gateway. Essential for diagnosing why traffic reaches some hosts but not others.",
    keywords: ["route", "gateway", "routing table", "default", "network path"],
    category: "linux",
  },
  {
    id: "linux-ss",
    syntax: "ss -tulnp",
    label: "Show listening ports and connections",
    description:
      "The modern replacement for netstat. The flags: -t TCP, -u UDP, -l listening only, -n numeric (no DNS), -p show process. The definitive answer to 'what's running on port 8080?' — faster and more reliable than netstat.",
    keywords: [
      "ports",
      "listening",
      "connections",
      "socket",
      "tcp",
      "udp",
      "netstat",
    ],
    category: "linux",
  },
  {
    id: "linux-ping",
    syntax: "ping -c 4 <host>",
    label: "Test network connectivity",
    description:
      "Sends ICMP echo requests to a host and measures round-trip time. The -c 4 flag limits it to 4 packets (on Linux it keeps going without it). The most basic network diagnostic: if ping works, the network path is alive.",
    keywords: [
      "ping",
      "connectivity",
      "network",
      "latency",
      "reachable",
      "test",
    ],
    category: "linux",
  },
  {
    id: "linux-traceroute",
    syntax: "traceroute <host>",
    label: "Trace the route to a host",
    description:
      "Shows every hop (router) between you and the destination, with latency at each step. When ping fails or is slow, traceroute reveals where the problem is — your local network, your ISP, or the destination's infrastructure.",
    keywords: ["traceroute", "hops", "path", "latency", "route", "diagnostic"],
    category: "linux",
  },
  {
    id: "linux-dig",
    syntax: "dig <domain>",
    label: "DNS lookup",
    description:
      "Queries DNS servers for records of a domain — A records, CNAME, MX, and more. More detailed than nslookup and the preferred tool for DNS troubleshooting. Add +short for just the IP, or specify a record type like dig MX example.com.",
    keywords: ["dns", "lookup", "domain", "resolve", "nameserver", "record"],
    category: "linux",
  },
  {
    id: "linux-netcat",
    syntax: "nc -zv <host> <port>",
    label: "Test if a port is open",
    description:
      "Netcat (nc) with -z (scan) and -v (verbose) checks whether a specific port is open on a remote host. No data is sent — it just reports 'Connection succeeded' or 'Connection refused'. Faster than a full curl for simple connectivity checks.",
    keywords: [
      "netcat",
      "port scan",
      "test port",
      "open",
      "connection",
      "check",
    ],
    category: "linux",
  },

  // ─── Process & Resource Monitoring ──────────────────────────────────

  {
    id: "linux-top",
    syntax: "top",
    label: "Real-time process monitor",
    description:
      "An interactive, real-time view of running processes sorted by CPU usage. Shows system load, memory usage, and per-process stats. Press 'M' to sort by memory, 'k' to kill a process, or 'q' to quit. The classic system monitoring tool.",
    keywords: [
      "processes",
      "monitor",
      "cpu",
      "memory",
      "realtime",
      "task manager",
    ],
    category: "linux",
  },
  {
    id: "linux-htop",
    syntax: "htop",
    label: "Interactive process viewer (enhanced)",
    description:
      "A friendlier, color-coded alternative to top with mouse support, horizontal scrolling, and easier process management. Shows CPU cores individually and lets you filter, search, and kill processes interactively. Install with apt install htop if not present.",
    keywords: ["htop", "process viewer", "interactive", "enhanced", "colorful"],
    category: "linux",
  },
  {
    id: "linux-free",
    syntax: "free -h",
    label: "Show memory usage",
    description:
      "Displays total, used, free, and available RAM and swap in human-readable units. The 'available' column is what matters — it's how much memory can be allocated to new processes, accounting for cache that can be reclaimed.",
    keywords: ["memory", "ram", "free", "used", "swap", "available"],
    category: "linux",
  },
  {
    id: "linux-vmstat",
    syntax: "vmstat 1 5",
    label: "Virtual memory and system stats",
    description:
      "Prints a snapshot of system performance every 1 second, 5 times. Shows processes, memory, swap, I/O, and CPU activity. The 'wa' column under CPU reveals I/O wait — high values mean the disk is the bottleneck, not the CPU.",
    keywords: ["vmstat", "memory", "io", "cpu", "performance", "wait"],
    category: "linux",
  },
  {
    id: "linux-iostat",
    syntax: "iostat -xz 1",
    label: "Disk I/O statistics",
    description:
      "Reports CPU and disk I/O stats with extended (-x) details, skipping idle devices (-z), updated every second. Look at %util (how busy the disk is) and await (average latency per request). Part of the sysstat package — install if missing.",
    keywords: [
      "disk io",
      "iostat",
      "throughput",
      "latency",
      "utilization",
      "storage",
    ],
    category: "linux",
  },

  // ─── Log Management ─────────────────────────────────────────────────

  {
    id: "linux-dmesg",
    syntax: "dmesg -T | tail -50",
    label: "Show kernel messages (human-readable time)",
    description:
      "Displays kernel ring buffer messages — hardware events, driver issues, USB connections, disk errors. The -T flag converts timestamps to human-readable format. Pipe to tail to see recent messages. The first place to look when hardware misbehaves.",
    keywords: ["kernel", "dmesg", "hardware", "driver", "boot", "errors"],
    category: "linux",
  },
  {
    id: "linux-syslog",
    syntax: "tail -f /var/log/syslog",
    label: "Follow system log in real time",
    description:
      "The central system log captures messages from the kernel, services, and applications. Following it in real time helps diagnose issues as they happen — cron job failures, service crashes, auth problems all show up here.",
    keywords: [
      "syslog",
      "system log",
      "follow",
      "realtime",
      "monitor",
      "debug",
    ],
    category: "linux",
  },
  {
    id: "linux-auth-log",
    syntax: "sudo tail -100 /var/log/auth.log",
    label: "Check authentication log",
    description:
      "Records all authentication events: SSH logins (successful and failed), sudo usage, and PAM messages. The first place to check after a suspected security incident or when debugging login failures. On RHEL/CentOS, check /var/log/secure instead.",
    keywords: ["auth", "login", "ssh", "security", "failed", "authentication"],
    category: "linux",
  },

  // ─── SSH & Remote Access ────────────────────────────────────────────

  {
    id: "linux-ssh",
    syntax: "ssh user@hostname",
    label: "Connect to a remote server",
    description:
      "Opens an encrypted shell session on a remote machine. The most fundamental remote access tool in Linux. Add -p for a custom port, -i for a specific key file, or -v for verbose debugging output when connections fail.",
    keywords: ["ssh", "remote", "connect", "shell", "login", "server"],
    category: "linux",
  },
  {
    id: "linux-ssh-key-gen",
    syntax: 'ssh-keygen -t ed25519 -C "your@email.com"',
    label: "Generate an SSH key pair",
    description:
      "Creates a public/private key pair for passwordless SSH authentication. Ed25519 is the modern, recommended algorithm — faster and more secure than RSA. The public key (~/.ssh/id_ed25519.pub) goes on the server, the private key stays local.",
    keywords: ["ssh key", "keygen", "ed25519", "public key", "authentication"],
    category: "linux",
  },
  {
    id: "linux-ssh-copy-id",
    syntax: "ssh-copy-id user@hostname",
    label: "Copy SSH key to a remote server",
    description:
      "Installs your public key on the remote server's authorized_keys file, enabling passwordless login. It's the safe, automated alternative to manually editing ~/.ssh/authorized_keys. You'll be prompted for the password one last time.",
    keywords: ["ssh key", "copy", "authorized keys", "passwordless", "setup"],
    category: "linux",
  },
  {
    id: "linux-scp",
    syntax: "scp file.txt user@hostname:/remote/path/",
    label: "Copy files over SSH",
    description:
      "Securely copies files between local and remote systems using the SSH protocol. Works like cp but across machines. For recursive directory copies, add -r. For large transfers or frequent syncs, consider rsync instead.",
    keywords: ["scp", "copy", "remote", "transfer", "upload", "download"],
    category: "linux",
  },
  {
    id: "linux-rsync",
    syntax: "rsync -avz source/ user@hostname:/dest/",
    label: "Sync files efficiently over SSH",
    description:
      "The smart file transfer tool — only sends differences between source and destination, making repeated syncs very fast. Flags: -a (archive/preserve permissions), -v (verbose), -z (compress during transfer). The trailing slash on source/ matters — it syncs contents, not the directory itself.",
    keywords: [
      "rsync",
      "sync",
      "transfer",
      "incremental",
      "backup",
      "efficient",
    ],
    category: "linux",
  },

  // ─── Cron & Scheduling ─────────────────────────────────────────────

  {
    id: "linux-crontab-edit",
    syntax: "crontab -e",
    label: "Edit your cron jobs",
    description:
      "Opens your user's crontab in an editor. Each line defines a scheduled task with the format: minute hour day month weekday command. For example, '0 3 * * * /backup.sh' runs /backup.sh at 3 AM daily. Save and exit to activate.",
    keywords: ["cron", "crontab", "schedule", "timer", "periodic", "automate"],
    category: "linux",
  },
  {
    id: "linux-crontab-list",
    syntax: "crontab -l",
    label: "List current cron jobs",
    description:
      "Displays all cron jobs configured for your user. Add sudo crontab -l to see root's cron jobs. If nothing is listed, either no jobs are configured or they might be in /etc/cron.d/ or /etc/cron.daily/ instead.",
    keywords: ["cron", "list", "scheduled", "jobs", "show", "tasks"],
    category: "linux",
  },

  // ─── Firewall (ufw) ────────────────────────────────────────────────

  {
    id: "linux-ufw-status",
    syntax: "sudo ufw status verbose",
    label: "Check firewall status and rules",
    description:
      "Shows whether the firewall is active and lists all configured rules with details. The 'verbose' flag adds the default policy (allow/deny) for incoming and outgoing traffic. First step when debugging connectivity — is the firewall blocking it?",
    keywords: ["firewall", "ufw", "status", "rules", "security", "ports"],
    category: "linux",
  },
  {
    id: "linux-ufw-allow",
    syntax: "sudo ufw allow <port>",
    label: "Allow traffic on a port",
    description:
      "Opens a port in the firewall for incoming connections. Use port numbers (22, 80, 443) or service names (ssh, http, https). You can also specify protocols: ufw allow 8080/tcp. Remember to enable ufw first if it's inactive.",
    keywords: ["allow", "open port", "firewall", "incoming", "permit"],
    category: "linux",
  },
  {
    id: "linux-ufw-deny",
    syntax: "sudo ufw deny <port>",
    label: "Block traffic on a port",
    description:
      "Explicitly blocks incoming traffic on a specific port. Traffic hitting this port will be silently dropped. Use ufw reject instead if you want to send back a 'connection refused' response to the sender.",
    keywords: ["deny", "block", "firewall", "close port", "drop", "security"],
    category: "linux",
  },

  // ─── Environment & Locale ──────────────────────────────────────────

  {
    id: "linux-timedatectl",
    syntax: "timedatectl",
    label: "Show time and timezone settings",
    description:
      "Displays local time, UTC, timezone, and NTP sync status. Use timedatectl set-timezone <zone> to change the timezone (e.g., Europe/Budapest). Correct time is critical for logs, certificates, and cron jobs.",
    keywords: ["time", "timezone", "date", "ntp", "clock", "locale"],
    category: "linux",
  },
  {
    id: "linux-locale",
    syntax: "locale",
    label: "Show current locale settings",
    description:
      "Prints all active locale environment variables (language, encoding, formatting). When you see garbled characters in the terminal or unexpected number/date formats, locale settings are usually the culprit. Set with update-locale or export LANG=...",
    keywords: ["locale", "language", "encoding", "utf8", "character set"],
    category: "linux",
  },
];

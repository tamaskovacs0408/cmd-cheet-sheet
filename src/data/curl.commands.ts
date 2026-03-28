import type { Command } from "./types";

export const curlCommands: Command[] = [
  // ─── HTTP Methods ───────────────────────────────────────────────────

  {
    id: "curl-get",
    syntax: "curl https://api.example.com/users",
    label: "GET request (default)",
    description:
      "The simplest curl call — a plain GET request. When you don't specify a method, curl defaults to GET. This is the bread and butter of API testing: hit an endpoint and see what comes back.",
    keywords: ["get", "request", "fetch", "read", "default", "api"],
    category: "curl",
  },
  {
    id: "curl-get-verbose",
    syntax: "curl -v https://api.example.com/users",
    label: "GET request with verbose output",
    description:
      "The -v flag shows the full request/response lifecycle: DNS resolution, TLS handshake, request headers sent, response headers received, and the body. Indispensable for debugging connection issues, header problems, or redirect chains.",
    keywords: [
      "verbose",
      "debug",
      "headers",
      "details",
      "troubleshoot",
      "trace",
    ],
    category: "curl",
  },
  {
    id: "curl-get-silent",
    syntax: "curl -s https://api.example.com/users",
    label: "GET request (silent mode)",
    description:
      "Suppresses the progress meter and error messages, giving you only the response body. Essential when piping curl output to jq, grep, or other tools — you don't want progress bars mixed into your JSON.",
    keywords: ["silent", "quiet", "no progress", "pipe", "clean output"],
    category: "curl",
  },
  {
    id: "curl-get-response-code",
    syntax:
      'curl -s -o /dev/null -w "%{http_code}" https://api.example.com/users',
    label: "Get only the HTTP status code",
    description:
      'A classic one-liner for health checks and monitoring scripts. The -o /dev/null discards the body, -s silences progress, and -w "%{http_code}" prints just the status code (200, 404, 500, etc.). Perfect for scripting.',
    keywords: [
      "status code",
      "http code",
      "health check",
      "monitor",
      "response code",
    ],
    category: "curl",
  },
  {
    id: "curl-get-headers-only",
    syntax: "curl -I https://api.example.com/users",
    label: "Fetch response headers only (HEAD)",
    description:
      "Sends a HEAD request and prints only the response headers — no body. Quick way to check Content-Type, caching headers, CORS settings, or whether an endpoint is reachable without downloading the full response.",
    keywords: ["head", "headers only", "metadata", "content type", "inspect"],
    category: "curl",
  },
  {
    id: "curl-get-include-headers",
    syntax: "curl -i https://api.example.com/users",
    label: "Include response headers with body",
    description:
      "Shows both the response headers AND the body in one output. Unlike -I (HEAD only), this performs a real GET and lets you see header-body together — great for checking how Content-Type, Set-Cookie, or caching headers relate to the actual response.",
    keywords: [
      "include headers",
      "response headers",
      "full response",
      "headers and body",
    ],
    category: "curl",
  },
  {
    id: "curl-post-json",
    syntax:
      'curl -X POST https://api.example.com/users \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "John", "email": "john@example.com"}\'',
    label: "POST request with JSON body",
    description:
      "The standard way to create a resource via a REST API. -X POST sets the method, -H sets the Content-Type header so the server knows you're sending JSON, and -d provides the request body. The backslashes split it across lines for readability.",
    keywords: ["post", "create", "json", "body", "send data", "content type"],
    category: "curl",
  },
  {
    id: "curl-post-json-file",
    syntax:
      'curl -X POST https://api.example.com/users \\\n  -H "Content-Type: application/json" \\\n  -d @payload.json',
    label: "POST with JSON body from a file",
    description:
      "When the payload is large or you want to keep it version-controlled, use @filename to read the body from a file instead of inlining it. The @ prefix tells curl to treat the argument as a file path, not literal data.",
    keywords: ["file", "payload", "json file", "read from file", "external"],
    category: "curl",
  },
  {
    id: "curl-post-form",
    syntax:
      'curl -X POST https://api.example.com/login \\\n  -d "username=admin&password=secret"',
    label: "POST with form-urlencoded body",
    description:
      "Sends data as application/x-www-form-urlencoded — the same format browsers use for simple HTML form submissions. curl automatically sets the Content-Type when you use -d without -H. Each key=value pair is joined with &.",
    keywords: [
      "form",
      "urlencoded",
      "form data",
      "login",
      "simple post",
      "html form",
    ],
    category: "curl",
  },
  {
    id: "curl-post-multipart",
    syntax:
      'curl -X POST https://api.example.com/upload \\\n  -F "file=@photo.jpg" \\\n  -F "description=Profile photo"',
    label: "POST multipart form data (file upload)",
    description:
      "The -F flag sends a multipart/form-data request — the standard way to upload files. Use @filename for file fields and plain strings for text fields. You can mix multiple -F flags for different form fields in a single request.",
    keywords: [
      "multipart",
      "upload",
      "file",
      "form data",
      "image",
      "attachment",
    ],
    category: "curl",
  },
  {
    id: "curl-post-raw",
    syntax:
      "curl -X POST https://api.example.com/webhook \\\n  -H \"Content-Type: text/plain\" \\\n  -d 'Raw text body here'",
    label: "POST with raw text body",
    description:
      "Not every API expects JSON. Some webhooks and endpoints accept plain text, XML, or custom formats. Set the Content-Type header to match what you're sending and pass the raw string with -d.",
    keywords: ["raw", "text", "plain", "custom", "webhook", "string body"],
    category: "curl",
  },
  {
    id: "curl-post-xml",
    syntax:
      "curl -X POST https://api.example.com/soap \\\n  -H \"Content-Type: application/xml\" \\\n  -d '<user><name>John</name></user>'",
    label: "POST with XML body",
    description:
      "SOAP APIs and some legacy services expect XML payloads. Set Content-Type to application/xml (or text/xml) and pass the XML string with -d. For large payloads use -d @file.xml to read from a file instead.",
    keywords: ["xml", "soap", "legacy", "markup", "application xml"],
    category: "curl",
  },
  {
    id: "curl-put",
    syntax:
      'curl -X PUT https://api.example.com/users/1 \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "Jane", "email": "jane@example.com"}\'',
    label: "PUT request (full resource update)",
    description:
      "PUT replaces an entire resource at the given URL. Unlike PATCH, you're expected to send the complete representation. If you omit a field, the server may set it to null or a default. Think of it as 'overwrite the whole thing'.",
    keywords: [
      "put",
      "update",
      "replace",
      "full update",
      "overwrite",
      "modify",
    ],
    category: "curl",
  },
  {
    id: "curl-patch",
    syntax:
      'curl -X PATCH https://api.example.com/users/1 \\\n  -H "Content-Type: application/json" \\\n  -d \'{"email": "newemail@example.com"}\'',
    label: "PATCH request (partial update)",
    description:
      "PATCH sends only the fields you want to change — everything else stays the same. More bandwidth-efficient than PUT for small updates and the preferred method for most modern REST APIs when modifying individual properties.",
    keywords: [
      "patch",
      "partial",
      "update",
      "modify",
      "change",
      "single field",
    ],
    category: "curl",
  },
  {
    id: "curl-delete",
    syntax: "curl -X DELETE https://api.example.com/users/1",
    label: "DELETE request",
    description:
      "Removes a resource at the specified URL. Most DELETE endpoints don't require a body, though some APIs accept one for bulk deletion. The server typically returns 200 (with a body) or 204 (no content) on success.",
    keywords: ["delete", "remove", "destroy", "resource", "api"],
    category: "curl",
  },
  {
    id: "curl-delete-with-body",
    syntax:
      'curl -X DELETE https://api.example.com/users \\\n  -H "Content-Type: application/json" \\\n  -d \'{"ids": [1, 2, 3]}\'',
    label: "DELETE request with JSON body",
    description:
      "Some APIs support bulk deletion by accepting a body with the DELETE request. While not universally standard (RFC 7231 doesn't forbid it), many modern APIs use this pattern for batch operations to avoid chaining multiple requests.",
    keywords: [
      "bulk delete",
      "batch",
      "multiple",
      "delete with body",
      "mass delete",
    ],
    category: "curl",
  },
  {
    id: "curl-options",
    syntax: "curl -X OPTIONS https://api.example.com/users",
    label: "OPTIONS request (CORS preflight)",
    description:
      "Browsers send an OPTIONS preflight request before cross-origin requests to check what methods and headers are allowed. Use this to debug CORS issues by seeing exactly what the server responds with — look for Access-Control-Allow-* headers.",
    keywords: [
      "options",
      "cors",
      "preflight",
      "allowed methods",
      "cross origin",
    ],
    category: "curl",
  },

  // ─── Headers ────────────────────────────────────────────────────────

  {
    id: "curl-header-single",
    syntax:
      'curl https://api.example.com/users \\\n  -H "Accept: application/json"',
    label: "Set a custom request header",
    description:
      "The -H flag adds a header to the request. You can set Accept to tell the server what format you want back, or any other custom header the API requires. Each -H adds one header — stack multiple for several headers.",
    keywords: ["header", "custom", "accept", "set header", "request header"],
    category: "curl",
  },
  {
    id: "curl-header-multiple",
    syntax:
      'curl https://api.example.com/users \\\n  -H "Accept: application/json" \\\n  -H "X-Request-ID: abc-123" \\\n  -H "Cache-Control: no-cache"',
    label: "Set multiple request headers",
    description:
      "Chain multiple -H flags to send several headers at once. Common scenarios: set Accept format, add request tracing IDs, disable caching, specify API versions, or include custom metadata the server expects.",
    keywords: [
      "multiple headers",
      "custom headers",
      "request id",
      "cache control",
      "chain",
    ],
    category: "curl",
  },
  {
    id: "curl-header-content-type-json",
    syntax:
      'curl -X POST https://api.example.com/data \\\n  -H "Content-Type: application/json" \\\n  -d \'{"key": "value"}\'',
    label: "Set Content-Type to JSON",
    description:
      "Tells the server the body you're sending is JSON. Without this header, the server may misinterpret your data or reject the request entirely. This is arguably the most commonly set header in API development.",
    keywords: [
      "content type",
      "json",
      "mime type",
      "application json",
      "format",
    ],
    category: "curl",
  },
  {
    id: "curl-header-user-agent",
    syntax:
      'curl https://api.example.com/data \\\n  -H "User-Agent: MyApp/1.0"',
    label: "Set a custom User-Agent",
    description:
      "Some APIs require or rate-limit based on User-Agent. By default curl sends 'curl/version' — override it with -H to identify your application, bypass blocks, or simulate a specific client.",
    keywords: ["user agent", "client", "identify", "browser", "custom agent"],
    category: "curl",
  },
  {
    id: "curl-header-accept-language",
    syntax:
      'curl https://api.example.com/content \\\n  -H "Accept-Language: hu-HU, en-US;q=0.9"',
    label: "Request localized content",
    description:
      "The Accept-Language header tells the server your preferred language for the response. The q parameter sets priority (0–1). APIs with i18n support use this to return localized responses without needing language in the URL path.",
    keywords: ["language", "locale", "i18n", "localization", "accept language"],
    category: "curl",
  },

  // ─── Authentication ─────────────────────────────────────────────────

  {
    id: "curl-auth-bearer",
    syntax:
      'curl https://api.example.com/protected \\\n  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."',
    label: "Bearer token authentication",
    description:
      "The most common authentication pattern for modern APIs. Pass your access token (JWT, OAuth2 token, etc.) in the Authorization header prefixed with 'Bearer'. The server decodes and validates the token to identify and authorize the caller.",
    keywords: [
      "bearer",
      "token",
      "authorization",
      "oauth",
      "access token",
      "jwt",
    ],
    category: "curl",
  },
  {
    id: "curl-auth-jwt",
    syntax:
      'curl https://api.example.com/protected \\\n  -H "Authorization: Bearer <jwt-token>"',
    label: "JWT authentication",
    description:
      "JSON Web Tokens (JWTs) are self-contained tokens with three base64-encoded parts: header.payload.signature. They're sent as Bearer tokens but carry user claims (roles, expiry, etc.) directly in the payload, so the server can validate without a database lookup.",
    keywords: [
      "jwt",
      "json web token",
      "claims",
      "signed token",
      "self-contained",
      "authorization",
    ],
    category: "curl",
  },
  {
    id: "curl-auth-basic",
    syntax: "curl -u username:password https://api.example.com/protected",
    label: "Basic authentication",
    description:
      "The -u flag encodes username:password as Base64 and sends it in the Authorization header. Simple but insecure over HTTP — always use HTTPS. Some APIs and CI systems (like Jenkins, Nexus) still use Basic auth for simplicity.",
    keywords: [
      "basic auth",
      "username",
      "password",
      "credentials",
      "base64",
      "login",
    ],
    category: "curl",
  },
  {
    id: "curl-auth-basic-header",
    syntax:
      'curl https://api.example.com/protected \\\n  -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ="',
    label: "Basic auth via header (manual Base64)",
    description:
      "If you can't use -u (e.g., in some scripting contexts), you can construct the header manually. Base64-encode 'username:password' and prepend 'Basic'. The result is identical to what -u produces, just more explicit.",
    keywords: [
      "basic auth",
      "manual",
      "base64",
      "header",
      "explicit",
      "encoded",
    ],
    category: "curl",
  },
  {
    id: "curl-auth-api-key-header",
    syntax:
      'curl https://api.example.com/data \\\n  -H "x-api-key: your-api-key-here"',
    label: "API key in custom header (x-api-key)",
    description:
      "Many services (AWS API Gateway, SendGrid, etc.) use a custom header like x-api-key for authentication. It's simpler than OAuth — just a static key passed in the header. Keep keys out of source code; use environment variables instead.",
    keywords: [
      "api key",
      "x-api-key",
      "custom header",
      "static key",
      "service key",
    ],
    category: "curl",
  },
  {
    id: "curl-auth-api-key-query",
    syntax: 'curl "https://api.example.com/data?api_key=your-api-key-here"',
    label: "API key in query parameter",
    description:
      "Some APIs accept the key as a URL parameter instead of a header. While convenient, this is less secure — query strings may appear in server logs, browser history, and proxy logs. Prefer header-based API keys when possible.",
    keywords: [
      "api key",
      "query parameter",
      "url parameter",
      "query string",
      "insecure",
    ],
    category: "curl",
  },
  {
    id: "curl-auth-session-cookie",
    syntax:
      'curl https://api.example.com/dashboard \\\n  -H "Cookie: session_id=abc123def456"',
    label: "Session-based authentication (cookie)",
    description:
      "Traditional web applications use server-side sessions. After logging in, the server issues a session ID stored in a cookie. Send it with subsequent requests to maintain your authenticated session — common when testing browser-like flows with curl.",
    keywords: [
      "session",
      "cookie",
      "session id",
      "web app",
      "stateful",
      "login session",
    ],
    category: "curl",
  },
  {
    id: "curl-auth-cookie-jar",
    syntax:
      'curl -c cookies.txt https://api.example.com/login \\\n  -d "user=admin&pass=secret" \\\n&& curl -b cookies.txt https://api.example.com/dashboard',
    label: "Save and reuse cookies (cookie jar)",
    description:
      "Use -c to save cookies received from the server to a file, then -b to send them back on the next request. This simulates a browser session — login once, then carry the session cookie across subsequent API calls.",
    keywords: [
      "cookie jar",
      "save cookies",
      "reuse",
      "session",
      "persistent",
      "flow",
    ],
    category: "curl",
  },
  {
    id: "curl-auth-digest",
    syntax: "curl --digest -u username:password https://api.example.com/data",
    label: "Digest authentication",
    description:
      "A more secure alternative to Basic auth where the password is never sent in clear text. The server challenges with a nonce, and the client responds with a hashed value. Less common today but still used by some enterprise APIs and legacy systems.",
    keywords: [
      "digest",
      "challenge",
      "nonce",
      "hashed",
      "secure auth",
      "enterprise",
    ],
    category: "curl",
  },
  {
    id: "curl-auth-oauth-client-credentials",
    syntax:
      'curl -X POST https://auth.example.com/oauth/token \\\n  -H "Content-Type: application/x-www-form-urlencoded" \\\n  -d "grant_type=client_credentials&client_id=YOUR_ID&client_secret=YOUR_SECRET"',
    label: "OAuth2 Client Credentials flow",
    description:
      "The machine-to-machine OAuth2 flow. Exchange your client ID and secret for an access token — no user interaction needed. Common for backend service-to-service auth. The response includes a Bearer token to use in subsequent API calls.",
    keywords: [
      "oauth2",
      "client credentials",
      "machine to machine",
      "token exchange",
      "service auth",
    ],
    category: "curl",
  },

  // ─── Body & Data Formats ────────────────────────────────────────────

  {
    id: "curl-body-json-inline",
    syntax:
      'curl -X POST https://api.example.com/data \\\n  -H "Content-Type: application/json" \\\n  -d \'{"title": "Hello", "tags": ["a", "b"]}\'',
    label: "Send JSON body (inline)",
    description:
      "Pass the JSON directly on the command line with -d. Wrap the entire JSON in single quotes to avoid shell interpretation of double quotes inside. Works great for small payloads but becomes unwieldy for complex nested structures.",
    keywords: ["json", "inline", "body", "data", "payload", "direct"],
    category: "curl",
  },
  {
    id: "curl-body-json-heredoc",
    syntax:
      'curl -X POST https://api.example.com/data \\\n  -H "Content-Type: application/json" \\\n  -d @- << \'EOF\'\n{\n  "name": "John",\n  "roles": ["admin", "user"],\n  "settings": {\n    "theme": "dark"\n  }\n}\nEOF',
    label: "Send JSON body with heredoc",
    description:
      "For larger, multi-line JSON payloads, a heredoc (<<) keeps things readable right in the terminal. The -d @- reads from stdin, and the heredoc feeds it. Single-quoting 'EOF' prevents variable expansion in the body.",
    keywords: [
      "heredoc",
      "multiline",
      "readable",
      "stdin",
      "large payload",
      "complex json",
    ],
    category: "curl",
  },
  {
    id: "curl-body-form-urlencoded",
    syntax:
      'curl -X POST https://api.example.com/login \\\n  --data-urlencode "username=admin" \\\n  --data-urlencode "password=hello world!"',
    label: "Send URL-encoded data (safe encoding)",
    description:
      "Unlike -d, the --data-urlencode flag properly encodes special characters (spaces, &, =, etc.) in values. Crucial when form data contains user input that might break the key=value format — always prefer this over manual encoding.",
    keywords: [
      "urlencode",
      "encode",
      "special characters",
      "safe",
      "form data",
      "escape",
    ],
    category: "curl",
  },
  {
    id: "curl-body-binary",
    syntax:
      'curl -X POST https://api.example.com/upload \\\n  -H "Content-Type: application/octet-stream" \\\n  --data-binary @image.png',
    label: "Send binary data",
    description:
      "Use --data-binary (not -d) to send binary files without any encoding or newline stripping. The -d flag treats data as text and strips carriage returns — --data-binary preserves the exact bytes. Essential for file uploads over raw HTTP.",
    keywords: [
      "binary",
      "upload",
      "raw bytes",
      "octet stream",
      "file upload",
      "preserve",
    ],
    category: "curl",
  },
  {
    id: "curl-body-graphql",
    syntax:
      'curl -X POST https://api.example.com/graphql \\\n  -H "Content-Type: application/json" \\\n  -d \'{"query": "{ users { id name email } }"}\'',
    label: "Send a GraphQL query",
    description:
      "GraphQL APIs typically accept POST requests with a JSON body containing a 'query' field. You can also add a 'variables' field for parameterized queries. The Content-Type is always application/json, and everything goes to a single endpoint.",
    keywords: [
      "graphql",
      "query",
      "api",
      "single endpoint",
      "variables",
      "schema",
    ],
    category: "curl",
  },
  {
    id: "curl-body-graphql-variables",
    syntax:
      'curl -X POST https://api.example.com/graphql \\\n  -H "Content-Type: application/json" \\\n  -d \'{"query": "query GetUser($id: ID!) { user(id: $id) { name email } }", "variables": {"id": "1"}}\'',
    label: "GraphQL query with variables",
    description:
      "Parameterized GraphQL queries separate the operation from its input values. Define variables with $ in the query and pass them in the 'variables' object. This prevents injection issues and enables query caching on the server side.",
    keywords: [
      "graphql",
      "variables",
      "parameterized",
      "query variables",
      "dynamic",
    ],
    category: "curl",
  },

  // ─── Response Handling ──────────────────────────────────────────────

  {
    id: "curl-output-file",
    syntax: "curl -o response.json https://api.example.com/data",
    label: "Save response to a file",
    description:
      "The -o flag writes the response body to a file instead of stdout. Useful for downloading API responses, large datasets, or files. Use -O (uppercase) to save with the remote filename instead of specifying one.",
    keywords: ["output", "save", "file", "download", "write to file"],
    category: "curl",
  },
  {
    id: "curl-pipe-jq",
    syntax: "curl -s https://api.example.com/users | jq '.'",
    label: "Pretty-print JSON with jq",
    description:
      "Pipe curl's output to jq for formatted, syntax-highlighted JSON. Use jq '.' for basic pretty-printing, or add filters like '.data[0].name' to extract specific values. The -s flag is crucial to keep progress bars out of the piped output.",
    keywords: [
      "jq",
      "pretty print",
      "format",
      "json",
      "filter",
      "parse",
      "pipe",
    ],
    category: "curl",
  },
  {
    id: "curl-follow-redirects",
    syntax: "curl -L https://example.com/short-url",
    label: "Follow redirects automatically",
    description:
      "By default, curl stops at redirects (3xx responses) and shows the redirect response. Adding -L makes curl follow the Location header through the redirect chain until it reaches the final destination. Essential for shortened URLs and OAuth flows.",
    keywords: [
      "redirect",
      "follow",
      "location",
      "3xx",
      "short url",
      "auto redirect",
    ],
    category: "curl",
  },
  {
    id: "curl-timeout",
    syntax:
      "curl --connect-timeout 5 --max-time 30 https://api.example.com/data",
    label: "Set connection and total timeouts",
    description:
      "Prevent curl from hanging indefinitely. --connect-timeout limits how long to wait for the connection to establish, and --max-time caps the entire operation. Critical in scripts and CI/CD pipelines where you can't afford to wait forever.",
    keywords: [
      "timeout",
      "connect timeout",
      "max time",
      "limit",
      "abort",
      "deadline",
    ],
    category: "curl",
  },
  {
    id: "curl-retry",
    syntax: "curl --retry 3 --retry-delay 2 https://api.example.com/data",
    label: "Retry failed requests",
    description:
      "Makes curl automatically retry on transient failures (timeouts, 5xx errors). The --retry flag sets the max number of retries, and --retry-delay adds a pause between attempts. A simple resilience pattern for flaky APIs without writing retry logic.",
    keywords: [
      "retry",
      "resilience",
      "transient",
      "failure",
      "automatic",
      "delay",
    ],
    category: "curl",
  },

  // ─── SSL / TLS ──────────────────────────────────────────────────────

  {
    id: "curl-insecure",
    syntax: "curl -k https://self-signed.example.com/api",
    label: "Skip SSL certificate verification",
    description:
      "The -k (--insecure) flag disables certificate verification. Use ONLY for local development with self-signed certificates or testing — never in production scripts. Without it, curl rightfully refuses connections to servers with invalid certs.",
    keywords: [
      "insecure",
      "skip ssl",
      "self signed",
      "certificate",
      "tls",
      "dev only",
    ],
    category: "curl",
  },
  {
    id: "curl-client-cert",
    syntax:
      "curl --cert client.pem --key client-key.pem https://mtls.example.com/api",
    label: "Mutual TLS (client certificate)",
    description:
      "Some high-security APIs require mutual TLS — the server verifies the client's certificate too. Use --cert to specify your client certificate and --key for the private key. Common in financial services, healthcare, and government APIs.",
    keywords: [
      "mtls",
      "client certificate",
      "mutual tls",
      "pem",
      "two-way ssl",
      "secure",
    ],
    category: "curl",
  },

  // ─── Proxy & Network ───────────────────────────────────────────────

  {
    id: "curl-proxy",
    syntax:
      "curl -x http://proxy.example.com:8080 https://api.example.com/data",
    label: "Send request through a proxy",
    description:
      "Routes your request through an HTTP proxy. Useful for corporate networks, debugging with tools like Charles/Fiddler, or when you need the request to originate from a specific IP. Also supports SOCKS proxies with socks5://.",
    keywords: ["proxy", "corporate", "fiddler", "charles", "route", "network"],
    category: "curl",
  },

  // ─── Advanced Patterns ──────────────────────────────────────────────

  {
    id: "curl-write-out",
    syntax:
      'curl -s -o /dev/null -w "HTTP %{http_code} | Time: %{time_total}s | Size: %{size_download} bytes\\n" https://api.example.com/data',
    label: "Custom response metrics output",
    description:
      "The -w flag supports many variables beyond http_code: time_total, time_connect, time_starttransfer, size_download, speed_download, and more. Build custom performance reports and monitoring dashboards by formatting exactly the metrics you need.",
    keywords: [
      "write out",
      "metrics",
      "performance",
      "time",
      "size",
      "benchmark",
      "speed",
    ],
    category: "curl",
  },
  {
    id: "curl-compressed",
    syntax: "curl --compressed https://api.example.com/large-data",
    label: "Request compressed response",
    description:
      "Adds Accept-Encoding: gzip, deflate, br and automatically decompresses the response. Significantly reduces bandwidth for large JSON responses — many APIs support it but only send compressed data when the client explicitly asks.",
    keywords: [
      "gzip",
      "compressed",
      "encoding",
      "bandwidth",
      "deflate",
      "brotli",
    ],
    category: "curl",
  },
  {
    id: "curl-rate-limit-check",
    syntax: "curl -s -D - https://api.example.com/data | grep -i 'x-ratelimit'",
    label: "Check rate limit headers",
    description:
      "Most APIs include rate limit info in response headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset). The -D - dumps headers to stdout so you can grep for them. Essential before building integrations to understand your quota.",
    keywords: [
      "rate limit",
      "throttle",
      "quota",
      "limit",
      "remaining",
      "headers",
    ],
    category: "curl",
  },
  {
    id: "curl-conditional-etag",
    syntax:
      "curl https://api.example.com/data \\\n  -H 'If-None-Match: \"abc123\"'",
    label: "Conditional request with ETag",
    description:
      "Send an ETag value from a previous response to check if the resource has changed. The server returns 304 Not Modified if it hasn't — saving bandwidth and processing. A key caching mechanism for efficient API polling.",
    keywords: [
      "etag",
      "conditional",
      "cache",
      "304",
      "not modified",
      "if-none-match",
    ],
    category: "curl",
  },
  {
    id: "curl-pagination",
    syntax:
      'curl -s "https://api.example.com/users?page=2&per_page=25" \\\n  -H "Accept: application/json"',
    label: "Fetch a specific page (pagination)",
    description:
      "Most list endpoints support pagination via query parameters. Common patterns: page/per_page, offset/limit, or cursor-based (after=<id>). Check the response for metadata like total_count, next_page, or Link headers to navigate through results.",
    keywords: ["pagination", "page", "per page", "offset", "limit", "cursor"],
    category: "curl",
  },
  {
    id: "curl-env-variable",
    syntax:
      'curl https://api.example.com/data \\\n  -H "Authorization: Bearer $API_TOKEN"',
    label: "Use environment variable for secrets",
    description:
      "Never hardcode tokens or API keys in scripts. Store them in environment variables and reference them with $VAR. This keeps secrets out of command history, source code, and logs. Set with export API_TOKEN=... before running your curl commands.",
    keywords: [
      "environment variable",
      "secret",
      "secure",
      "token",
      "no hardcode",
      "best practice",
    ],
    category: "curl",
  },
  {
    id: "curl-config-file",
    syntax: "curl -K my-api.config https://api.example.com/data",
    label: "Read options from a config file",
    description:
      'When you have many flags, put them in a config file and use -K to load it. Each line is one option (e.g., header = "Authorization: Bearer token123"). Keeps long commands manageable and lets you reuse configurations across scripts.',
    keywords: [
      "config file",
      "reusable",
      "options file",
      "organized",
      "template",
    ],
    category: "curl",
  },
  {
    id: "curl-parallel",
    syntax:
      "curl --parallel --parallel-max 5 \\\n  -o out1.json https://api.example.com/data/1 \\\n  -o out2.json https://api.example.com/data/2 \\\n  -o out3.json https://api.example.com/data/3",
    label: "Parallel requests",
    description:
      "curl 7.66+ supports --parallel to send multiple requests concurrently. Set --parallel-max to control concurrency. Much faster than sequential calls when fetching multiple independent endpoints — great for batch operations and data gathering.",
    keywords: [
      "parallel",
      "concurrent",
      "multiple",
      "batch",
      "simultaneous",
      "fast",
    ],
    category: "curl",
  },
  {
    id: "curl-download-resume",
    syntax: "curl -C - -O https://example.com/large-file.zip",
    label: "Resume an interrupted download",
    description:
      "The -C - flag tells curl to automatically resume a download from where it left off — it checks the existing file size and requests only the remaining bytes. Lifesaver for large file downloads on unstable connections.",
    keywords: [
      "resume",
      "continue",
      "interrupted",
      "download",
      "partial",
      "large file",
    ],
    category: "curl",
  },
];

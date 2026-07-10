/**
 * Isomorphic logger for this project.
 *
 * Runs unmodified in three places this codebase actually executes:
 *   1. Browser (client components) — tagged, readable console output.
 *   2. Node in dev (`next dev`, and the `tsx` scripts under scripts/ and
 *      src/scripts/) — colored, human-readable lines.
 *   3. Node in production (Firebase App Hosting / Cloud Run) — single-line
 *      JSON with a `severity` field, which Cloud Logging parses natively
 *      for log level filtering, metrics, and alerting.
 *
 * No dependencies, no Node-only APIs (fs, process.stdout, etc.), so it is
 * safe to import from Next.js middleware/edge routes as well.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

type LogMeta = Record<string, unknown>;

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

// Cloud Logging's expected severity strings: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
const CLOUD_SEVERITY: Record<LogLevel, string> = {
  debug: "DEBUG",
  info: "INFO",
  warn: "WARNING",
  error: "ERROR",
};

const ANSI: Record<LogLevel, string> = {
  debug: "\x1b[90m", // gray
  info: "\x1b[36m", // cyan
  warn: "\x1b[33m", // yellow
  error: "\x1b[31m", // red
};
const ANSI_RESET = "\x1b[0m";
const ANSI_DIM = "\x1b[2m";

const isBrowser = typeof window !== "undefined";
const isProduction =
  typeof process !== "undefined" && process.env?.NODE_ENV === "production";

function currentLevel(): LogLevel {
  const fromEnv =
    typeof process !== "undefined"
      ? isBrowser
        ? process.env?.NEXT_PUBLIC_LOG_LEVEL
        : process.env?.LOG_LEVEL
      : undefined;

  if (fromEnv && fromEnv in LEVEL_WEIGHT) return fromEnv as LogLevel;
  return isProduction ? "info" : "debug";
}

function serializeError(value: unknown): unknown {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      // Stack traces are noisy and occasionally leak file paths; keep them
      // out of production log payloads, but they're invaluable locally.
      ...(isProduction ? {} : { stack: value.stack }),
      ...(value.cause ? { cause: serializeError(value.cause) } : {}),
    };
  }
  return value;
}

function serializeMeta(meta: LogMeta | undefined): LogMeta | undefined {
  if (!meta) return undefined;
  const out: LogMeta = {};
  for (const [key, val] of Object.entries(meta)) {
    out[key] = serializeError(val);
  }
  return out;
}

function emit(
  namespace: string,
  level: LogLevel,
  message: string,
  meta: LogMeta | undefined,
) {
  if (LEVEL_WEIGHT[level] < LEVEL_WEIGHT[currentLevel()]) return;

  const consoleFn =
    level === "error" ? console.error : level === "warn" ? console.warn : console.log;

  if (!isBrowser && isProduction) {
    // Structured JSON for Cloud Run / Cloud Logging. One line per entry.
    consoleFn(
      JSON.stringify({
        severity: CLOUD_SEVERITY[level],
        message,
        namespace,
        time: new Date().toISOString(),
        ...serializeMeta(meta),
      }),
    );
    return;
  }

  if (isBrowser) {
    consoleFn(
      `%c${namespace}%c ${message}`,
      "color:#888;font-weight:600",
      "color:inherit",
      ...(meta ? [serializeMeta(meta)] : []),
    );
    return;
  }

  // Local Node dev (next dev, or a tsx script) — colored one-liner.
  const color = ANSI[level];
  const timestamp = new Date().toISOString().split("T")[1]?.replace("Z", "");
  consoleFn(
    `${ANSI_DIM}${timestamp}${ANSI_RESET} ${color}${level.toUpperCase().padEnd(5)}${ANSI_RESET} ${ANSI_DIM}[${namespace}]${ANSI_RESET} ${message}`,
    ...(meta ? [serializeMeta(meta)] : []),
  );
}

export interface Logger {
  debug(message: string, meta?: LogMeta): void;
  info(message: string, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  error(message: string, meta?: LogMeta): void;
  /** Returns a child logger that merges `meta` into every call. */
  child(meta: LogMeta): Logger;
}

/**
 * Creates a namespaced logger, e.g. one per script or module:
 *
 *   const log = createLogger("fetch-casino");
 *   log.info("Scraping via ScrapingAnt", { url });
 *   log.error("Scrape failed", { error: err });
 *
 * Levels are filtered via LOG_LEVEL (server/scripts) or NEXT_PUBLIC_LOG_LEVEL
 * (browser) — defaults to "debug" outside production and "info" in it.
 */
export function createLogger(namespace: string, baseMeta?: LogMeta): Logger {
  const withBase = (meta?: LogMeta): LogMeta | undefined =>
    baseMeta || meta ? { ...baseMeta, ...meta } : undefined;

  return {
    debug: (message, meta) => emit(namespace, "debug", message, withBase(meta)),
    info: (message, meta) => emit(namespace, "info", message, withBase(meta)),
    warn: (message, meta) => emit(namespace, "warn", message, withBase(meta)),
    error: (message, meta) => emit(namespace, "error", message, withBase(meta)),
    child: (meta) => createLogger(namespace, { ...baseMeta, ...meta }),
  };
}

/** Default logger for quick, one-off use where a dedicated namespace isn't worth it. */
export const logger = createLogger("app");

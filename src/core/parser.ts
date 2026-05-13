// Low-level line tokenization helpers for .nexus files.
// No CLI, no FS, no framework dependencies.

// Replace quoted string content with empty quotes so token scanners
// ignore characters that appear inside string literals.
export function stripStringContent(line: string): string {
  return line.replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''")
}

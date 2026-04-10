/**
 * Formats an ISO string into a human-readable time string.
 * @param dateStr - The date string to format
 * @returns A string like "2026-04-10T14:30:00"
 */
export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
export default function generateReceiptNo() {
  const now = new Date();

  // Format: YYYYMMDD-HHMMSS-RND
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); // e.g., 20250830
  const timePart = now
    .toTimeString()
    .slice(0, 8)
    .replace(/:/g, ""); // e.g., 224532

  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random

  return `RCPT-${datePart}-${timePart}-${randomPart}`;
}

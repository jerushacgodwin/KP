 import DOMPurify from 'dompurify';
 const dayMap: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  function getThisWeekDate(dayName: string, hour: number, minute: number) {
 const now = new Date();
  const currentDay = now.getDay();
  const targetDay = dayMap[dayName];
  const diff = targetDay - currentDay;

  const targetDate = new Date(now);
  targetDate.setDate(now.getDate() + diff);
  targetDate.setHours(hour, minute, 0, 0);
  return targetDate;
}
export function convertToCalendarEvent(timetableArray: any[]) {
 return timetableArray.map(entry => {
    const [startStr, endStr] = entry.time.split("–"); // or "-"
    const [startHour, startMinute] = startStr.split(":").map(Number);
    const [endHour, endMinute] = endStr.split(":").map(Number);

    return {
      title: `${entry.subject} - ${entry.teacher}`,
      start: getThisWeekDate(entry.day, startHour, startMinute),
      end: getThisWeekDate(entry.day, endHour, endMinute),
      className: entry.class, // optional for filtering
      id: entry.id
    };
  });
}
export function formatDate(date: Date | string) {
  const newdate = new Date(date);

const formatted = newdate.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',  // December
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});
    return formatted;
}
export const sanitizeInput = (input: string): string => {
  if (!input) return "";

  const cleanHtml = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  // Only allow letters, numbers, space, @ and dot (customize as needed)
  return cleanHtml.replace(/[^a-zA-Z0-9\s@.]/g, '');
};
export const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
  const sanitized: Record<string, any> = {};

  for (const key in data) {
    const value = data[key];

    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    }else if ((value as any) instanceof File || (value as any) instanceof FileList) {
      sanitized[key] = value;
    }
 
    else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
};
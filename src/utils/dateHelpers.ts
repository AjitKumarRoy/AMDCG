// src/utils/dateHelpers.ts (Create this new file or add to an existing utils file)

export const parseEventDate = (dateString: string): Date => {
  // Common date formats are "Mon Day, Year" or "YYYY-MM-DD"
  // If your date strings are "Oct 31, 2025", this format should work.
  // Be careful with parsing if your date format varies a lot.
  return new Date(dateString);
};

export const isEventNew = (eventDate: Date): boolean => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return eventDate.getTime() > sevenDaysAgo.getTime();
};

// Function to format date into "Mon Day" and "Year"
export const getFormattedDateParts = (dateString: string) => {
  const date = parseEventDate(dateString);
  const monthDay = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
  const year = date.getFullYear();
  return { monthDay, year };
};
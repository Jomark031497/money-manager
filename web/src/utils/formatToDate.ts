import { format } from "date-fns";

export const formateToDate = (date: Date) => {
  return format(date, "MMM dd, yyyy");
};

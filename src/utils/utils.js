import { format } from "date-fns";

export const formatDate = (dateToFormat) => {
  return format(new Date(dateToFormat), "dd.MM.yyyy");
};

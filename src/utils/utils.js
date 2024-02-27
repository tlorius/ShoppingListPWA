import { format, parse } from "date-fns";

export const formatDate = (dateToFormat) => {
  return format(new Date(dateToFormat), "dd.MM.yyyy");
};

export const parseDateFormat = (dateToParse) => {
  return parse(dateToParse, "dd.MM.yyyy", new Date());
};

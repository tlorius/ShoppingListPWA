import { format, parse, compareAsc } from "date-fns";

export const formatDate = (dateToFormat) => {
  return format(new Date(dateToFormat), "dd.MM.yyyy");
};

export const parseDateFormat = (dateToParse) => {
  return parse(dateToParse, "dd.MM.yyyy", new Date());
};

//input date should be in dd.MM.yyyy format
//return 1 => in the future / 0 => today / -1 => in the past
export const compareDateToToday = (dateToCompare) => {
  return compareAsc(
    parseDateFormat(dateToCompare),
    parseDateFormat(formatDate(Date.now()))
  );
};

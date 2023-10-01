import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";

export const DateUtil = {
  toString(text) {
    const date = new Date(text);
    return format(date, "dd MMMM yyyy 'lúc' HH:mm:ss", {
      locale: viLocale,
    });
  },
  toDate(text) {
    return new Date(text).toISOString().slice(0, 16);
  },
};

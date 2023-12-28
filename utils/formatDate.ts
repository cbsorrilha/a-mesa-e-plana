import {default as format} from "https://deno.land/x/date_fns@v2.8.0/format/index.js";

export default function formatDate(date: string | Date = new Date(), formatString = 'yyyy-MM-dd') {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return format(date, formatString, {});
}
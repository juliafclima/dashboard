import { format, isWithinInterval } from "date-fns";

export const formatDate = (epochMs: number | string, pattern = "dd/MM/yyyy") =>
   format(new Date(epochMs), pattern);

export const isWithinRange = (epochMs: number, from?: string, to?: string) => {
   if (!from && !to) return true;
   const d = new Date(epochMs);
   const start = from ? new Date(from) : new Date(0);
   const end = to ? new Date(to + "T23:59:59") : new Date(8640000000000000);
   return isWithinInterval(d, { start, end });
};

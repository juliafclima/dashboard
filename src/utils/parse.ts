export const parseAmount = (raw: string): number => {
   if (!raw) return 0;
   const num = Number(raw);
   return isNaN(num) ? 0 : num / 100;
};

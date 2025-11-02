/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
   CartesianGrid,
} from "recharts";
import { useMemo } from "react";
import { Paper, Typography, Box, useTheme, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import type { Transaction } from "../../types/transaction";
import { formatDate } from "../../utils/dates";
import { parseAmount } from "../../utils/parse";
import { formatCurrency } from "../../utils/currency";

export default function StackedBars({ data }: { data: Transaction[] }) {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const series = useMemo(() => {
      const m = new Map<string, { deposit: number; withdraw: number }>();
      for (const t of data) {
         const key = formatDate(t.date, "yyyy-MM");
         const obj = m.get(key) ?? { deposit: 0, withdraw: 0 };
         const v = parseAmount(t.amount);
         if (t.transaction_type === "deposit") obj.deposit += v;
         else obj.withdraw += v;
         m.set(key, obj);
      }
      return [...m.entries()]
         .map(([month, { deposit, withdraw }]) => ({
            month: formatDate(month + "-01", isMobile ? "MM/yy" : "MM/yyyy"),
            Incomes: deposit,
            Expenses: withdraw,
         }))
         .sort((a, b) => {
            const [mA, yA] = a.month.split("/");
            const [mB, yB] = b.month.split("/");
            return (`${yA}-${mA}`).localeCompare(`${yB}-${mB}`);
         });
   }, [data, isMobile]); 

   const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload?.length) {
         return (
            <Paper
               elevation={3}
               sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.paper,
               }}
            >
               <Typography variant="body2" fontWeight={500} mb={1}>
                  {label}
               </Typography>

               {payload.map((entry: any, i: number) => (
                  <Typography key={i} variant="body2" sx={{ color: entry.fill }}>
                     <strong>{entry.name}:</strong> {formatCurrency(entry.value)}
                  </Typography>
               ))}
            </Paper>
         );
      }
      return null;
   };

   return (
      <Paper
         elevation={3}
         sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
         }}
      >
         <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems={isMobile ? "flex-start" : "center"}
            mb={3}
         >
            <Typography variant="h6" fontWeight={700} mb={isMobile ? 1 : 0}>
               Incomes vs Expenses
            </Typography>
            <Stack direction="row" spacing={3}>
               <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                     width={12}
                     height={12}
                     borderRadius={1}
                     bgcolor={"#008e63a9"}
                  />
                  <Typography variant="body2" color="text.secondary">
                     Incomes
                  </Typography>
               </Stack>
               <Stack direction="row" spacing={1} alignItems="center">
                  <Box width={12} height={12} borderRadius={1} bgcolor={"#dc143cc0"} />
                  <Typography variant="body2" color="text.secondary">
                     Expenses
                  </Typography>
               </Stack>
            </Stack>
         </Box>

         <Box height={isMobile ? 250 : 320} sx={{ overscrollBehavior: 'contain' }}>
            <ResponsiveContainer width="100%" height="100%">
               <BarChart
                  data={series}
                  margin={{ top: 8, right: 8, bottom: 0, left: isMobile ? -16 : 0 }}
                  barCategoryGap={isMobile ? "10%" : "20%"}
               >
                  <CartesianGrid
                     strokeDasharray="3 3"
                     stroke={theme.palette.text.primary}
                     opacity={0.1}
                  />
                  <XAxis
                     dataKey="month"
                     tick={{ fontSize: isMobile ? 10 : 12, fill: theme.palette.text.secondary }}
                     stroke={theme.palette.text.primary}
                     minTickGap={isMobile ? 10 : 5}
                  />
                  <YAxis
                     tick={{ fontSize: isMobile ? 10 : 12, fill: theme.palette.text.secondary }}
                     stroke={theme.palette.text.primary}
                     tickFormatter={(v) => `R$ ${(v / 1000).toFixed(isMobile ? 0 : 1)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Incomes" fill={"#008e63a9"} radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Expenses" fill={"#dc143cc0"} radius={[8, 8, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
         </Box>
      </Paper>
   );
}
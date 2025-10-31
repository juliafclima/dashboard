import { ArrowDownwardOutlined, ArrowUpwardOutlined, Wallet } from "@mui/icons-material";
import { Box, Paper, Typography, useTheme } from "@mui/material";

import { formatCurrency } from "../../utils/currency";
import type { SummaryItem } from "../../types/summaryCards";

export default function SummaryCards({
   balance,
   deposits,
   withdraws,
   currency = "BRL",
}: {
   balance: number;
   deposits: number;
   withdraws: number;
   currency?: string;
}) {
   const theme = useTheme();

   const items: SummaryItem[] = [
      {
         label: "Incomes",
         value: deposits,
         icon: ArrowUpwardOutlined,
         color: theme.palette.success.main,
         bgColor: theme.palette.success.light,
      },
      {
         label: "Expenses",
         value: withdraws,
         icon: ArrowDownwardOutlined,
         color: theme.palette.error.main,
         bgColor: theme.palette.error.light,
      },
      {
         label: "Total Balance",
         value: balance,
         icon: Wallet,
         color: theme.palette.primary.main,
         bgColor: theme.palette.primary.light,
      },
   ];

   return (
      <Box
         display="flex"
         justifyContent="space-around"
         flexDirection="column"
         mx="auto"
         width={"90%"}
         gap={2}
         mb={4}
      >
         {items.map(({ label, value, icon: Icon, color, bgColor }) => (
            <Paper
               key={label}
               elevation={3}
               sx={{
                  flex: "1 1 0",
                  minWidth: 350,
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: bgColor,
                  color: 'white',
               }}
            >
               <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body1" fontWeight={600}>
                     {label}
                  </Typography>
                  <Icon size={28} color={color} />
               </Box>
               <Typography variant="h5" fontWeight={700}>
                  {formatCurrency(value, currency)}
               </Typography>
            </Paper>
         ))}
      </Box>
   );
}

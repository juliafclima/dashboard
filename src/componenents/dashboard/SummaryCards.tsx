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
         color: '#000000',
         bgColor: '#008e63a9',
      },
      {
         label: "Expenses",
         value: withdraws,
         icon: ArrowDownwardOutlined,
         color: theme.palette.error.main,
         bgColor: '#dc143cc0'
      },
      {
         label: "Total Balance",
         value: balance,
         icon: Wallet,
         color: theme.palette.primary.main,
         bgColor: '#933e95ba'
      },
   ];

   return (
      <Box
         display="flex"
         justifyContent="space-around"
         flexDirection="column"
         mx="auto"
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

import { TrendingDownOutlined, AttachMoneyOutlined, BalanceOutlined, AccessTimeOutlined } from "@mui/icons-material";
import { Box, Paper, Typography, useTheme } from "@mui/material";

import { formatCurrency } from "../../utils/currency";
import type { SummaryItem } from "../../types/summaryCards";

export default function SummaryCards({
   balance,
   deposits,
   withdraws,
   pending,
   currency = "BRL",
}: {
   balance: number;
   deposits: number;
   withdraws: number;
   pending: number;
   currency?: string;
}) {
   const theme = useTheme();

   const items: SummaryItem[] = [
      {
         label: "Incomes",
         value: deposits,
         icon: AttachMoneyOutlined,
         color: theme.palette.primary.contrastText,
         bgColor: '#008e63a9',
      },
      {
         label: "Expenses",
         value: withdraws,
         icon: TrendingDownOutlined,
         color: theme.palette.primary.contrastText,
         bgColor: '#dc143cc0'
      },
      {
         label: "Total Balance",
         value: balance,
         icon: BalanceOutlined,
         color: theme.palette.primary.contrastText,
         bgColor: '#933e95ba'
      },
      {
         label: "Pending Transactions",
         value: pending,
         icon: AccessTimeOutlined,
         color: theme.palette.primary.contrastText,
         bgColor: '#f5a623a0'
      },
   ];

   return (
      <Box
         display="flex"
         flexWrap="wrap"
         justifyContent="center"
         gap={2}
      >
         {
            items.map(({ label, value, icon: Icon, color, bgColor }) => (
               <Paper
                  key={label}
                  elevation={3}
                  sx={{
                     "&:hover": { 'box-shadow': 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset' },
                     cursor: 'pointer',
                     flex: "1 1 calc(50% - 16px)",
                     height: 180,
                     minWidth: 300,
                     maxWidth: 400,
                     p: 3,
                     borderRadius: 3,
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between",
                     background: bgColor,
                     color: "white",
                  }}
               >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                     <Typography variant="body1" fontWeight={600}>
                        {label}
                     </Typography>
                     <Icon fontSize="large" sx={{ color }} />
                  </Box>
                  <Typography variant="h5" fontWeight={700}>
                     {formatCurrency(value, currency)}
                  </Typography>
               </Paper>
            ))
         }
      </Box >
   );

}

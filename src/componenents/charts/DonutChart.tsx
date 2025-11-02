import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Paper, Typography, Box, useTheme, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { formatCurrency } from "../../utils/currency";

interface DonutChartProps {
  deposits: number;
  withdraws: number;
  pending: number;
  balance: number;
}

export default function DonutChart({ deposits, withdraws, pending, balance }: DonutChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartData = [
    { name: "Incomes", value: deposits },
    { name: "Expenses", value: withdraws },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#008e63a9", "#dc143cc0", "#f5a623a0"];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      const item = payload[0];

      return (
        <Paper
          elevation={3}
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="body2" fontWeight={700} color={item.name === 'Incomes' ? "#008e63a9" : item.name === 'Pending' ? '#f5a623a0' : "#dc143cc0"} >
            {item.name}: {formatCurrency(item.value)}
          </Typography>
        </Paper >
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
          Incomes, Expenses & Balance
        </Typography>

        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Stack direction="row" spacing={1} alignItems="center">
            <Box width={12} height={12} borderRadius={1} bgcolor={COLORS[0]} />
            <Typography variant="body2" color="text.secondary">
              Incomes
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box width={12} height={12} borderRadius={1} bgcolor={COLORS[1]} />
            <Typography variant="body2" color="text.secondary">
              Expenses
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box width={12} height={12} borderRadius={1} bgcolor={COLORS[2]} />
            <Typography variant="body2" color="text.secondary">
              Pending
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Box position="relative" height={isMobile ? 260 : 320}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={isMobile ? 60 : 80}
              outerRadius={isMobile ? 90 : 120}
              paddingAngle={3}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography
            variant={isMobile ? "body1" : "h6"}
            fontWeight={700}
            color={balance >= 0 ? "success.main" : "error.main"}
          >
            {formatCurrency(balance)}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Total Balance
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

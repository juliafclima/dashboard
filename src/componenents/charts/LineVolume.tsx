import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";
import { Paper, Typography, useTheme, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import type { Transaction } from "../../types/transaction";
import { formatDate } from "../../utils/dates";
import { parseAmount } from "../../utils/parse";
import { formatCurrency } from "../../utils/currency";

export default function LineVolume({ data }: { data: Transaction[] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const series = useMemo(() => {
    const m = new Map<string, number>();
    let acc = 0;
    const sorted = [...data].sort((a, b) => a.date - b.date);
    for (const t of sorted) {
      const key = formatDate(t.date, "yyyy-MM-dd");
      const value = parseAmount(t.amount) * (t.transaction_type === "deposit" ? 1 : -1);
      acc += value;
      m.set(key, acc);
    }
    return [...m.entries()]
      .map(([d, value]) => ({
        date: formatDate(new Date(d).getTime(), "dd/MM"), 
        value,
        fullDate: d,
      }))
      .sort((a, b) => a.fullDate.localeCompare(b.fullDate));
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
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
          <Typography variant="caption" color="text.secondary" gutterBottom>
            {formatDate(payload[0].payload.fullDate)} 
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color={value >= 0 ? "#008e63a9" : "#dc143cc0"}
          >
            {formatCurrency(value)}
          </Typography>
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
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h6" fontWeight={700}>
          Balance
        </Typography>
      </Box>

      <Box 
        height={isMobile ? 250 : 320}
        sx={{ overscrollBehavior: 'contain' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={series}
            margin={{ top: 10, right: isMobile ? 8 : 10, left: isMobile ? -16 : 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={theme.palette.secondary.main}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.text.primary}
              opacity={0.1}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: theme.palette.text.primary, opacity: 0.6, fontSize: isMobile ? 10 : 12 }} 
              stroke={theme.palette.text.primary}
              opacity={0.3}
              angle={isMobile ? 0 : 20} 
              minTickGap={isMobile ? 15 : 5} 
            />
            <YAxis
              tick={{ fill: theme.palette.text.primary, opacity: 0.6, fontSize: isMobile ? 10 : 12 }} 
              stroke={theme.palette.text.primary}
              opacity={0.3}
              tickFormatter={(v) => `R$ ${(v / 1000).toFixed(isMobile ? 0 : 1)}k`} 
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: theme.palette.primary.main, strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={"#933e95ba"}
              strokeWidth={2}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
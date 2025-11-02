/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
   Box,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TablePagination,
   Typography,
   TableSortLabel,
} from "@mui/material";

import type { Transaction } from "../../types/transaction";
import { parseAmount } from "../../utils/parse";
import { formatDate } from "../../utils/dates";
import { formatCurrency } from "../../utils/currency";

type Order = "asc" | "desc";

export default function TransactionsTable({ data }: { data: Transaction[] }) {
   const [q] = useState("");
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(50);

   const [order, setOrder] = useState<Order>("asc");
   const [orderBy, setOrderBy] = useState<keyof Transaction | "amount" | "date">("date");

   const handleRequestSort = (property: keyof Transaction | "amount" | "date") => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
   };

   const filtered = useMemo(() => {
      const term = q.trim().toLowerCase();
      if (!term) return data;
      return data.filter(
         (t) =>
            t.account.toLowerCase().includes(term) ||
            t.industry.toLowerCase().includes(term) ||
            t.state.toLowerCase().includes(term),
      );
   }, [q, data]);

   function sortData(a: Transaction, b: Transaction) {
      let valA: any;
      let valB: any;

      switch (orderBy) {
         case "date":
            valA = new Date(a.date).getTime();
            valB = new Date(b.date).getTime();
            break;
         case "amount":
            valA = parseAmount(a.amount);
            valB = parseAmount(b.amount);
            break;
         default:
            valA = a[orderBy];
            valB = b[orderBy];
      }

      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
   }

   const sorted = useMemo(() => {
      return [...filtered].sort(sortData);
   }, [filtered, order, orderBy]);

   const paginated = useMemo(() => {
      const start = page * rowsPerPage;
      return sorted.slice(start, start + rowsPerPage);
   }, [sorted, page, rowsPerPage]);

   const handleChangePage = (_event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   return (
      <Paper elevation={3} sx={{ borderRadius: 3, p: 3, mx: "auto" }}>
         <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Transaction History
         </Typography>

         <TableContainer>
            <Table size="small">
               <TableHead>
                  <TableRow>
                     {[
                        { id: "date", label: "Date" },
                        { id: "account", label: "Account" },
                        { id: "industry", label: "Industry" },
                        { id: "state", label: "State" },
                        { id: "transaction_type", label: "Type" },
                        { id: "amount", label: "Value" },
                     ].map((col) => (
                        <TableCell
                           key={col.id}
                           sortDirection={orderBy === col.id ? order : false}
                           align={col.id === "amount" ? "right" : "left"}
                        >
                           <TableSortLabel
                              active={orderBy === col.id}
                              direction={orderBy === col.id ? order : "asc"}
                              onClick={() => handleRequestSort(col.id as any)}
                           >
                              {col.label}
                           </TableSortLabel>
                        </TableCell>
                     ))}
                  </TableRow>
               </TableHead>

               <TableBody>
                  {paginated.map((t, idx) => (
                     <TableRow
                        key={idx}
                        hover
                        sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                     >
                        <TableCell>{formatDate(t.date)}</TableCell>
                        <TableCell>{t.account}</TableCell>
                        <TableCell>{t.industry}</TableCell>
                        <TableCell>{t.state}</TableCell>
                        <TableCell>
                           <Box
                              component="span"
                              px={1.5}
                              py={0.5}
                              borderRadius={1}
                              fontSize="0.75rem"
                              fontWeight={400}
                              color="white"
                              bgcolor={
                                 t.transaction_type === "deposit"
                                    ? "#008e63a9"
                                    : "#dc143cc0"
                              }
                           >
                              {t.transaction_type === "deposit" ? "Incomes" : "Expense"}
                           </Box>
                        </TableCell>
                        <TableCell
                           align="right"
                           sx={{
                              color:
                                 t.transaction_type === "deposit"
                                    ? "#008e63a9"
                                    : "#dc143cc0",
                           }}
                        >
                           {formatCurrency(parseAmount(t.amount))}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>

            {filtered.length === 0 && (
               <Box textAlign="center" py={4} color="text.secondary">
                  No transactions found
               </Box>
            )}
         </TableContainer>

         <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
         />
      </Paper>
   );
}

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
   Typography,
   TablePagination,
} from "@mui/material";

import type { Transaction } from "../../types/transaction";
import { parseAmount } from "../../utils/parse";
import { formatDate } from "../../utils/dates";
import { formatCurrency } from "../../utils/currency";

export default function TransactionsTable({ data }: { data: Transaction[] }) {
   /* const [q, setQ] = useState(""); */
   const [q, ] = useState("");
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);

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

   const totals = useMemo(() => {
      const dep = filtered
         .filter((t) => t.transaction_type === "deposit")
         .reduce((s, t) => s + parseAmount(t.amount), 0);
      const wit = filtered
         .filter((t) => t.transaction_type === "withdraw")
         .reduce((s, t) => s + parseAmount(t.amount), 0);
      return { dep, wit, total: dep + wit };
   }, [filtered]);

   const handleChangePage = (
      _event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
   ) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const paginated = useMemo(() => {
      const start = page * rowsPerPage;
      return filtered.slice(start, start + rowsPerPage);
   }, [filtered, page, rowsPerPage]);

   return (
      <>
         <Paper
            elevation={3}
            sx={{
               borderRadius: 3,
               p: 3,
               width: "80%",
               mx: "auto",
            }}
         >
            <TableContainer>
               <Table size="small">
                  <TableHead>
                     <TableRow>
                        {["Date", "Account", "Industry", "State", "Type", "Value"].map((h) => (
                           <TableCell key={h} align={h === "Value" ? "right" : "left"}>
                              {h}
                           </TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {paginated.map((t, idx) => (
                        <TableRow
                           key={idx}
                           hover
                           sx={{
                              "&:hover": { backgroundColor: "action.hover" },
                           }}
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
                                 color={"white"}
                                 bgcolor={
                                    t.transaction_type === "deposit"
                                       ? "success.light"
                                       : "error.light"
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
                                       ? "success.main"
                                       : "error.main",
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

            <Box
               display="flex"
               flexDirection={{ xs: "column", sm: "row" }}
               justifyContent="space-between"
               alignItems={{ xs: "stretch", sm: "center" }}
               gap={2}
               my={2}
            >
               <Typography variant="body2" color="text.secondary">
                  <Box component="span" color="success.main">
                     {formatCurrency(totals.dep)} incomes
                  </Box>
                  {" • "}
                  <Box component="span" color="error.main">
                     {formatCurrency(totals.wit)} expenses
                  </Box>
               </Typography>
            </Box>

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
      </>
   );
}

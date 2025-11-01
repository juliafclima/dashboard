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
} from "@mui/material";

import type { Transaction } from "../../types/transaction";
import { parseAmount } from "../../utils/parse";
import { formatDate } from "../../utils/dates";
import { formatCurrency } from "../../utils/currency";

export default function TransactionsTable({ data }: { data: Transaction[] }) {
   const [q,] = useState("");
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(50);

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
               mx: "auto",
            }}
         >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
               Transaction History
            </Typography>
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
      </>
   );
}

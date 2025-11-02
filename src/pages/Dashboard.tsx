import {
   Box,
   Stack,
} from "@mui/material";

import LineVolume from "../componenents/charts/LineVolume";
import StackedBars from "../componenents/charts/StackedBars";
import FiltersBar from "../componenents/dashboard/FiltersBar";
import SummaryCards from "../componenents/dashboard/SummaryCards";
import TransactionsTable from "../componenents/dashboard/TransactionsTable";
import Loading from "../componenents/Loading";
import Sidebar from "../componenents/Sidebar";
import { useTransactions } from "../hooks/useTransactions";
import Footer from "../componenents/Footer";
import DonutChart from "../componenents/charts/DonutChart";

export default function Dashboard() {
   const { loading, filtered, totals } = useTransactions();

   return (
      <Box sx={{ backgroundColor: '#d8d8e4' }}>
         <Sidebar />

         {loading && (<Box
            sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '70vh',
               width: '100%',
            }}
         >
            <Loading />
         </Box>)}

         {!loading && (
            <Box sx={{ display: 'flex', minHeight: '100vh', padding: 1, marginBottom: 3 }}>
               <Box
                  component="main"
                  sx={{
                     flexGrow: 1,
                     p: 1,
                     width: { xs: '100%', sm: `calc(100% - 60px)` },
                  }}
               >
                  <Stack spacing={3}>
                     <Box
                        sx={{
                           display: 'flex',
                           flexWrap: 'wrap',
                           gap: 3,
                           my: 2,
                           alignItems: 'center',
                        }}
                     >
                        <Box
                           sx={{
                              width: { xs: '100%', md: 'calc(50% - 12px)' },
                              flexGrow: 1,
                           }}
                        >
                           <FiltersBar />
                        </Box>

                        <Box
                           sx={{
                              width: { xs: '100%', md: 'calc(50% - 12px)' },
                              flexGrow: 1
                           }}
                        >
                           <SummaryCards
                              balance={totals.balance}
                              deposits={totals.deposits}
                              withdraws={totals.withdraws}
                              pending={totals.pending}
                           />
                        </Box>
                     </Box>

                     <Box
                        sx={{
                           display: 'flex',
                           flexWrap: 'wrap',
                           gap: 3,
                           my: 2,
                        }}
                     >
                        <Box
                           sx={{
                              width: { xs: '100%', md: 'calc(50% - 12px)' },
                              flexGrow: 1,
                           }}
                        >
                           <StackedBars data={filtered} />
                        </Box>

                        <Box
                           sx={{
                              width: { xs: '100%', md: 'calc(50% - 12px)' },
                              flexGrow: 1,
                           }}
                        >
                           <LineVolume data={filtered} />
                        </Box>
                     </Box>
                     <DonutChart
                        deposits={totals.deposits}
                        withdraws={totals.withdraws}
                        pending={totals.pending}
                        balance={totals.balance}
                     />
                     <TransactionsTable data={filtered} />
                  </Stack>
               </Box>
            </Box>
         )}

         <Footer />
      </Box>
   );
}
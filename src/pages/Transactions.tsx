import Sidebar from "../componenents/Sidebar";
import { useTransactions } from "../hooks/useTransactions";

export default function Transactions() {
   /* const { filtered, loading } = useTransactions(); */
   const { loading } = useTransactions();

   return (
      <div>
         <Sidebar />

         {loading && (
            <div className="flex flex-col items-center justify-center py-16">
               <div className="h-10 w-10 rounded-full border-4 border-input border-t-[oklch(var(--primary))] animate-spin" />
               <p className="mt-3 text-sm text-muted-foreground">Loading data…</p>
            </div>
         )}

         {/* {!loading && <TransactionsTable data={filtered} />} */}
      </div>
   );
}

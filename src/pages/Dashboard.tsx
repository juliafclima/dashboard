import Sidebar from "../componenents/Sidebar";
import { useTransactions } from "../hooks/useTransactions";

export default function Dashboard() {
   /* const { loading, error, filtered, totals } = useTransactions(); */
   const { loading, error } = useTransactions();

   return (
      <>
         <Sidebar />

         {loading && (
            <div className="flex flex-col items-center justify-center py-16">
               <div className="h-10 w-10 rounded-full border-4 border-input border-t-[oklch(var(--primary))] animate-spin" />
               <p className="mt-3 text-sm text-muted-foreground">Loading data…</p>
            </div>
         )}

         {!loading && !error && (
            <>
               <section className="grid gap-6 lg:grid-cols-2 w-4/5 mx-auto">
                  {/* <FiltersBar /> */}
                  {/* <SummaryCards
                     balance={totals.balance}
                     deposits={totals.deposits}
                     withdraws={totals.withdraws}
                  /> */}
               </section>

               <section className="grid gap-6 lg:grid-cols-2 w-4/5 mx-auto">
                  {/* <StackedBars data={filtered} />
                  <LineVolume data={filtered} /> */}
               </section>
            </>
         )}
      </>
   );
}

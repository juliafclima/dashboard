import { useEffect, useMemo, useState } from "react";

import type { Transaction } from "../types/transaction";
/* import { isWithinRange } from "../utils/dates"; */

export function useTransactions() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await new Promise((r) => setTimeout(r, 400));
        const res = await fetch("/data/transactions.json");
        if (!res.ok) throw new Error("Failed to load transactions.json");
        const json = (await res.json()) as Transaction[];
        setData(json);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e?.message ?? "Error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* const filters = useFilters(); */

  /* const filtered = useMemo(() => {
    return data.filter((t) => {
      const okDate = isWithinRange(t.date, filters.dateFrom, filters.dateTo);
      const okAccount = filters.accounts.length
        ? filters.accounts.includes(t.account)
        : true;
      const okIndustry = filters.industries.length
        ? filters.industries.includes(t.industry)
        : true;
      const okState = filters.states.length
        ? filters.states.includes(t.state)
        : true;
      return okDate && okAccount && okIndustry && okState;
    });
  }, [
    data,
    filters.dateFrom,
    filters.dateTo,
    filters.accounts,
    filters.industries,
    filters.states,
  ]); */

  /* const totals = useMemo(() => {
    let deposits = 0,
      withdraws = 0,
      pending = 0;
    for (const t of filtered) {
      const val = parseAmount(t.amount);
      if (t.transaction_type === "deposit") deposits += val;
      else withdraws += val;
      if (val < 10) pending += val;
    }
    return { deposits, withdraws, pending, balance: deposits - withdraws };
  }, [filtered]); */

  const vocab = useMemo(() => {
    const acc = new Set<string>(),
      ind = new Set<string>(),
      st = new Set<string>();
    data.forEach((t) => {
      acc.add(t.account);
      ind.add(t.industry);
      st.add(t.state);
    });
    return {
      accounts: [...acc].sort(),
      industries: [...ind].sort(),
      states: [...st].sort(),
    };
  }, [data]);

  /* return { loading, error, data, filtered, totals, vocab }; */
  return { loading, error, data, vocab };
}

export interface Transaction {
   date: number;
   amount: string;
   transaction_type: "deposit" | "withdraw";
   currency: string;
   account: string;
   industry: string;
   state: string;
}

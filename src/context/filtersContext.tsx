// src/context/filtersContext.tsx
import React, { createContext, useContext, useReducer } from "react";

import type { FiltersState } from "../types/filtersState";

const initial: FiltersState = {
   dateFrom: undefined,
   dateTo: undefined,
   accounts: [],
   industries: [],
   states: [],
};

type Action =
   | { type: "SET_DATE_FROM"; payload?: string }
   | { type: "SET_DATE_TO"; payload?: string }
   | { type: "SET_ACCOUNTS"; payload: string[] }
   | { type: "SET_INDUSTRIES"; payload: string[] }
   | { type: "SET_STATES"; payload: string[] }
   | { type: "RESET" };

function filtersReducer(state: FiltersState, action: Action): FiltersState {
   switch (action.type) {
      case "SET_DATE_FROM":
         return { ...state, dateFrom: action.payload };
      case "SET_DATE_TO":
         return { ...state, dateTo: action.payload };
      case "SET_ACCOUNTS":
         return { ...state, accounts: action.payload };
      case "SET_INDUSTRIES":
         return { ...state, industries: action.payload };
      case "SET_STATES":
         return { ...state, states: action.payload };
      case "RESET":
         return initial;
      default:
         return state;
   }
}

const FiltersContext = createContext<{
   state: FiltersState;
   dispatch: React.Dispatch<Action>;
}>({ state: initial, dispatch: () => null });

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [state, dispatch] = useReducer(filtersReducer, initial);
   return (
      <FiltersContext.Provider value={{ state, dispatch }}>
         {children}
      </FiltersContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilters = () => {
   const { state, dispatch } = useContext(FiltersContext);

   const setDateFrom = (v?: string) => dispatch({ type: "SET_DATE_FROM", payload: v });
   const setDateTo = (v?: string) => dispatch({ type: "SET_DATE_TO", payload: v });
   const setAccounts = (v: string[]) => dispatch({ type: "SET_ACCOUNTS", payload: v });
   const setIndustries = (v: string[]) => dispatch({ type: "SET_INDUSTRIES", payload: v });
   const setStates = (v: string[]) => dispatch({ type: "SET_STATES", payload: v });
   const reset = () => dispatch({ type: "RESET" });

   return {
      ...state,
      setDateFrom,
      setDateTo,
      setAccounts,
      setIndustries,
      setStates,
      reset,
   };
};

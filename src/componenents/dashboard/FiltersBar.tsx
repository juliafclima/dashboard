import { useState } from "react";
import {
   Grid,
   FormControl,
   InputLabel,
   Paper,
   TextField,
   Select,
   MenuItem,
   Checkbox,
   ListItemText,
   OutlinedInput,
   Button,
   Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useTransactions } from "../../hooks/useTransactions";
import { useFilters } from "../../context/filtersContext";

export default function FiltersBar() {
   const [error, setError] = useState<string | null>(null);

   const { vocab } = useTransactions();
   const {
      dateFrom,
      dateTo,
      accounts,
      industries,
      states,
      setDateFrom,
      setDateTo,
      setAccounts,
      setIndustries,
      setStates,
      reset,
   } = useFilters();

   const theme = useTheme();

   const handleClear = () => {
      setError(null);
      reset();
   }

   const menuProps = {
      PaperProps: {
         style: {
            maxHeight: 250,
         },
      },
   };

   return (
      <Paper
         elevation={2}
         sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            mx: "auto",
         }}
      >
         <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <div style={{ display: "flex", gap: "16px", width: "100%" }}>
               <TextField
                  label="Start date"
                  type="date"
                  value={dateFrom ?? ""}
                  onChange={(e) => {
                     const newDateFrom = e.target.value || undefined;
                     setDateFrom(newDateFrom);

                     setError(null);
                     if (dateTo && newDateFrom && new Date(dateTo) < new Date(newDateFrom)) {
                        setDateTo(undefined);
                     }
                  }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
               />

               <TextField
                  label="Final Date"
                  type="date"
                  value={dateTo ?? ""}
                  onChange={(e) => {
                     const newDateTo = e.target.value || undefined;

                     if (newDateTo && dateFrom && new Date(newDateTo) < new Date(dateFrom)) {
                        setError("The end date cannot be earlier than the start date!");
                        return;
                     }

                     setError(null);
                     setDateTo(newDateTo);
                  }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
               />
            </div>

            {error && (
               <Alert
                  severity="error"
                  sx={{ width: "100%" }}
                  onClose={() => setError(null)}
               >
                  {error}
               </Alert>
            )}

            <FormControl fullWidth>
               <InputLabel>Accounts</InputLabel>
               <Select
                  multiple
                  value={accounts}
                  onChange={(event) => {
                     const { value } = event.target;
                     if (value[value.length - 1] === "all") {
                        if (accounts.length === vocab.accounts.length) {
                           setAccounts([]);
                        } else {
                           setAccounts(vocab.accounts);
                        }
                     } else {
                        setAccounts(typeof value === "string" ? value.split(",") : value);
                     }
                  }}
                  input={<OutlinedInput label="Accounts" />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  MenuProps={menuProps}
               >
                  <MenuItem value="all">
                     <Checkbox
                        checked={accounts.length === vocab.accounts.length}
                        indeterminate={
                           accounts.length > 0 && accounts.length < vocab.accounts.length
                        }
                     />
                     <ListItemText primary="Select All" />
                  </MenuItem>

                  {vocab.accounts.map((acc) => (
                     <MenuItem key={acc} value={acc}>
                        <Checkbox checked={accounts.indexOf(acc) > -1} />
                        <ListItemText primary={acc} />
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>


            <FormControl fullWidth>
               <InputLabel>Industries</InputLabel>
               <Select
                  multiple
                  value={industries}
                  onChange={(event) => {
                     const { value } = event.target;
                     if (value[value.length - 1] === "all") {
                        if (industries.length === vocab.industries.length) {
                           setIndustries([]);
                        } else {
                           setIndustries(vocab.industries);
                        }
                     } else {
                        setIndustries(typeof value === "string" ? value.split(",") : value);
                     }
                  }}
                  input={<OutlinedInput label="Industries" />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  MenuProps={menuProps}
               >
                  <MenuItem value="all">
                     <Checkbox
                        checked={industries.length === vocab.industries.length}
                        indeterminate={
                           industries.length > 0 && industries.length < vocab.industries.length
                        }
                     />
                     <ListItemText primary="Select All" />
                  </MenuItem>
                  {vocab.industries.map((ind) => (
                     <MenuItem key={ind} value={ind}>
                        <Checkbox checked={industries.indexOf(ind) > -1} />
                        <ListItemText primary={ind} />
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <FormControl fullWidth>
               <InputLabel>States</InputLabel>
               <Select
                  multiple
                  value={states}
                  onChange={(event) => {
                     const { value } = event.target;
                     if (value[value.length - 1] === "all") {
                        if (states.length === vocab.states.length) {
                           setStates([]);
                        } else {
                           setStates(vocab.states);
                        }
                     } else {
                        setStates(typeof value === "string" ? value.split(",") : value);
                     }
                  }}
                  input={<OutlinedInput label="States" />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  MenuProps={menuProps}
               >
                  <MenuItem value="all">
                     <Checkbox
                        checked={states.length === vocab.states.length}
                        indeterminate={
                           states.length > 0 && states.length < vocab.states.length
                        }
                     />
                     <ListItemText primary="Select All" />
                  </MenuItem>
                  {vocab.states.map((st) => (
                     <MenuItem key={st} value={st}>
                        <Checkbox checked={states.indexOf(st) > -1} />
                        <ListItemText primary={st} />
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <Button variant="contained" sx={{ backgroundColor: "#933e95ba", fontWeight: 700, "&:hover": { backgroundColor: "#933e95" } }} onClick={handleClear} fullWidth>
               Clear
            </Button>
         </Grid>
      </Paper>
   );
}

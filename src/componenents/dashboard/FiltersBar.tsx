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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useTransactions } from "../../hooks/useTransactions";
import { useFilters } from "../../context/filtersContext";

export default function FiltersBar() {
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

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const handleMultiChange = (setter: (val: string[]) => void) => (event: any) => {
      const { value } = event.target;
      setter(typeof value === "string" ? value.split(",") : value);
   };

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
            mb: 3,
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
                  onChange={(e) => setDateFrom(e.target.value || undefined)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
               />

               <TextField
                  label="Final Date"
                  type="date"
                  value={dateTo ?? ""}
                  onChange={(e) => setDateTo(e.target.value || undefined)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
               />
            </div>

            <FormControl fullWidth>
               <InputLabel>Accounts</InputLabel>
               <Select
                  multiple
                  value={accounts}
                  onChange={handleMultiChange(setAccounts)}
                  input={<OutlinedInput label="Accounts" />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  MenuProps={menuProps}
               >
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
                  onChange={handleMultiChange(setIndustries)}
                  input={<OutlinedInput label="Industries" />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  MenuProps={menuProps}
               >
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
                  onChange={handleMultiChange(setStates)}
                  input={<OutlinedInput label="States" />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  MenuProps={menuProps}
               >
                  {vocab.states.map((st) => (
                     <MenuItem key={st} value={st}>
                        <Checkbox checked={states.indexOf(st) > -1} />
                        <ListItemText primary={st} />
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <Button variant="outlined" color="primary" onClick={reset} fullWidth>
               Clear
            </Button>
         </Grid>
      </Paper>
   );
}

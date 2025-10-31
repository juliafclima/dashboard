import { useNavigate } from "react-router";
import { Toolbar, Button, Paper, Box, Typography } from "@mui/material";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { getGreeting } from "./utils/Greeting";

export default function Sidebar() {
   /* const logout = useAuth((s) => s.logout); */
   const navigate = useNavigate();

   const handleNavigateTransactions = () => navigate("/transactions");

   const handleNavigateHome = () => navigate("/");

   return (
      <Paper
         elevation={2}
         sx={{
            borderRadius: 2,
            border: "2px solid #11182730",
            m: 2,
            backgroundColor: "background.paper",
         }}
      >
         <Toolbar
            sx={{
               display: "flex",
               flexDirection: { xs: "column", sm: "row" },
               justifyContent: "space-between",
               alignItems: "center",
               py: 2,
               gap: { xs: 2, sm: 0 },
            }}
         >
            <Typography
               variant="subtitle1"
               sx={{
                  color: "text.primary",
                  fontWeight: 500,
               }}
            >
               Olá, <strong>usuário</strong>. {getGreeting()}
            </Typography>

            <Box
               sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  mt: { xs: 1, sm: 0 },
               }}
            >
               <Button
                  color="inherit"
                  sx={{
                     color: "text.primary",
                     fontWeight: 600,
                     "&:hover": { color: "primary.light" },
                  }}
                  onClick={handleNavigateHome}
               >
                  <CottageOutlinedIcon />
               </Button>

               <Button
                  color="inherit"
                  sx={{
                     color: "text.primary",
                     fontWeight: 600,
                     "&:hover": { color: "secondary.main" },
                  }}
                  onClick={handleNavigateTransactions}
               >
                  Transactions Details
               </Button>

               <Button
                  color="inherit"
                  sx={{
                     color: "text.primary",
                     fontWeight: 600,
                     "&:hover": { color: "secondary.main" },
                  }}
               /* onClick={logout} */
               >
                  <LogoutOutlinedIcon />
               </Button>
            </Box>
         </Toolbar>
      </Paper>
   );
}

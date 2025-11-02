import { useNavigate } from "react-router";
import { useState, type FormEvent } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import bgImage from '../assets/background-image.jpg';
import { useAuth } from "../context/authContext";

export default function LoginPage() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState<string | null>(null);

   const { login } = useAuth();
   const navigate = useNavigate();

   async function onSubmit(e: FormEvent) {
      e.preventDefault();
      try {
         setError(null);
         await login(username, password);
         await new Promise((r) => setTimeout(r, 400));
         navigate("/");
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         setError(err?.message ?? "Login failed. Please check your credentials.");
      }
   }

   return (
      <Box
         sx={{
            display: "flex",
            height: "100vh",
            backgroundColor: "background.default",
         }}
      >
         <Box
            sx={{
               flex: 1,
               backgroundImage: `url(${bgImage})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
               display: { xs: "none", md: "block" },
            }}
         />

         <Box
            sx={{
               flex: 1,
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               p: 4,
               backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
            }}
         >
            <Paper
               elevation={5}
               sx={{
                  width: "100%",
                  maxWidth: 420,
                  p: 5,
                  borderRadius: 3,
               }}
            >
               <Box display="flex" justifyContent="center" mb={3}>
                  <img
                     src="/favicon.svg"
                     alt="Logo"
                     style={{ width: 120, height: 'auto' }}
                  />
               </Box>


               <form onSubmit={onSubmit}>
                  <TextField
                     label="Username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     fullWidth
                  />

                  <TextField
                     label="Password"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     fullWidth
                  />

                  {error && (
                     <Typography variant="body2" color="error" align="right" sx={{ mt: 1 }}>
                        {error}
                     </Typography>
                  )}

                  <Button
                     variant="contained"
                     type="submit"
                     fullWidth
                     sx={{ mt: 3, backgroundColor: "#008e63a9", '&:hover': { backgroundColor: '#007a54' } }}
                  >
                     Enter
                  </Button>
               </form>
            </Paper>
         </Box>
      </Box>
   );
}

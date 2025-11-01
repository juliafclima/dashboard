import { Box, Typography, IconButton, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { LanguageRounded } from '@mui/icons-material';

const Footer = () => {
   return (
      <Box
         component="footer"
         sx={{
            backgroundColor: '#008e63a9',
            color: '#fff',
            py: 3,
            mt: 'auto',
         }}
      >
         <Container
            maxWidth="lg"
            sx={{
               display: 'flex',
               flexDirection: { xs: 'column', sm: 'row' },
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Typography variant="body1">
               Developed by Júlia Lima
            </Typography>
            <Box>
               <IconButton
                  component="a"
                  href="https://github.com/juliafclima"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#fff', "&:hover": { color: '#933e95' } }}
               >
                  <GitHubIcon />
               </IconButton>
               <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/juliafclima"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#fff', "&:hover": { color: '#933e95' } }}
               >
                  <LinkedInIcon />
               </IconButton>
               <IconButton
                  component="a"
                  href="https://www.juliafclima.software/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#fff', "&:hover": { color: '#933e95' } }}
               >
                  <LanguageRounded />
               </IconButton>
            </Box>
         </Container>
      </Box>
   );
};

export default Footer;

import { Box, Typography, Button, Container } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Footer from '../componenents/Footer';

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          my: 4
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: 4,
          }}
        >
          <Typography
            variant="h1"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 800, color: 'error.main', fontSize: '6rem' }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            📈 Error in the Balance Sheet!
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            It appears you accessed a **URL with a zero balance**. <br /> This page is not registered in our assets.<br /> Our accountants are investigating this financial inconsistency!
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{ mt: 3 }}
          >
            Back
          </Button>

          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ mt: 5 }}
          >
            Error Code: E404_ASSET_NOT_FOUND
          </Typography>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
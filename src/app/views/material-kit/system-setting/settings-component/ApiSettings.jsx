import React from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';

const Settings = () => {
  const handleSaveSumsub = () => {
    console.log("Sumsub Settings Saved");
  };

  const handleSaveWoocommerce = () => {
    console.log("Woocommerce Settings Saved");
  };

  return (
    <Box p={3}>
      {/* Sumsub Setting */}
      <Box mb={5}>
        <Typography variant="h6" gutterBottom>Sumsub Setting</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Sumsub Secret Key (system.api.sumsub_secret_key)"
              variant="outlined"
              fullWidth
              defaultValue="QiAs2wtGAWD1NWsAt2RmJ0dtaQT4pzra"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Sumsub Token (system.api.sumsub_token)"
              variant="outlined"
              fullWidth
              defaultValue="prd:epTBzbmorHQmL1jR0aiBRDfE.saeqml8XMkoxMGgkrHO2umg91kpdEpIK"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Sumsub Webhook Private Key (system.api.sumsub_webhook_private_key)"
              variant="outlined"
              fullWidth
              defaultValue="dk55mFJQwKBVnHRdqs2hcsY5wl2"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSaveSumsub}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Woocommerce Setting */}
      <Box>
        <Typography variant="h6" gutterBottom>Woocommerce Setting</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Woocommerce Consumer Key (system.api.woocommerce_consumer_key)"
              variant="outlined"
              fullWidth
              defaultValue="ck_8ee43a88e5569e2cba3b376c58957f3a6c849459"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Woocommerce Consumer Secret (system.api.woocommerce_consumer_secret)"
              variant="outlined"
              fullWidth
              defaultValue="cs_a371eaa3f1f880bc29993d31fe5ca823bc127712"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Woocommerce Url (system.api.woocommerce_url)"
              variant="outlined"
              fullWidth
              defaultValue="https://nowtradefunded.com"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSaveWoocommerce}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Settings;

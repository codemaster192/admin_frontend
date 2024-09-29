import React from 'react';
import { Grid, TextField, Button, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

const UiInterfaceSettings = () => {
  const serviceSettings = [
    { label: 'Mena Method (system.instance.legacy.mena_method)', type: 'checkbox', value: false },
    { label: 'Instance Name (system.instance.name)', type: 'text', value: 'Now Trade' },
    { label: 'Default Prop Language (system.instance.default_prop_language)', type: 'text', value: 'English (EN)' },
    { label: 'Default Customer Name (system.ptsvc.default_customer_name)', type: 'text', value: 'valued customer' },
    { label: 'DX Account Prefix (system.ptsvc.dx_account_prefix)', type: 'text', value: 'DEV' },
    { label: 'Backend Req Loop Delay (system.ptsvc.backend_req_loop_delay)', type: 'text', value: '500' },
    { label: 'Backend Req Max Running Tasks (system.ptsvc.backend_req_max_running_tasks)', type: 'text', value: '50' },
    // Add other fields as per the screenshot
  ];

  const handleSave = (label) => {
    console.log(`${label} saved`);
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>Agreement Setting</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <TextField
            label="Agreement Url (system.instance.agreement_url)"
            variant="outlined"
            fullWidth
            defaultValue="https://nowtrade-storage.s3.ap-northeast-1.amazonaws.com/Independent_Contractor_Agreement_"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Agreement Version (system.instance.agreement_version)"
            variant="outlined"
            fullWidth
            defaultValue="1.0"
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" fullWidth onClick={() => handleSave('Agreement')}>
            Save
          </Button>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Service Setting</Typography>
        {serviceSettings.map((setting, index) => (
          <Grid container spacing={2} key={index} alignItems="center" style={{ marginBottom: 16 }}>
            <Grid item xs={6}>
              {setting.type === 'checkbox' ? (
                <FormControlLabel
                  control={<Checkbox checked={setting.value} />}
                  label={setting.label}
                />
              ) : (
                <TextField
                  label={setting.label}
                  variant="outlined"
                  fullWidth
                  defaultValue={setting.value}
                />
              )}
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" fullWidth onClick={() => handleSave(setting.label)}>
                Save
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default UiInterfaceSettings;

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const EmailSettings = () => {
  const [smtpSettings, setSmtpSettings] = useState({
    fromEmail: '',
    smtpPassword: '',
    smtpServer: '',
    smtpPort: '',
    smtpStartTls: '',
    smtpSupportEmail: '',
    smtpTls: '',
    smtpUsername: '',
    apiKey: '',
  });

  useEffect(() => {
    const fetchSmtpSettings = async () => {
      try {
        const response = await axios.get('/smtp-config');
        if (response.data) {
          setSmtpSettings({
            fromEmail: response.data.fromEmail || '',
            smtpPassword: response.data.smtpPassword || '',
            smtpServer: response.data.smtpServer || '',
            smtpPort: response.data.smtpPort || '',
            startTls: response.data.startTls || '',
            supportEmail: response.data.supportEmail || '',
            tls: response.data.tls || '',
            smtpUsername: response.data.smtpUsername || '',
            apiKey: response.data.apiKey || '',
          });
        } else {
          console.warn('No SMTP settings found');
        }
      } catch (error) {
        console.error('Error fetching SMTP settings:', error);
        alert('Error fetching SMTP settings');
      }
    };

    fetchSmtpSettings();
  }, []);

  const handleChange = (e) => {
    setSmtpSettings({ ...smtpSettings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put('/smtp-config', smtpSettings);
      alert('SMTP settings updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating SMTP settings');
    }
  };

  return (
    <Box>
      <TextField
        label="SMTP From Email"
        name="fromEmail"
        value={smtpSettings.fromEmail}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="SMTP Password"
        name="smtpPassword"
        type="password"
        value={smtpSettings.smtpPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="SMTP Server"
        name="smtpServer"
        value={smtpSettings.smtpServer}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="SMTP Port"
        name="smtpPort"
        value={smtpSettings.smtpPort}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="SMTP Username"
        name="smtpUsername"
        value={smtpSettings.smtpUsername}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="API Key"
        name="apiKey"
        value={smtpSettings.apiKey}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </Box>
  );
};

export default EmailSettings;

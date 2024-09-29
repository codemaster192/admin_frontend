import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const PtServices = () => {
  const [agreementUrl, setAgreementUrl] = useState('https://nowtrade-storage.s3.ap-northeast-1.amazonaws.com/Independent_Contractor_Agreement_');
  const [agreementVersion, setAgreementVersion] = useState('1.0');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Track if the save was successful

  const handleSave = async () => {
    try {
      const response = await axios.post('/agreement', {
        agreementURL: agreementUrl,
        version: agreementVersion
      });
      setMessage(response.data.message);
      setIsSuccess(true); // Set to true for successful save
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Failed to save agreement');
      }
      setIsSuccess(false); // Set to false for failed save
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}>
      <TextField
        label="Agreement URL"
        variant="outlined"
        value={agreementUrl}
        onChange={(e) => setAgreementUrl(e.target.value)}
        fullWidth
      />
      <TextField
        label="Agreement Version"
        variant="outlined"
        value={agreementVersion}
        onChange={(e) => setAgreementVersion(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ width: '100px' }}
      >
        Save
      </Button>

      {/* Display message with conditional styling */}
      {message && (
        <p style={{ 
          color: isSuccess ? 'green' : 'red',  // Green for success, Red for error
          fontSize: '18px',                    // Increased font size
          fontWeight: 'bold',                  // Bold font for better emphasis
        }}>
          {message}
        </p>
      )}
    </Box>
  );
};

export default PtServices;

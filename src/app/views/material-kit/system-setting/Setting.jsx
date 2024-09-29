import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import EmailSettings from './settings-component/EmailSettings'; // Import the email settings component
import TemplateSettings from './settings-component/Template'; // Import the template settings component
import ApiSettings from './settings-component/ApiSettings';
import PtServices from './settings-component/PtServices';
import UiInterfaceSettings from './settings-component/UiInterfaceSettings';

const Setting = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="system setting tabs"
      >
        <Tab label="API" />
        <Tab label="EMAIL SETTING" />
        <Tab label="TEMPLATES" />
        <Tab label="PT SERVICE" />
        <Tab label="USER INTERFACE" />
        <Tab label="ALL" />
      </Tabs>
      
      <Box sx={{ padding: 2 }}>
        {activeTab === 0 && <ApiSettings />}
        {activeTab === 1 && <EmailSettings />} {/* Render Email Settings */}
        {activeTab === 2 && <TemplateSettings />} {/* Render Template Settings */}
        {activeTab === 3 && <PtServices />}
        {activeTab === 4 && <UiInterfaceSettings/>}
        {activeTab === 5 && <Typography>All Settings Component</Typography>}
      </Box>
    </Box>
  );
};

export default Setting;

import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, Box, Grid, Typography, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const EmailTemplate = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    emailTo: '',
    subject: '',
    body: '',
    trigger: '',
  });

  // Function to fetch templates from the API
  const fetchTemplates = async () => {
    try {
      const res = await axios.get('/templates');
      setTemplates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTemplates(); // Call fetchTemplates when the component mounts
  }, []);

  const handleTemplateChange = (e) => {
    const templateName = e.target.value;
    setSelectedTemplate(templateName);
    const template = templates.find(t => t.name === templateName);
    setNewTemplate(template || { name: '', emailTo: '', subject: '', body: '', trigger: '' });
  };

  const handleNewTemplateChange = (e) => {
    setNewTemplate({ ...newTemplate, [e.target.name]: e.target.value });
  };

  const handleSaveTemplate = async () => {
    try {
      if (newTemplate._id) {
        // Update existing template
        await axios.put(`/template/${newTemplate._id}`, newTemplate);
      } else {
        // Create new template
        await axios.post('/template', newTemplate);
      }
      alert('Template saved successfully!');
      fetchTemplates(); // Refresh the templates list
    } catch (error) {
      console.error(error);
      alert('Error saving template');
    }
  };

  const handleDeleteTemplate = async () => {
    if (!newTemplate._id) {
      alert('Select a template to delete.');
      return;
    }
    
    try {
      await axios.delete(`/template/${newTemplate._id}`);
      alert('Template deleted successfully!');
      fetchTemplates(); // Refresh the templates list
      setSelectedTemplate(''); // Clear the selection
      setNewTemplate({ name: '', emailTo: '', subject: '', body: '', trigger: '' }); // Reset form
    } catch (error) {
      console.error(error);
      alert('Error deleting template');
    }
  };

  return (
    <Box>
      <Grid container direction="column" spacing={3} sx={{ padding: 5 }}>
        {/* Email Input */}
        <Grid container alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={3}>
            <Typography variant="body1">Email To:</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ width: '50%' }}
              name="emailTo"
              value={newTemplate.emailTo}
              onChange={handleNewTemplateChange}
            />
          </Grid>
        </Grid>

        {/* Dropdown Input */}
        <Grid container alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={3}>
            <Typography variant="body1">Select Email template:</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth sx={{ width: '50%' }}>
              <InputLabel id="dropdown-label">Select existing templates...</InputLabel>
              <Select
                labelId="dropdown-label"
                id="dropdown"
                value={selectedTemplate}
                label="Select..."
                onChange={handleTemplateChange}
              >
                {templates.map((template) => (
                  <MenuItem key={template._id} value={template.name}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Template details */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="Enter new Template name to create new template"
              name="name"
              value={newTemplate.name}
              onChange={handleNewTemplateChange}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        {/* Subject */}
        <Grid container spacing={2} alignItems="center" sx={{ marginTop: '10px' }}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={newTemplate.subject}
              onChange={handleNewTemplateChange}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        {/* Body */}
        <Grid container spacing={2} alignItems="center" sx={{ marginTop: '10px' }}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="Body"
              name="body"
              value={newTemplate.body}
              onChange={handleNewTemplateChange}
              variant="outlined"
              size="small"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        {/* Trigger Dropdown */}
        <Grid container spacing={2} alignItems="center" sx={{ marginTop: '10px' }}>
          <Grid item xs={9}>
            <FormControl fullWidth>
              <InputLabel id="trigger-dropdown-label">Trigger</InputLabel>
              <Select
                labelId="trigger-dropdown-label"
                id="trigger-dropdown"
                name="trigger"
                value={newTemplate.trigger}
                onChange={handleNewTemplateChange}
              >
                <MenuItem value="Signup">Signup</MenuItem>
                <MenuItem value="KYCApproved">KYCApproved</MenuItem>
                <MenuItem value="PayoutRequest">PayoutRequest</MenuItem>
                <MenuItem value="Custom">Custom</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Save and Delete buttons */}
        <Grid container spacing={2} alignItems="center" sx={{ marginTop: '10px' }}>
          <Grid item xs={9}>
            <Button variant="contained" color="primary" onClick={handleSaveTemplate}>
              Save Template
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteTemplate} sx={{ marginLeft: 2 }}>
              Delete Template
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailTemplate;

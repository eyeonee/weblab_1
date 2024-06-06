import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, AppBar, Toolbar } from '@mui/material';

function AboutPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <Container>
      <AppBar position="static" style={{ marginBottom: 16 }}>
        <Toolbar>
          <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
          <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
          <Button color="inherit" onClick={() => navigate('/phonebook')}>Phone Book</Button>
          <div style={{ flexGrow: 1 }}></div>
          <Button color="inherit" onClick={handleLogout} style={{ position: 'absolute', right: 16 }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Paper style={{ padding: 16, background: 'linear-gradient(to right, #0288d1, #1f6635)' }} data-testid="about-paper">
        <Typography variant="h4" gutterBottom style={{ color: '#fff' }} data-testid="about-title">About</Typography>
        <Typography variant="body1" style={{ color: '#fff' }} data-testid="about-description">
          This is a simple phone book application built with ReactJS and MaterialUI.
        </Typography>
        <Typography variant="body1" style={{ marginTop: 16, color: '#fff' }} data-testid="about-features">
          Features include:
          <ul>
            <li>User registration and login</li>
            <li>Profile management</li>
            <li>Phone book with add, edit, and delete functionalities</li>
            <li>Sorting and grouping of contacts</li>
          </ul>
        </Typography>
      </Paper>
    </Container>
  );
}

export default AboutPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, AppBar, Toolbar } from '@mui/material';

function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

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
      <Paper style={{ padding: 16, background: 'linear-gradient(to right, #0288d1, #1f6635)' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>User Profile</Typography>
        <Typography variant="body1" style={{ color: '#fff' }}>Name: {user.name}</Typography>
        <Typography variant="body1" style={{ color: '#fff' }}>Surname: {user.surname}</Typography>
        <Typography variant="body1" style={{ color: '#fff' }}>Email: {user.email}</Typography>
        <Typography variant="body1" style={{ color: '#fff' }}>Phone: {user.phone}</Typography>
        <Typography variant="body1" style={{ color: '#fff' }}>Gender: {user.gender}</Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary" style={{ marginTop: 16 }}>
          Logout
        </Button>
      </Paper>
    </Container>
  );
}

export default ProfilePage;

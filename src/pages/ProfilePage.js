import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, AppBar, Toolbar } from '@mui/material';

function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <Container data-testid="profile-container">
      <AppBar position="static" style={{ marginBottom: 16 }}>
        <Toolbar>
          <Button color="inherit" onClick={() => navigate('/profile')} data-testid="profile-button">Profile</Button>
          <Button color="inherit" onClick={() => navigate('/about')} data-testid="about-button">About</Button>
          <Button color="inherit" onClick={() => navigate('/phonebook')} data-testid="phonebook-button">Phone Book</Button>
          <div style={{ flexGrow: 1 }}></div>
          <Button color="inherit" onClick={handleLogout} style={{ position: 'absolute', right: 16 }} data-testid="logout-nav-button">Logout</Button>
        </Toolbar>
      </AppBar>
      <Paper style={{ padding: 16, background: 'linear-gradient(to right, #0288d1, #1f6635)' }} data-testid="profile-paper">
        <Typography variant="h4" gutterBottom style={{ color: '#fff' }} data-testid="profile-title">User Profile</Typography>
        <Typography variant="body1" style={{ color: '#fff' }} data-testid="user-name">Name: {user.name}</Typography>
        <Typography variant="body1" style={{ color: '#fff' }} data-testid="user-surname">Surname: {user.surname}</Typography>
        <Typography variant="body1" style={{ color: '#fff' }} data-testid="user-email">Email: {user.email}</Typography>
        <Typography variant="body1" style={{ color: '#fff' }} data-testid="user-phone">Phone: {user.phone}</Typography>
        <Typography variant="body1" style={{ color: '#fff' }} data-testid="user-gender">Gender: {user.gender}</Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary" style={{ marginTop: 16 }} data-testid="logout-button">
          Logout
        </Button>
      </Paper>
    </Container>
  );
}

export default ProfilePage;

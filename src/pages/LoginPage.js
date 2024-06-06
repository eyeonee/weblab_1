import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/phonebook');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 16, margin: '24px 0', background: 'linear-gradient(to right, #0288d1, #fbc02d)' }} data-testid="login-paper">
        <Typography variant="h4" gutterBottom style={{ color: '#fff' }} data-testid="login-title">Login</Typography>
        <form onSubmit={handleLogin} data-testid="login-form">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ 'data-testid': 'email-input' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ 'data-testid': 'password-input' }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 16 }} data-testid="login-button">
            Login
          </Button>
        </form>
        <Button onClick={() => navigate('/register')} variant="text" color="secondary" fullWidth style={{ marginTop: 16 }} data-testid="register-button">
          Don't have an account? Register
        </Button>
      </Paper>
    </Container>
  );
}

export default LoginPage;

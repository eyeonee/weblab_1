import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ email, password, name, surname, phone, gender });
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ margin: '24px 0', padding: 16, background: 'linear-gradient(to right, #0288d1, #fbc02d)' }} data-testid="register-paper">
        <Typography variant="h4" gutterBottom style={{ color: '#fff' }} data-testid="register-title">Register</Typography>
        <form onSubmit={handleRegister} data-testid="register-form">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            inputProps={{ 'data-testid': 'name-input' }}
          />
          <TextField
            label="Surname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Surname"
            inputProps={{ 'data-testid': 'surname-input' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            placeholder="Password"
            inputProps={{ 'data-testid': 'password-input' }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            inputProps={{ 'data-testid': 'phone-input' }}
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
            //inputProps={{ 'data-testid': 'gender-input' }}
            data-testid = "gender-input" 
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 16 }} data-testid="register-button">
            Register
          </Button>
        </form>
        <Button onClick={() => navigate('/')} variant="text" color="secondary" fullWidth style={{ marginTop: 16 }} data-testid="back-to-login-button">
          Back to Login
        </Button>
      </Paper>
    </Container>
  );
}

export default RegistrationPage;

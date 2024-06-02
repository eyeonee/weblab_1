import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, List, ListItem, ListItemText, IconButton, Divider, AppBar, Toolbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function PhoneBookPage() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddOrUpdateContact = (e) => {
    e.preventDefault();
    if (editId !== null) {
      setContacts(contacts.map(contact => contact.id === editId ? { name, surname, phone, id: editId } : contact));
      setEditId(null);
    } else {
      setContacts([...contacts, { name, surname, phone, id: Date.now() }]);
    }
    setName('');
    setSurname('');
    setPhone('');
  };

  const handleEditContact = (id) => {
    const contact = contacts.find(contact => contact.id === id);
    setName(contact.name);
    setSurname(contact.surname);
    setPhone(contact.phone);
    setEditId(id);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const groupedContacts = contacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sortedGroups = Object.keys(groupedContacts).sort();

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
        <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>Phone Book</Typography>
        <form onSubmit={handleAddOrUpdateContact}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Surname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {editId !== null ? 'Save' : 'Add'} Contact
          </Button>
        </form>
        <Divider style={{ margin: '16px 0' }} />
        {sortedGroups.map(letter => (
          <div key={letter}>
            <Typography variant="h6" style={{ color: '#fff' }}>{letter}</Typography>
            <List>
              {groupedContacts[letter].map(contact => (
                <Paper key={contact.id} style={{ marginBottom: 8 }}>
                  <ListItem secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditContact(contact.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteContact(contact.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }>
                    <ListItemText primary={`${contact.name} ${contact.surname}`} secondary={contact.phone} style={{ color: '#ffffff' }} />
                  </ListItem>
                </Paper>
              ))}
            </List>
            <Divider />
          </div>
        ))}
      </Paper>
    </Container>
  );
}

export default PhoneBookPage;

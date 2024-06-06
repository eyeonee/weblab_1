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
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    );
  });

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sortedGroups = Object.keys(groupedContacts).sort();

  return (
    <Container data-testid="phonebook-container">
      <AppBar position="static" style={{ marginBottom: 16 }}>
        <Toolbar>
          <Button color="inherit" onClick={() => navigate('/profile')} data-testid="profile-button">Profile</Button>
          <Button color="inherit" onClick={() => navigate('/about')} data-testid="about-button">About</Button>
          <Button color="inherit" onClick={() => navigate('/phonebook')} data-testid="phonebook-button">Phone Book</Button>
          <div style={{ flexGrow: 1 }}></div>
          <Button color="inherit" onClick={handleLogout} style={{ position: 'absolute', right: 16 }} data-testid="logout-button">Logout</Button>
        </Toolbar>
      </AppBar>
      <Paper style={{ padding: 16, background: 'linear-gradient(to right, #0288d1, #fbc02d)' }} data-testid="phonebook-paper">
        <Typography variant="h4" gutterBottom style={{ color: '#fff' }} data-testid="phonebook-title">Phone Book</Typography>
        <form onSubmit={handleAddOrUpdateContact} data-testid="contact-form">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ 'data-testid': 'name-input' }}
          />
          <TextField
            label="Surname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            inputProps={{ 'data-testid': 'surname-input' }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputProps={{ 'data-testid': 'phone-input' }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth data-testid="submit-button">
            {editId !== null ? 'Save' : 'Add'} Contact
          </Button>
        </form>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginTop: 16 }}
          inputProps={{ 'data-testid': 'search-input' }}
        />
        <Divider style={{ margin: '16px 0' }} />
        {sortedGroups.map(letter => (
          <div key={letter} data-testid={`group-${letter}`}>
            <Typography variant="h6" style={{ color: '#fff' }}>{letter}</Typography>
            <List>
              {groupedContacts[letter].map(contact => (
                <Paper key={contact.id} style={{ marginBottom: 8 }} data-testid={`contact-${contact.id}`}>
                  <ListItem secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditContact(contact.id)} data-testid={`edit-button-${contact.id}`}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteContact(contact.id)} data-testid={`delete-button-${contact.id}`}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }>
                    <ListItemText primary={`${contact.name} ${contact.surname}`} secondary={contact.phone} style={{ color: '#000000' }} />
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

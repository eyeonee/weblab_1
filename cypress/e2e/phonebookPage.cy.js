describe('Phone Book Page', () => {
  beforeEach(() => {
    // Set up the localStorage with some contacts
    const contacts = [
      { id: 1, name: 'Alice', surname: 'Anderson', phone: '1234567890' },
      { id: 2, name: 'Bob', surname: 'Brown', phone: '0987654321' }
    ];
    localStorage.setItem('contacts', JSON.stringify(contacts));
    cy.visit('/phonebook');
  });

  it('renders the phone book page with correct elements', () => {
    cy.get('[data-testid="phonebook-container"]').should('exist');
    cy.get('[data-testid="phonebook-paper"]').should('exist');
    cy.get('[data-testid="phonebook-title"]').should('be.visible').and('contain', 'Phone Book');
    cy.get('[data-testid="contact-form"]').should('exist');
    cy.get('[data-testid="name-input"]').should('exist');
    cy.get('[data-testid="surname-input"]').should('exist');
    cy.get('[data-testid="phone-input"]').should('exist');
    cy.get('[data-testid="submit-button"]').should('exist');
    cy.get('[data-testid="search-input"]').should('exist');
  });

  it('adds a new contact', () => {
    cy.get('[data-testid="name-input"]').type('Charlie');
    cy.get('[data-testid="surname-input"]').type('Chaplin');
    cy.get('[data-testid="phone-input"]').type('1112223333');
    cy.get('[data-testid="submit-button"]').click();

    cy.window().then((win) => {
      const newContacts = JSON.parse(win.localStorage.getItem('contacts'));
      const newContact = newContacts.find(contact => contact.name === 'Charlie' && contact.surname === 'Chaplin');
      expect(newContact).to.exist;
      cy.get(`[data-testid="contact-${newContact.id}"]`).should('exist').within(() => {
        cy.contains('Charlie Chaplin').should('be.visible');
        cy.contains('1112223333').should('be.visible');
      });
    });
  });

  it('edits an existing contact', () => {
    cy.get('[data-testid="edit-button-1"]').click();
    cy.get('[data-testid="name-input"]').clear().type('Alicia');
    cy.get('[data-testid="surname-input"]').clear().type('Anderson');
    cy.get('[data-testid="phone-input"]').clear().type('9999999999');
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="contact-1"]').should('exist').within(() => {
      cy.contains('Alicia Anderson').should('be.visible');
      cy.contains('9999999999').should('be.visible');
    });
  });

  it('deletes a contact', () => {
    cy.get('[data-testid="delete-button-2"]').click();

    cy.get('[data-testid="contact-2"]').should('not.exist');
  });

  it('searches for a contact', () => {
    cy.get('[data-testid="search-input"]').type('Alice');
    cy.get('[data-testid="contact-1"]').should('exist');
    cy.get('[data-testid="contact-2"]').should('not.exist');
  });
});

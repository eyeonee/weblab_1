describe('Profile Page', () => {
  beforeEach(() => {
    // Set up the localStorage with a logged-in user
    const user = {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      gender: 'male'
    };
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    cy.visit('/profile');
  });

  it('renders the profile page with correct elements', () => {
    cy.get('[data-testid="profile-container"]').should('exist');
    cy.get('[data-testid="profile-paper"]').should('exist');
    cy.get('[data-testid="profile-title"]').should('be.visible').and('contain', 'User Profile');
    cy.get('[data-testid="user-name"]').should('contain', 'Name: John');
    cy.get('[data-testid="user-surname"]').should('contain', 'Surname: Doe');
    cy.get('[data-testid="user-email"]').should('contain', 'Email: john.doe@example.com');
    cy.get('[data-testid="user-phone"]').should('contain', 'Phone: 1234567890');
    cy.get('[data-testid="user-gender"]').should('contain', 'Gender: male');
  });

  it('navigates to the About page', () => {
    cy.get('[data-testid="about-button"]').click();
    cy.url().should('include', '/about');
  });

  it('navigates to the Phone Book page', () => {
    cy.get('[data-testid="phonebook-button"]').click();
    cy.url().should('include', '/phonebook');
  });

  it('logs out successfully', () => {
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/');
  });
});

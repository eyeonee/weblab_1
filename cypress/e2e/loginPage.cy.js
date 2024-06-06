describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the login page with correct elements', () => {
    cy.get('[data-testid="login-title"]').should('contain', 'Login');
    cy.get('[data-testid="login-form"]').should('exist');
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('[data-testid="login-button"]').should('exist');
    cy.get('[data-testid="register-button"]').should('exist');
  });

  it('displays an alert for invalid login', () => {
    cy.get('[data-testid="email-input"]').type('invalid@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Invalid email or password');
    });
  });

  it('logs in successfully with valid credentials', () => {
    // Set up the localStorage with a user
    const user = { email: 'test@example.com', password: 'password' };
    localStorage.setItem('users', JSON.stringify([user]));

    cy.get('[data-testid="email-input"]').type(user.email);
    cy.get('[data-testid="password-input"]').type(user.password);
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/phonebook');
  });
});

describe('Registration Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('renders the registration page with correct elements', () => {
    cy.get('[data-testid="register-title"]').should('be.visible').and('contain', 'Register');
    cy.get('[data-testid="register-form"]').should('exist');
    cy.get('[data-testid="name-input"]').should('exist');
    cy.get('[data-testid="surname-input"]').should('exist');
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('[data-testid="phone-input"]').should('exist');
    cy.get('[data-testid="gender-input"]').should('exist');
    cy.get('[data-testid="register-button"]').should('exist');
    cy.get('[data-testid="back-to-login-button"]').should('exist');
  });

  it('registers a new user successfully', () => {
    cy.get('[data-testid="name-input"]').type('John');
    cy.get('[data-testid="surname-input"]').type('Doe');
    cy.get('[data-testid="email-input"]').type('john.doe@example.com');
    cy.get('[data-testid="password-input"]').type('password');
    cy.get('[data-testid="phone-input"]').type('1234567890');
    cy.get('[data-testid="gender-input"]').click().get('li[data-value="male"]').click();
    cy.get('[data-testid="register-button"]').click();

    cy.url().should('include', '/');
  });

  it('navigates back to login page', () => {
    cy.get('[data-testid="back-to-login-button"]').click();
    cy.url().should('include', '/');
  });
});

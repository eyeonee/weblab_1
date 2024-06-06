describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('displays the about page with correct content', () => {
    cy.get('[data-testid="about-title"]').should('contain', 'About');
    cy.get('[data-testid="about-description"]').should('contain', 'This is a simple phone book application built with ReactJS and MaterialUI.');
    cy.get('[data-testid="about-features"]').should('contain', 'Features include:');
    cy.get('[data-testid="about-features"]').should('contain', 'User registration and login');
    cy.get('[data-testid="about-features"]').should('contain', 'Profile management');
    cy.get('[data-testid="about-features"]').should('contain', 'Phone book with add, edit, and delete functionalities');
    cy.get('[data-testid="about-features"]').should('contain', 'Sorting and grouping of contacts');
  });
});

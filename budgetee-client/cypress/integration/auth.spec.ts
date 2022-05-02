describe('budgetee client', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('user can register', () => {
    cy.contains('Log in').click();

    cy.get('#login-email').type('test@user.com')
    cy.get('#login-password').type('1234')

    cy.get('#login-button').click()

    cy.contains('Latest budgets');
    cy.contains('Latest records');
  });
});

export {}
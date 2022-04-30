describe('budegtee', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Welcome to Budgetee')
  });
});

export {}
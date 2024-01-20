describe('app works correctly with routes', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/string');
  });
  
  it('button disabled', function() {
    cy.get('[data-testid="button"]').should('be.disabled');

    cy.get('[data-testid="input"]').type('Тестовая строка');
    cy.get('[data-testid="button"]').should('not.be.disabled');
    
    cy.get('[data-testid="input"]').clear();
    cy.get('[data-testid="button"]').should('be.disabled');
  });
  
  it('check', function() {
    const testString = 'test';
    const resultStirngs = ['test', 'tset'];
    const expectedLength = resultStirng.length;

    cy.get('[data-testid="input"]').type(testString);
    cy.get('[data-testid="button"]').click();

    cy.get('[data-testid="result"]').children().each(($el, index) => {
      // cy.wrap($el).should('have.class', 'expected-class-for-step-' + index);
      cy.wrap($el).invoke('text').should('eq', resultStirng[index]);
    });

    cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
  });
}); 
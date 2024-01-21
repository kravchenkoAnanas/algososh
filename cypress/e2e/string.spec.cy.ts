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
  
  it('check animation', function() {
    const testString = 'test';
    const resultStirngs = ['test', 'tset'];
    const expectedLength = testString.length;

    cy.get('[data-testid="input"]').type(testString);
    cy.get('[data-testid="button"]').click();

    cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
    cy.get('[data-testid="result"]').children().each(($el, index) => {
      cy.wrap($el).invoke('text').should('eq', resultStirngs[0][index]);

      const toMatch = index === 0 || index === expectedLength - 1 ? /changing/ : /default/;
      cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
        expect(className).to.match(toMatch);
      });
    });
    cy.wait(1000);

    cy.get('[data-testid="result"]').children().each(($el, index) => {
      cy.wrap($el).invoke('text').should('eq', resultStirngs[0][index]);

      const toMatch = index === 1 || index === expectedLength - 2 ? /changing/ : /modified/;
      cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
        expect(className).to.match(toMatch);
      });
    });
    cy.wait(1000);

    cy.get('[data-testid="result"]').children().each(($el, index) => {
      cy.wrap($el).invoke('text').should('eq', resultStirngs[1][index]);

      const toMatch = index === 1 || index === expectedLength - 2 ? /changing/ : /modified/;
      cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
        expect(className).to.match(toMatch);
      });
    });

    cy.wait(1000);
    cy.get('[data-testid="result"]').children().each(($el, index) => {
      cy.wrap($el).invoke('text').should('eq', resultStirngs[1][index]);

      cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
        expect(className).to.match(/modified/);
      });
    });
  });
}); 

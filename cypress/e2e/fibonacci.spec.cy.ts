describe('fibonacci-page', function() {
    beforeEach(function() {
      cy.visit('fibonacci');
    });
    
    it('button disabled', function() {
      cy.get('[data-testid="button"]').should('be.disabled');
  
      cy.get('[data-testid="input"]').type(7);
      cy.get('[data-testid="button"]').should('not.be.disabled');
      
      cy.get('[data-testid="input"]').clear();
      cy.get('[data-testid="button"]').should('be.disabled');
    });
    
    it('check animation', function() {
      const testInput = 7;
      const result = ['1', '1', '2', '3', '5', '8', '13', '21'];
      const expectedLength = result.length;
  
      cy.get('[data-testid="input"]').type(testInput);
      cy.get('[data-testid="button"]').click();
      
      cy.wait(testInput * 500);
      cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
      cy.get('[data-testid="result"]').children().each(($el, index) => {
        cy.wrap($el).find('div[class*="circle_circle"]').invoke('text').should('eq', result[index]);
  
        cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
          expect(className).to.match(/default/);
        });
      });
    });
}); 
  
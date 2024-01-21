describe('stack-page', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/stack');
    });
    
    it('button disabled', function() {
      cy.get('[data-testid="add"]').should('be.disabled');
      cy.get('[data-testid="delete"]').should('be.disabled');
      cy.get('[data-testid="clear"]').should('be.disabled');
  
      cy.get('[data-testid="input"]').type(7);
      cy.get('[data-testid="add"]').should('not.be.disabled');
      
      cy.get('[data-testid="input"]').clear();
      cy.get('[data-testid="add"]').should('be.disabled');
    });

    it('check add animation', function() {
        const testInput = 7;
        const result = ['7'];
        const expectedLength = result.length;
    
        cy.get('[data-testid="input"]').type(testInput);
        cy.get('[data-testid="add"]').click();
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
        cy.get('[data-testid="result"]').children().each(($el, index) => {
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('text').should('eq', result[index]);
            
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
                expect(className).to.match(/changing/);
            });
        });
        cy.wait(expectedLength * 500);
        
        cy.get('[data-testid="result"]').children().each(($el, index) => {
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('text').should('eq', result[index]);
            
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
                expect(className).to.match(/default/);
            });
        });
    });

    it('check delete animation', function() {
        const testInput = 7;
        const result = ['7'];
        const expectedLength = result.length;

        cy.get('[data-testid="input"]').type(testInput);
        cy.get('[data-testid="add"]').click();
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
        cy.wait(expectedLength * 500);
        
        cy.get('[data-testid="delete"]').click();
        
        cy.get('[data-testid="result"]').children().each(($el, index) => {
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('text').should('eq', result[index]);
            
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
                expect(className).to.match(/changing/);
            });
        });
        cy.wait(500);
        
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength - 1);
    });

    it('check clear animation', function() {
        const result = ['7', '123'];

        cy.get('[data-testid="input"]').type(result[0]);
        cy.get('[data-testid="add"]').click();
        cy.get('[data-testid="result"]').children().should('have.length', 1);
        cy.wait(500);

        cy.get('[data-testid="input"]').type(result[1]);
        cy.get('[data-testid="add"]').click();
        cy.get('[data-testid="result"]').children().should('have.length', 2);
        cy.wait(500);

        cy.get('[data-testid="clear"]').click();
        cy.get('[data-testid="result"]').children().should('have.length', 0);
    });
});
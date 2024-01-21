describe('queue-page', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/queue');
    });
    
    it('button disabled', function() {
      cy.get('[data-testid="add"]').should('be.disabled');
      cy.get('[data-testid="delete"]').should('be.disabled');
      cy.get('[data-testid="clear"]').should('be.disabled');
  
      cy.get('[data-testid="input"]').type(123);
      cy.get('[data-testid="add"]').should('not.be.disabled');
      
      cy.get('[data-testid="input"]').clear();
      cy.get('[data-testid="add"]').should('be.disabled');
    });

    it('check add animation', function() {
        const testInput = 7;
        const result = ['7', '', '', '', '', '', ''];
        const expectedLength = result.length;
    
        cy.get('[data-testid="input"]').type(testInput);
        cy.get('[data-testid="add"]').click();
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
        cy.get('[data-testid="result"]').children().each(($el, index) => {
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('text').should('eq', result[index]);
            
            const toMatch = index === 0 ? /changing/ : /default/;
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
                expect(className).to.match(toMatch);
            });
        });
        cy.wait(500);
        
        cy.get('[data-testid="result"]').children().each(($el, index) => {
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('text').should('eq', result[index]);
            
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
                expect(className).to.match(/default/);
            });
        });
    });

    it('check delete animation', function() {
        const testInput = 7;
        const result = ['', '', '', '', '', '', ''];
        const expectedLength = result.length;

        cy.get('[data-testid="input"]').type(testInput);
        cy.get('[data-testid="add"]').click();
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
        cy.wait(500);
        
        cy.get('[data-testid="delete"]').click();
        cy.get('[data-testid="result"]').children().each(($el, index) => {
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('text').should('eq', result[index]);
            
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
                expect(className).to.match(/default/);
            });
        });
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
    });

    it('check clear animation', function() {
        const input = ['7', '123', '', '', '', '', ''];
        const result = ['', '', '', '', '', '', ''];
        const expectedLength = result.length;
    
        cy.get('[data-testid="input"]').type(input[0]);
        cy.get('[data-testid="add"]').click();
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
        cy.wait(500);

        cy.get('[data-testid="input"]').type(input[1]);
        cy.get('[data-testid="add"]').click();
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
        cy.wait(500);

        cy.get('[data-testid="clear"]').click();
        cy.get('[data-testid="result"]').children().each(($el, index) => {
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('text').should('eq', result[index]);
            
            cy.wrap($el).find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => {
                expect(className).to.match(/default/);
            });
        });
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
    });

});
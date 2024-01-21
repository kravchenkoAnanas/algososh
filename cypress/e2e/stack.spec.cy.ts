import { ADD, CLEAR, DELETE } from "./util";

describe('stack-page', function() {
    beforeEach(function() {
      cy.visit('stack');
    });
    
    it('button disabled', function() {
      cy.get(ADD).should('be.disabled');
      cy.get(DELETE).should('be.disabled');
      cy.get(CLEAR).should('be.disabled');
  
      cy.get('[data-testid="input"]').type(7);
      cy.get(ADD).should('not.be.disabled');
      
      cy.get('[data-testid="input"]').clear();
      cy.get(ADD).should('be.disabled');
    });

    it('check add animation', function() {
        const testInput = 7;
        const result = ['7'];
        const expectedLength = result.length;
    
        cy.get('[data-testid="input"]').type(testInput);
        cy.get(ADD).click();
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
        cy.get(ADD).click();
        cy.get('[data-testid="result"]').children().should('have.length', expectedLength);
        cy.wait(expectedLength * 500);
        
        cy.get(DELETE).click();
        
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
        cy.get(ADD).click();
        cy.get('[data-testid="result"]').children().should('have.length', 1);
        cy.wait(500);

        cy.get('[data-testid="input"]').type(result[1]);
        cy.get(ADD).click();
        cy.get('[data-testid="result"]').children().should('have.length', 2);
        cy.wait(500);

        cy.get(CLEAR).click();
        cy.get('[data-testid="result"]').children().should('have.length', 0);
    });
});
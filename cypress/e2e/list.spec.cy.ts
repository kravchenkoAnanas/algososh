import { ADD_BY_INDEX, ADD_TO_HEAD, ADD_TO_TAIL, DELETE_BY_INDEX, DELETE_FROM_HEAD, DELETE_FROM_TAIL, INDEX } from "./util";

describe('list-page', function() {
    beforeEach(function() {
      cy.visit('list');
    });
    
    it('button disabled', function() {
      cy.get(ADD_TO_HEAD).should('be.disabled');
      cy.get(ADD_TO_TAIL).should('be.disabled');
      cy.get(ADD_BY_INDEX).should('be.disabled');
      cy.get(DELETE_BY_INDEX).should('be.disabled');

      cy.get('[data-testid="input"]').type(123);
      cy.get(ADD_TO_HEAD).should('not.be.disabled');
      cy.get(ADD_TO_TAIL).should('not.be.disabled');
      
      cy.get(INDEX).type(1);
      cy.get(ADD_BY_INDEX).should('not.be.disabled');
      cy.get(ADD_BY_INDEX).should('not.be.disabled');
    });

    it('default input', function() {
        cy.get('[data-testid="result"]').children()
            .should('have.length.greaterThan', 4).and('have.length.lessThan', 10);
    });

    it('check add-to-head animation', function() {
        const testInput = '7';
    
        cy.get('[data-testid="input"]').type(testInput);
        cy.get(ADD_TO_HEAD).click();

        cy.get('[data-testid="result"]').children().first()
            .find('div[class*="circle_circle"]').first()
            .invoke('text').should('eq', testInput);
            
        cy.get('[data-testid="result"]').children().first()
            .find('div[class*="circle_circle"]').first()
            .invoke('attr', 'class').then((className) => { 
                expect(className).to.match(/changing/);
            });
        cy.wait(500);
        
        cy.get('[data-testid="result"]').children().first()
        .find('div[class*="circle_circle"]').invoke('text').should('eq', testInput);
        
        cy.wait(500);
        cy.get('[data-testid="result"]').children().first()
            .find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => { 
                expect(className).to.match(/default/);
            });
    });

    it('check add-to-tail animation', function() {
        const testInput = '7';
    
        cy.get('[data-testid="input"]').type(testInput);
        cy.get(ADD_TO_TAIL).click();

        cy.get('[data-testid="result"]').children().last()
            .find('div[class*="circle_circle"]').last()
            .invoke('text').should('eq', testInput);
            
        cy.get('[data-testid="result"]').children().last()
            .find('div[class*="circle_circle"]').last()
            .invoke('attr', 'class').then((className) => { 
                expect(className).to.match(/changing/);
            });
        cy.wait(500);
        
        cy.get('[data-testid="result"]').children().last()
            .find('div[class*="circle_circle"]').invoke('text').should('eq', testInput);
        
        cy.wait(500);
        cy.get('[data-testid="result"]').children().last()
            .find('div[class*="circle_circle"]').invoke('attr', 'class').then((className) => { 
                expect(className).to.match(/default/);
            });
    });

    it('check add-by-index animation', function() {
        const testInput = '7';
        const testIdxInput = 1;
    
        cy.get('[data-testid="input"]').type(testInput);
        cy.get(INDEX).type(testIdxInput);
        cy.get(ADD_BY_INDEX).click();

        cy.get('[data-testid="result"]').children().first()
            .find('div[class*="circle_circle"]').first()
            .invoke('text').should('eq', testInput);
            
        cy.get('[data-testid="result"]').children().first()
            .find('div[class*="circle_circle"]').first()
            .invoke('attr', 'class').then((className) => { 
                expect(className).to.match(/changing/);
            });
        cy.wait(500);

        cy.get('[data-testid="result"]').children().find('div[class*="circle_circle"]').each(($el, index) => {
            if (index === testIdxInput) {
                cy.wrap($el).invoke('text').should('eq', testInput);
                cy.wrap($el).invoke('attr', 'class').then((className) => {
                    expect(className).to.match(/changing/);
                });
            }
        });
        cy.wait(500);

        cy.get('[data-testid="result"]').children().find('div[class*="circle_circle"]').each(($el, index) => {
            if (index === testIdxInput) {
                cy.wrap($el).invoke('text').should('eq', testInput);
                cy.wrap($el).invoke('attr', 'class').then((className) => {
                    expect(className).to.match(/modified/);
                });
            }
        });
        cy.wait(500);

        cy.get('[data-testid="result"]').children().find('div[class*="circle_circle"]').each(($el, index) => {
            if (index === testIdxInput) {
                cy.wrap($el).invoke('text').should('eq', testInput);
                cy.wrap($el).invoke('attr', 'class').then((className) => {
                    expect(className).to.match(/default/);
                });
            }
        });
    });

    it('check delete-from-head animation', function() {
        cy.get(DELETE_FROM_HEAD).click();

        cy.get('[data-testid="result"]').children().first()
            .find('div[class*="circle_circle"]').first()
            .invoke('text').should('eq', '');

        cy.get('[data-testid="result"]').children().first()
            .find('div[class*="circle_circle"]').last()
            .invoke('attr', 'class').then((className) => { 
                expect(className).to.match(/changing/);
            });
    });

    it('check delete-from-tail animation', function() {
        cy.get(DELETE_FROM_TAIL).click();

        cy.get('[data-testid="result"]').children().last()
            .find('div[class*="circle_circle"]').first()
            .invoke('text').should('eq', '');

        cy.get('[data-testid="result"]').children().last()
            .find('div[class*="circle_circle"]').last()
            .invoke('attr', 'class').then((className) => { 
                expect(className).to.match(/changing/);
            });
    });

    it('check delete-by-index animation', function() {
        const testIdxInput = 1;
    
        cy.get(INDEX).type(testIdxInput);
        cy.get(DELETE_BY_INDEX).click();

        cy.wait(500);

        cy.get('[data-testid="result"]').children().first()
            .find('div[class*="circle_circle"]').first()
            .invoke('attr', 'class').then((className) => { 
                expect(className).to.match(/changing/);
            });
        cy.wait(500);

        cy.get('[data-testid="result"]').children().find('div[class*="circle_circle"]').each(($el, index) => {
            if (index === testIdxInput) {
                cy.wrap($el).invoke('attr', 'class').then((className) => {
                    expect(className).to.match(/changing/);
                });
            }
        });
        cy.wait(500);

        cy.get('[data-testid="result"]').children().find('div[class*="circle_circle"]').each(($el, index) => {
            if (index === testIdxInput) {
                cy.wrap($el).invoke("text").should("eq", "");
            } else if (index === testIdxInput + 1) {
                cy.wrap($el).invoke('attr', 'class').then((className) => {
                    expect(className).to.match(/changing/);
                });
            }
        });
    });
});
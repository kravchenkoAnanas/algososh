import { BUTTON, CIRCLES, INPUT, RESULT } from "./util";

describe('string-page', function() {
  beforeEach(function() {
    cy.visit('string');
  });
  
  it('button disabled', function() {
    cy.get(BUTTON).as("btn").should('be.disabled');

    cy.get(INPUT).type('Тестовая строка');
    cy.get('[data-testid="button"]').should('not.be.disabled');
    
    cy.get(INPUT).clear();
    cy.get('[data-testid="button"]').should('be.disabled');
  });
  
  it('check animation', function() {
    const testString = 'test';
    const resultStirngs = ['test', 'tset'];
    const expectedLength = testString.length;

    cy.get(INPUT).type(testString);
    cy.get('[data-testid="button"]').click();

    cy.get(RESULT).children().should('have.length', expectedLength);
    cy.get(RESULT).children().each(($el, index) => {
      cy.wrap($el).invoke('text').should('eq', resultStirngs[0][index]);

      const toMatch = index === 0 || index === expectedLength - 1 ? /changing/ : /default/;
      cy.wrap($el).find(CIRCLES).invoke('attr', 'class').then((className) => {
        expect(className).to.match(toMatch);
      });
    });
    cy.wait(1000);

    cy.get(RESULT).children().each(($el, index) => {
      cy.wrap($el).invoke('text').should('eq', resultStirngs[0][index]);

      const toMatch = index === 1 || index === expectedLength - 2 ? /changing/ : /modified/;
      cy.wrap($el).find(CIRCLES).invoke('attr', 'class').then((className) => {
        expect(className).to.match(toMatch);
      });
    });
    cy.wait(1000);

    cy.get(RESULT).children().each(($el, index) => {
      cy.wrap($el).invoke('text').should('eq', resultStirngs[1][index]);

      const toMatch = index === 1 || index === expectedLength - 2 ? /changing/ : /modified/;
      cy.wrap($el).find(CIRCLES).invoke('attr', 'class').then((className) => {
        expect(className).to.match(toMatch);
      });
    });

    cy.wait(1000);
    cy.get(RESULT).children().each(($el, index) => {
      cy.wrap($el).invoke('text').should('eq', resultStirngs[1][index]);

      cy.wrap($el).find(CIRCLES).invoke('attr', 'class').then((className) => {
        expect(className).to.match(/modified/);
      });
    });
  });
}); 

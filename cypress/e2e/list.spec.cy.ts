describe('list-page', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/list');
    });
    
    it('button disabled', function() {
      cy.get('[data-testid="add-to-head"]').should('be.disabled');
      cy.get('[data-testid="add-to-tail"]').should('be.disabled');
      cy.get('[data-testid="add-by-index"]').should('be.disabled');
      cy.get('[data-testid="delete-by-index"]').should('be.disabled');

      cy.get('[data-testid="input"]').type(123);
      cy.get('[data-testid="add-to-head"]').should('not.be.disabled');
      cy.get('[data-testid="add-to-tail"]').should('not.be.disabled');
      
      cy.get('[data-testid="index"]').type(1);
      cy.get('[data-testid="add-by-index"]').should('not.be.disabled');
      cy.get('[data-testid="add-by-index"]').should('not.be.disabled');
    });

    it('default input', function() {
        cy.get('[data-testid="result"]').children()
            .should('have.length.greaterThan', 4).and('have.length.lessThan', 10);
    });

    it('check add-to-head animation', function() {
        const testInput = '7';
    
        cy.get('[data-testid="input"]').type(testInput);
        cy.get('[data-testid="add-to-head"]').click();

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
        cy.get('[data-testid="add-to-tail"]').click();

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
        cy.get('[data-testid="index"]').type(testIdxInput);
        cy.get('[data-testid="add-by-index"]').click();

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
        cy.get('[data-testid="delete-from-head"]').click();

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
        cy.get('[data-testid="delete-from-tail"]').click();

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
    
        cy.get('[data-testid="index"]').type(testIdxInput);
        cy.get('[data-testid="delete-by-index"]').click();

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
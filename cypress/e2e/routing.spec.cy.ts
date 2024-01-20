describe('app works correctly with routes', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });
  
  it('should open main page by default', function() {
    cy.contains('МБОУ АЛГОСОШ');
  });
  
  it('should open string page by default', function() {
    cy.visit('http://localhost:3000/string');
    cy.contains('Строка');
  });

  it('should open fibonacci page by default', function() {
    cy.visit('http://localhost:3000/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  it('should open sort page by default', function() {
    cy.visit('http://localhost:3000/sorting');
    cy.contains('Сортировка массива');
  });

  it('should open stack page by default', function() {
    cy.visit('http://localhost:3000/stack');
    cy.contains('Стек');
  });

  it('should open queue page by default', function() {
    cy.visit('http://localhost:3000/queue');
    cy.contains('Очередь');
  });

  it('should open list page by default', function() {
    cy.visit('http://localhost:3000/list');
    cy.contains('Связный список');
  });

}); 
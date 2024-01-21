describe('app works correctly with routes', function() {
  before(function() {
    cy.visit('');
  });
  
  it('should open main page by default', function() {
    cy.contains('МБОУ АЛГОСОШ');
  });
  
  it('should open string page by default', function() {
    cy.visit('string');
    cy.contains('Строка');
  });

  it('should open fibonacci page by default', function() {
    cy.visit('fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  it('should open sort page by default', function() {
    cy.visit('sorting');
    cy.contains('Сортировка массива');
  });

  it('should open stack page by default', function() {
    cy.visit('stack');
    cy.contains('Стек');
  });

  it('should open queue page by default', function() {
    cy.visit('queue');
    cy.contains('Очередь');
  });

  it('should open list page by default', function() {
    cy.visit('list');
    cy.contains('Связный список');
  });

}); 
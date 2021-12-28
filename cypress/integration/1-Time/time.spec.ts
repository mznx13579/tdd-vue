/// <reference types="cypress" />

describe('Time', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/time');
  });

  it('음식을 클릭하면 시간이 나타난다', () => {
    cy.get('.food').first().click();
    cy.get('.time').should('exist');
  });
});

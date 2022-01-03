/// <reference types="cypress" />

describe('Select', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/select');
  });

  it('두 개의 선택지가 나타난다', () => {
    cy.get('.select__list').children().should('have.length', 2);
  });

  it('첫 번째 버튼을 누르면 stopwatch로 이동한다', () => {
    cy.get('.select__list').children().first().click();
    cy.url().should('includes', '/stopwatch');
  });

  it('마지막 버튼을 누르면 time으로 이동한다', () => {
    cy.get('.select__list').children().last().click();
    cy.url().should('includes', '/time');
  });
});

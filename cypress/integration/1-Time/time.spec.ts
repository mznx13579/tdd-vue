/// <reference types="cypress" />

describe('Time', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/time');
  });

  it('음식을 클릭하면 시간이 나타난다', () => {
    cy.get('.food').first().click();
    cy.get('.time').should('exist');
  });

  it('가격을 입력하면, 음식 리스트가 사라진다.', () => {
    cy.get('.cost-input').clear().type('10000');
    cy.get('.cost-button').click();
    cy.get('.food-list').should('not.exist');
  });

  it('가격을 입력하면, 가격 입력창이 사라진다.', () => {
    cy.get('.cost-input').clear().type('10000');
    cy.get('.cost-button').click();
    cy.get('.time__cost').should('not.exist');
  });

  it('가격이 0원이면, 경고 알림 창이 뜬다.', () => {
    cy.get('.cost-input').should('not.have.text', '0');
    cy.get('.cost-button').click();
    cy.get('.warn-message').should('exist');
  });
});

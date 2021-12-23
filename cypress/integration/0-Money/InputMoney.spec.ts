describe('Input Money', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/money');
  });

  it('연봉을 입력하지 않고 다음 버튼을 누르면 알림 메세지가 표시된다.', () => {
    cy.get('.next-button').click();
    cy.get('.warning-message').should('have.text', '연봉을 입력해야 해요!');
  });
});

describe('Input Money', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/money');
  });

  it('연봉을 입력하지 않고 다음 버튼을 누르면 알림 메세지가 표시된다.', () => {
    cy.get('.next-button').click();
    cy.get('.warning-message').should('have.text', '!연봉을 입력해야 해요!');
  });

  context('연봉을 입력하고 다음 버튼을 누르면', () => {
    beforeEach(() => {
      cy.get('.money__wrap--input').clear().type('4300');
      cy.get('.next-button').click();
    });

    it('input이 없어져야 한다.', () => {
      cy.get('input.money__wrap--input').should('not.exist');
    });

    it('연봉+만원 string이 노출 되야 한다.', () => {
      cy.get('.money__wrap').children().should('have.text', '4300만원');
    });

    it(`버튼이 '확인'으로 바뀌어야 한다.`, () => {
      cy.get('.next-button').should('have.text', '확인!');
      cy.get('.next-button').should('not.have.text', '다음!');
    });

    it(`'확인!' 버튼을 누르면 다음 페이지로 이동한다.`, () => {
      cy.contains('확인!').click();
    });
  });
});

import { date } from '.';

describe('[date 관련 유틸 함수 테스트]', () => {
  // 테스트 데이터
  const DATE = new Date(2021, 4, 22);
  describe('getFromFormat 메소드는', () => {
    context('Date 객체와 format(yyyy)을 보내면', () => {
      it('yyyy 인 string을 반환한다.', () => {
        const testData = date.getFromFormat(DATE, 'yyyy');

        expect(testData).toBe('2021');
      })
    })

    context('Date 객체와 format(yyyy-mm)을 보내면', () => {
      it('yyyy-mm 인 string을 반환한다.', () => {
        const testData = date.getFromFormat(DATE, 'yyyy-mm');

        expect(testData).toBe('2021-05')
      })
    })

    context('Date 객체와 format(yyyy-mm-dd)을 보내면', () => {
      it('yyyy-mm-dd 인 string을 반환한다.', () => {
        const testData = date.getFromFormat(DATE, 'yyyy-mm-dd');

        expect(testData).toBe('2021-05-22')
      })
    })
  })
})
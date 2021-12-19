import { time } from '.';
import moment from 'moment';

describe('[time 관련 유틸 함수 테스트]', () => {
  // 테스트 데이터
  const hourMinuteCase1 = '11:00';
  const hourMinuteCase2 = '12:00';
  const hourMinuteSecondCase1 = '11:00:00';
  const hourMinuteSecondCase2 = '12:00:00';
  const momentCase1 = moment('2021-04-22 11:00', 'YYYY-MM-DD HH:mm');
  const momentCase2 = moment('2021-04-22 12:00', 'YYYY-MM-DD HH:mm');
  const momentCase3 = moment('11:00:00', 'HH:mm:ss');
  const momentCase4 = moment('12:00:00', 'HH:mm:ss');
  const dateCase1 = new Date(2021, 4, 22, 11, 0, 0);
  const dateCase2 = new Date(2021, 4, 22, 12, 0, 0);
  
  describe('getTimeDiffAsMinutes 메소드는', () => {
    context('(HH:mm) 시작 <= 끝이면', () => {
      it('0 || +분을 반환한다.', () => {
        const testData1 = time.getTimeDiffAsMinutes(hourMinuteCase1, hourMinuteCase2);
        const testData2 = time.getTimeDiffAsMinutes(hourMinuteCase2, hourMinuteCase2);
        
        expect(testData1).toBe(60);
        expect(testData2).toBe(0);
      })
    })

    context('(HH:mm) 시작 > 끝이면', () => {
      it('-분을 반환한다.', () => {
        const testData1 = time.getTimeDiffAsMinutes(hourMinuteCase2, hourMinuteCase1);

        expect(testData1).toBe(-60);
      })
    })

    context('(HH:mm:ss) 시작 <= 끝이면', () => {
      it('0 || +분을 반환한다.', () => {
        const testData1 = time.getTimeDiffAsMinutes(hourMinuteSecondCase1, hourMinuteSecondCase2);
        const testData2 = time.getTimeDiffAsMinutes(hourMinuteSecondCase2, hourMinuteSecondCase2);

        expect(testData1).toBe(60);
        expect(testData2).toBe(0);
      })
    })

    context('(HH:mm:ss) 시작 > 끝이면', () => {
      it('-분을 반환한다.', () => {
        const testData1 = time.getTimeDiffAsMinutes(hourMinuteSecondCase2, hourMinuteSecondCase1);

        expect(testData1).toBe(-60);
      })
    })

    context('(Moment객체) 시작 <= 끝이면', () => {
      it('0 || +분을 반환한다.', () => {
        const testData1 = time.getTimeDiffAsMinutes(momentCase1, momentCase2);
        const testData2 = time.getTimeDiffAsMinutes(momentCase2, momentCase2);
        
        expect(testData1).toBe(60);
        expect(testData2).toBe(0);
      })
    })

    context('(Moment객체) 시작 > 끝이면', () => {
      it('-분을 반환한다.', () => {
        const testData1 = time.getTimeDiffAsMinutes(momentCase2, momentCase1);

        expect(testData1).toBe(-60);
      })
    })

    context('(Date객체) 시작 <= 끝이면', () => {
      it('0 || +분을 반환한다.', () => {
        const testData1 = time.getTimeDiffAsMinutes(dateCase1, dateCase2);
        const testData2 = time.getTimeDiffAsMinutes(dateCase2, dateCase2);

        expect(testData1).toBe(60);
        expect(testData2).toBe(0);
      })
    })

    context('(Date객체) 시작 > 끝이면', () => {
      it('-분을 반환한다.', () => {
        const testData1 = time.getTimeDiffAsMinutes(dateCase2, dateCase1);

        expect(testData1).toBe(-60);
      })
    })
  })


  describe('getTimeDiff 메소드는', () => {
    context('입력이 string, moment, date의 경우라면', () => {
      it('두 입력의 차이인 moment.Duration 객체를 반환한다.', () => {

        // 시작 < 끝
        const testData1 = time.getTimeDiff(hourMinuteCase1, hourMinuteCase2);
        const testData2 = time.getTimeDiff(hourMinuteSecondCase1, hourMinuteSecondCase2);
        const testData3 = time.getTimeDiff(momentCase1, momentCase2)
        const testData4 = time.getTimeDiff(momentCase3, momentCase4);
        const testData5 = time.getTimeDiff(dateCase1, dateCase2);
        
        const plusExpected = [3600, 60, 1];
        expect([testData1.asSeconds(), testData1.asMinutes(), testData1.asHours()]).toEqual(expect.arrayContaining(plusExpected));
        expect([testData2.asSeconds(), testData2.asMinutes(), testData2.asHours()]).toEqual(expect.arrayContaining(plusExpected));
        expect([testData3.asSeconds(), testData3.asMinutes(), testData3.asHours()]).toEqual(expect.arrayContaining(plusExpected));
        expect([testData4.asSeconds(), testData4.asMinutes(), testData4.asHours()]).toEqual(expect.arrayContaining(plusExpected));
        expect([testData5.asSeconds(), testData5.asMinutes(), testData5.asHours()]).toEqual(expect.arrayContaining(plusExpected));
        
        // 시작 > 끝
        const testData6 = time.getTimeDiff(hourMinuteCase2, hourMinuteCase1);
        const testData7 = time.getTimeDiff(hourMinuteSecondCase2, hourMinuteSecondCase1);
        const testData8 = time.getTimeDiff(momentCase2, momentCase1);
        const testData9 = time.getTimeDiff(momentCase4, momentCase3);
        const testData10 = time.getTimeDiff(dateCase2, dateCase1);

        const minusExpected = [-3600, -60, -1];
        expect([testData6.asSeconds(), testData6.asMinutes(), testData6.asHours()]).toEqual(expect.arrayContaining(minusExpected));
        expect([testData7.asSeconds(), testData7.asMinutes(), testData7.asHours()]).toEqual(expect.arrayContaining(minusExpected));
        expect([testData8.asSeconds(), testData8.asMinutes(), testData8.asHours()]).toEqual(expect.arrayContaining(minusExpected));
        expect([testData9.asSeconds(), testData9.asMinutes(), testData9.asHours()]).toEqual(expect.arrayContaining(minusExpected));
        expect([testData10.asSeconds(), testData10.asMinutes(), testData10.asHours()]).toEqual(expect.arrayContaining(minusExpected));

        // 시작 = 끝
        const testData11 = time.getTimeDiff(hourMinuteCase2, hourMinuteCase2);
        const testData12 = time.getTimeDiff(hourMinuteSecondCase2, hourMinuteSecondCase2);
        const testData13 = time.getTimeDiff(momentCase2, momentCase2);
        const testData14 = time.getTimeDiff(momentCase4, momentCase4);
        const testData15 = time.getTimeDiff(dateCase2, dateCase2);

        const zeroExpected = [0, 0, 0];
        expect([testData11.asSeconds(), testData11.asMinutes(), testData11.asHours()]).toEqual(expect.arrayContaining(zeroExpected));
        expect([testData12.asSeconds(), testData12.asMinutes(), testData12.asHours()]).toEqual(expect.arrayContaining(zeroExpected));
        expect([testData13.asSeconds(), testData13.asMinutes(), testData13.asHours()]).toEqual(expect.arrayContaining(zeroExpected));
        expect([testData14.asSeconds(), testData14.asMinutes(), testData14.asHours()]).toEqual(expect.arrayContaining(zeroExpected));
        expect([testData15.asSeconds(), testData15.asMinutes(), testData15.asHours()]).toEqual(expect.arrayContaining(zeroExpected));
      })
    })
  })
})
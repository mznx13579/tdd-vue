import { number } from '.';

describe('[number 관련 유틸 함수 테스트]', () => {
  describe('commaize 메소드는', () => {
    context('콤마가 없는 number type의 자연수 값이 들어오면', () => {
      it('세 자리 간격으로 콤마가 찍힌 string 값을 반환한다.', () => {
        const testData1 = number.commaize(123);
        expect(testData1).toBe('123');

        const testData2 = number.commaize(1234);
        expect(testData2).toBe('1,234');

        const testData3 = number.commaize(12345678);
        expect(testData3).toBe('12,345,678');

        const testData4 = number.commaize(1234567890);
        expect(testData4).toBe('1,234,567,890');

        const testData5 = number.commaize(0);
        expect(testData5).toBe('0');

        const testData6 = number.commaize(-123);
        expect(testData6).toBe('-123');

        const testData7 = number.commaize(-1234);
        expect(testData7).toBe('-1,234');

        const testData8 = number.commaize(-12345678);
        expect(testData8).toBe('-12,345,678');

        const testData9 = number.commaize(-1234567890);
        expect(testData9).toBe('-1,234,567,890');
      });
    });

    context('콤마가 없는 string type의 자연수 값이 들어오면', () => {
      it('세 자리 간격으로 콤마가 찍힌 string 값을 반환한다.', () => {
        const testData1 = number.commaize('123');
        expect(testData1).toBe('123');

        const testData2 = number.commaize('1234');
        expect(testData2).toBe('1,234');

        const testData3 = number.commaize('12345678');
        expect(testData3).toBe('12,345,678');

        const testData4 = number.commaize('1234567890');
        expect(testData4).toBe('1,234,567,890');

        const testData5 = number.commaize('0');
        expect(testData5).toBe('0');

        const testData6 = number.commaize('-123');
        expect(testData6).toBe('-123');

        const testData7 = number.commaize('-1234');
        expect(testData7).toBe('-1,234');

        const testData8 = number.commaize('-12345678');
        expect(testData8).toBe('-12,345,678');

        const testData9 = number.commaize('-1234567890');
        expect(testData9).toBe('-1,234,567,890');
      });
    });

    context('콤마가 없는 number type의 소수 값이 들어오면', () => {
      it('세 자리 간격으로 콤마가 찍힌 string 값을 반환한다.', () => {
        const testData1 = number.commaize(123.45678);
        expect(testData1).toBe('123.45678');

        const testData2 = number.commaize(1234.567);
        expect(testData2).toBe('1,234.567');

        const testData3 = number.commaize(0.0032);
        expect(testData3).toBe('0.0032');

        const testData4 = number.commaize(-123.45678);
        expect(testData4).toBe('-123.45678');

        const testData5 = number.commaize(-1234.567);
        expect(testData5).toBe('-1,234.567');

        const testData6 = number.commaize(-0.0032);
        expect(testData6).toBe('-0.0032');
      });
    });

    context('콤마가 없는 string type의 소수 값이 들어오면', () => {
      it('세 자리 간격으로 콤마가 찍힌 string 값을 반환한다.', () => {
        const testData1 = number.commaize('123.45678');
        expect(testData1).toBe('123.45678');

        const testData2 = number.commaize('1234.567');
        expect(testData2).toBe('1,234.567');

        const testData3 = number.commaize('0.0032');
        expect(testData3).toBe('0.0032');

        const testData4 = number.commaize('-123.45678');
        expect(testData4).toBe('-123.45678');

        const testData5 = number.commaize('-1234.567');
        expect(testData5).toBe('-1,234.567');

        const testData6 = number.commaize('-0.0032');
        expect(testData6).toBe('-0.0032');

        const testData7 = number.commaize('0.000');
        expect(testData7).toBe('0.000');

        const testData8 = number.commaize('-23456.2300');
        expect(testData8).toBe('-23,456.2300');
      });
    });

    context('숫자 형태가 아닌 다른 string이 섞인 값이 들어오면', () => {
      it('세 자리 간격으로 콤마가 찍힌 string 값을 반환한다.', () => {
        const testData1 = number.commaize('1000000원');
        expect(testData1).toBe('1,000,000');

        const testData2 = number.commaize('42612.2953km');
        expect(testData2).toBe('42,612.2953');

        const testData3 = number.commaize('42612.2953km');
        expect(testData3).toBe('42,612.2953');

        const testData4 = number.commaize('-16.5도');
        expect(testData4).toBe('-16.5');
      });
    });

    context('콤마가 이상하게 표기된 string 형태의 숫자 값이 들어와도', () => {
      it('올바른 콤마 형태의 string type의 숫자 값을 반환한다.', () => {
        const testData1 = number.commaize('12,34');
        expect(testData1).toBe('1,234');

        const testData2 = number.commaize('-1,2,3,45678');
        expect(testData2).toBe('-12,345,678');
      })
    })
  });

  describe('unCommaize 메소드는', () => {
    context('콤마가 포함된 string type의 숫자 값이 들어오면', () => {
      it('콤마를 모두 지운 string type의 값을 반환한다.', () => {
        const testData1 = number.unCommaize('123,456');
        expect(testData1).toBe('123456');

        const testData2 = number.unCommaize('1,234,567,890');
        expect(testData2).toBe('1234567890');

        const testData3 = number.unCommaize('-123,456');
        expect(testData3).toBe('-123456');

        const testData4 = number.unCommaize('-1,234,567,890');
        expect(testData4).toBe('-1234567890');

        const testData5 = number.unCommaize('0');
        expect(testData5).toBe('0');

        const testData6 = number.unCommaize('0.000');
        expect(testData6).toBe('0.000');

        const testData7 = number.unCommaize('7,890.1230');
        expect(testData7).toBe('7890.1230');

        const testData8 = number.unCommaize('-7,890.1230');
        expect(testData8).toBe('-7890.1230');
      });
    });
  });

  describe('extractNumber 메소드는', () => {
    context('숫자, 마이너스 부호, 소수점 표시를 제외한 나머지 값들이 섞여있으면', () => {
      it('모두 제거하여 string type의 온전한 숫자 형태를 반환한다.', () => {
        const testData1 = number.extractNumber('123.4567[points]');
        expect(testData1).toBe('123.4567');

        const testData2 = number.extractNumber('총 금액: 102,938,452[원]');
        expect(testData2).toBe('102938452');

        const testData3 = number.extractNumber('-10.2%');
        expect(testData3).toBe('-10.2');
      });
    });
  });

  describe('roundOffNumber 메소드는', () => {
    context('number type의 숫자 데이터와 반올림할 자릿수를 인자로 넘기면', () => {
      it('지정된 자리수까지 반올림된 string type의 값이 반환된다.', () => {
        const testData1 = number.roundOffNumber(12345.678, 2);
        expect(testData1).toBe('12345.68');

        const testData2 = number.roundOffNumber(12345, 2);
        expect(testData2).toBe('12345.00');

        const testData3 = number.roundOffNumber(0, 2);
        expect(testData3).toBe('0.00');

        const testData4 = number.roundOffNumber(-12345.678, 2);
        expect(testData4).toBe('-12345.68');

        const testData5 = number.roundOffNumber(-12345, 2);
        expect(testData5).toBe('-12345.00');
      });
    });
    
    context('반올림할 자릿수를 넘기지 않으면', () => {
      it('자연수 부분까지 반올림된 string type의 값이 반환된다.', () => {
        const testData1 = number.roundOffNumber(-12345.6789);
        expect(testData1).toBe('-12346');

        const testData2 = number.roundOffNumber(12345.6789);
        expect(testData2).toBe('12346');
      })
    })
    
    context('반올림하려는 자릿수의 값이 0 이상 100 이하의 범위에 속하지 않으면', () => {
      it('RangeError를 반환한다.', () => {
        const testData1 = () => number.roundOffNumber(123.456, -1);
        expect(testData1).toThrowError(RangeError);
    
        const testData2 = () => number.roundOffNumber(123.456, 101);
        expect(testData2).toThrowError(RangeError);
      })
    })
  });

  describe('padDecimalZero 메소드는', () => {
    context('첫 번째 인자 값의 소수점 자리수가 두 번째 인자의 표시할 소수점 자리수 값보다 작으면', () => {
      it('지정된 자리수까지 채워진 string type의 값이 반환된다.', () => {
        const testData1 = number.padDecimalZero(123.456, 5);
        expect(testData1).toBe('123.45600');

        const testData2 = number.padDecimalZero(-123.456, 5);
        expect(testData2).toBe('-123.45600');

        const testData3 = number.padDecimalZero(0, 3);
        expect(testData3).toBe('0.000');

        const testData4 = number.padDecimalZero(0.02, 3);
        expect(testData4).toBe('0.020');

        const testData5 = number.padDecimalZero(789789, 3);
        expect(testData5).toBe('789789.000');
      });
    });

    context('두 번째 인자 값을 지정하지 않으면', () => {
      it('첫 번째 인자 값의 string type의 자연수 부분의 값만 반환한다.', () => {
        const testData1 = number.padDecimalZero(123.456);
        expect(testData1).toBe('123');

        const testData2 = number.padDecimalZero(-123.456);
        expect(testData2).toBe('-123');

        const testData3 = number.padDecimalZero(0);
        expect(testData3).toBe('0');
      });
    });

    context('첫 번째 인자 값의 소수점 자리수가 두 번째 인자의 표시할 소수점 자리수 값보다 크거나 같으면', () => {
      it('string으로 변환된 첫 번째 인자 값이 그대로 출력된다.', () => {
        const testData1 = number.padDecimalZero(123.456, 1);
        expect(testData1).toBe('123.456');

        const testData2 = number.padDecimalZero(-123.456, 1);
        expect(testData2).toBe('-123.456');

        const testData3 = number.padDecimalZero(-123.456, 3);
        expect(testData3).toBe('-123.456');

        const testData4 = number.padDecimalZero(0, 0);
        expect(testData4).toBe('0');
      });
    });

    context('두 번째 인자 값이 0 미만의 값이면', () => {
      it('RangeError를 반환한다.', () => {
        const testData1 = () => number.padDecimalZero(123.456, -1);
        expect(testData1).toThrowError(RangeError);

        const testData2 = () => number.padDecimalZero(-123.456, -2);
        expect(testData2).toThrowError(RangeError);
      });
    });
  });
});
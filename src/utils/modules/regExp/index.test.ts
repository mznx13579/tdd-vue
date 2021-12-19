import { regExp } from '.';

const regExpCollection = regExp.regExp;

describe('[regExp 관련 유틸 함수 테스트]', () => {
  describe('정규 표현식 유효성 검증', () => {
    it('이메일', () => {
      const emailReg = new RegExp(regExpCollection.email);

      const testData1 = 'abc@abc.com'.match(emailReg);
      const testData2 = 'hiworks_admin1234@hiworks.co.kr'.match(emailReg);
      const testData3 = 'hello-hello@raw.company'.match(emailReg);
      const testData4 = '12345@abc.ko'.match(emailReg);
      const testData5 = 'korea@a.c'.match(emailReg);

      expect(testData1).not.toBeNull();
      expect(testData2).not.toBeNull();
      expect(testData3).not.toBeNull();
      expect(testData4).not.toBeNull();
      expect(testData5).toBeNull();
    })

    it('휴대폰', () => {
      const phoneReg = new RegExp(regExpCollection.phone);

      const testData1 = '010-1234-5678'.match(phoneReg);
      const testData2 = '011-123-4567'.match(phoneReg);
      const testData3 = '02-234-5678'.match(phoneReg);
      const testData4 = '070-7089-1095'.match(phoneReg);
      const testData5 = '82-10-1234-5678'.match(phoneReg);
      const testData6 = '6948-3777'.match(phoneReg);
      const testData7 = '-1234'.match(phoneReg);
      const testData8 = '010-'.match(phoneReg);
      const testData9 = '-'.match(phoneReg);

      expect(testData1).not.toBeNull();
      expect(testData2).not.toBeNull();
      expect(testData3).not.toBeNull();
      expect(testData4).not.toBeNull();
      expect(testData5).not.toBeNull();
      expect(testData6).not.toBeNull();
      expect(testData7).toBeNull();
      expect(testData8).toBeNull();
      expect(testData9).toBeNull();
    })

    it('도메인', () => {
      const domainReg = new RegExp(regExpCollection.domain);

      const testData1 = 'https://www.hiworks.com'.match(domainReg);
      const testData2 = 'http://www.hiworks.com'.match(domainReg);
      const testData3 = 'www.hiworks.com'.match(domainReg);
      const testData4 = 'hiworks.com'.match(domainReg);
      const testData5 = 'helloworld.shop'.match(domainReg);
      const testData6 = 'msit.go.kr'.match(domainReg);
      const testData7 = '12-34a5.a.com'.match(domainReg);
      const testData8 = 'hiworks'.match(domainReg);
      const testData9 = 'hiworks.'.match(domainReg);

      expect(testData1).not.toBeNull();
      expect(testData2).not.toBeNull();
      expect(testData3).not.toBeNull();
      expect(testData4).not.toBeNull();
      expect(testData5).not.toBeNull();
      expect(testData6).not.toBeNull();
      expect(testData7).not.toBeNull();
      expect(testData8).toBeNull();
      expect(testData9).toBeNull();
    })

    it('IP 주소', () => {
      const ipReg = new RegExp(regExpCollection.ip);

      const testData1 = '121.234.142.62'.match(ipReg);
      const testData2 = '25.3.5.64'.match(ipReg);
      const testData3 = '8.8.8.8'.match(ipReg);
      const testData4 = '0.0.0.0'.match(ipReg);
      const testData5 = '255.255.255.255'.match(ipReg);
      const testData6 = '255.255.255.256'.match(ipReg);
      const testData7 = '255.255.255'.match(ipReg);

      expect(testData1).not.toBeNull();
      expect(testData2).not.toBeNull();
      expect(testData3).not.toBeNull();
      expect(testData4).not.toBeNull();
      expect(testData5).not.toBeNull();
      expect(testData6).toBeNull();
      expect(testData7).toBeNull();
    })
  })

  describe('특수문자 이스케이프 처리 정규표현식 유효성 검증', () => {
    it('특수문자가 포함되어 있는 경우 올바르게 검출하는지 확인', () => {
      const dummyData = [
        {
          id: 1,
          address: '하이웍스 <hi-hi@hiworks.com>',
        },
        {
          id: 2,
          address: '!@#$%^&*[)(] <test@test.com>',
        },
      ];

      const generateSpecialReg = (target: string) => regExp.specialCharEscape(target);

      const testReg1 = generateSpecialReg('하이웍스 <hi-hi@hiworks.com>');
      const testReg2 = generateSpecialReg('!@#$%^&*[)(] <test@test.com>');

      const testData1 = dummyData.filter(data => data.address.match(testReg1));
      const testData2 = dummyData.filter(data => data.address.match(testReg2));

      expect(testData1).toHaveLength(1);
      expect(testData2).toHaveLength(1);
    })
  })
})
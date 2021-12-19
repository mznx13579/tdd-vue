import { text } from '.';

describe('[text 관련 유틸 함수 테스트]', () => {
  const text1 = 'apple';
  const text2 = 'watermelon';
  const text3 = '';

  describe('텍스트 말줄임표 로직', () => {
    it('일반적인 경우', () => {
      const maxLength = 8;
      const testData1 = text.textEllipsis(text1, maxLength);
      const testData2 = text.textEllipsis(text2, maxLength);
    
      expect(testData1).toBe('apple');
      expect(testData2).toBe('watermel...');
    })

    it('특수한 경우', () => {
      const testData1 = text.textEllipsis(text3, 2);
      const testData2 = text.textEllipsis(text3, -1);

      expect(testData1).toBe('');
      expect(testData2).toBe('');
    })
  })

  describe('텍스트 뒤집는 로직', () => {
    it('일반적인 경우', () => {
      const testData1 = text.reversedString(text1);
      const testData2 = text.reversedString(text2);
    
      expect(testData1).toBe('elppa');
      expect(testData2).toBe('nolemretaw');
    })

    it('특수한 경우', () => {
      const testData = text.reversedString(text3);

      expect(testData).toBe('');
    })
  })

  describe('첫 글자 대문자 처리 로직', () => {
    it('일반적인 경우', () => {
      const testData1 = text.capitalize(text1);
      const testData2 = text.capitalize(text2);
    
      expect(testData1).toBe('Apple');
      expect(testData2).toBe('Watermelon');
    })

    it('특수한 경우', () => {
      const testData1 = text.capitalize(text3);
      const testData2 = text.capitalize('h');
      const testData3 = text.capitalize('12345abc');
    
      expect(testData1).toBe('');
      expect(testData2).toBe('H');
      expect(testData3).toBe('12345abc');
    })
  })
})
import { file } from '.';

describe('[file 관련 유틸 함수 테스트]', () => {
  // 테스트를 위한 데이터
  const fileSize1 = 123;
  const fileSize2 = 123456;
  const fileSize3 = 495832535;
  const fileSize4 = 12345678901;
  const fileSize5 = 123456789012345;
  
  describe('용량 변환 로직', () => {
    it('일반적인 경우', () => {

      const testData1 = file.convertFileSize(fileSize1, 2);
      const testData2 = file.convertFileSize(fileSize2, 2);

      expect(testData1).toBe('0.12 KB');
      expect(testData2).toBe('120.56 KB');

      const testData3 = file.convertFileSize(fileSize3, 2);
      const testData4 = file.convertFileSize(fileSize4, 2);

      expect(testData3).toBe('472.86 MB');
      expect(testData4).toBe('11.50 GB');

      const testData5 = file.convertFileSize(fileSize5, 2);
      const testData6 = file.convertFileSize(fileSize5, 1);
      
      expect(testData5).toBe('112.28 TB');
      expect(testData6).toBe('112.3 TB');
    })

    it('특수한 경우', () => {
      const testData1 = file.convertFileSize(0, 2);
      const testData2 = file.convertFileSize(0, 0);
      const testData3 = file.convertFileSize(-2, 1);

      expect(testData1).toBe('0.00 KB');
      expect(testData2).toBe('0 KB');
      expect(testData3).toBe('0.0 KB');
    })
  })

  describe('기준 용량 이상 및 초과 로직', () => {
    it('용량 이상 확인', () => {
      const testData1 = file.checkOverFileSize(fileSize1, 100, 'Byte');
      const testData2 = file.checkOverFileSize(fileSize1, 200, 'Byte');
      
      expect(testData1).toBe(true);
      expect(testData2).toBe(false);

      const testData3 = file.checkOverFileSize(fileSize2, 100, 'KB');
      const testData4 = file.checkOverFileSize(fileSize2, 200, 'KB');

      expect(testData3).toBe(true);
      expect(testData4).toBe(false);

      const testData5 = file.checkOverFileSize(fileSize3, 472, 'MB');
      const testData6 = file.checkOverFileSize(fileSize3, 473, 'MB');

      expect(testData5).toBe(true);
      expect(testData6).toBe(false);

      const testData7 = file.checkOverFileSize(fileSize4, 11.4, 'GB');
      const testData8 = file.checkOverFileSize(fileSize4, 11.51, 'GB');

      expect(testData7).toBe(true);
      expect(testData8).toBe(false);

      const testData9 = file.checkOverFileSize(fileSize5, 112.2, 'TB');
      const testData10 = file.checkOverFileSize(fileSize5, 112.29, 'TB');

      expect(testData9).toBe(true);
      expect(testData10).toBe(false);
    })

    it('용량 초과 확인', () => {
      const testData = file.checkOverFileSize(10485760, 10, 'MB', false);
    
      expect(testData).toBe(false);
    })
  })

  describe('파일 확장자 추출 로직', () => {
    it('일반적인 경우', () => {
      const testData1 = file.getFileIcon('desktop.png');
      const testData2 = file.getFileIcon('Postman-osx-8.0.7.zip');
    
      expect(testData1).toBe('png');
      expect(testData2).toBe('zip');
    })

    it('특수한 경우', () => {
      const testData = file.getFileIcon('dummydata');

      expect(testData).toBe('etc');
    })
  })
})
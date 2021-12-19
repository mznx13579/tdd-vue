type FileUnit = 'Byte' | 'KB' | 'MB' | 'GB' | 'TB';

const file = {
  //! 용량 변환
  //* ex) convertFileSize(495832535, 2) => "472.86 MB"
  //* ex) convertFileSize(495832535, 1) => "472.9 MB"
  //* ex) convertFileSize(0, 2) => "0.00 KB"
  //* ex) convertFileSize(0, 0) => "0 KB"
  convertFileSize(size: number, underDecimalPointNumberCount = 0) {
    //* [prechecker-utils] 0 값일 때 소수점 아래로 0을 몇 개 생성할 것인지 결정하는 prechecker용 유틸 로직
    const digit = underDecimalPointNumberCount < 0 ? 0 : underDecimalPointNumberCount;
    const underDecimalPointZeros = (digit === 0 ? '' : '.') + '0'.repeat(digit);

    //* [prechecker-1] 변환하기 전 값이 null이나 undefined로 들어오는 경우
    if (size === null || size === undefined) {
      return `0${underDecimalPointZeros} KB`;
    }
    //* [prechecker-2] parseFloat으로 type 변환 했음에도 불구하고 숫자 형태가 아닌 경우
    if (isNaN(size)) {
      return `0${underDecimalPointZeros} KB`;
    }
    //* [prechecker-3] 파일 용량이 음수인 경우는 없으므로 만에 하나 음수값이 넘어오면 0으로 고정
    if (size < 0) {
      return `0${underDecimalPointZeros} KB`;
    }

    //* 실제 용량 변환 계산 로직
    if (size < Math.pow(1024, 2)) {
      return `${(size / 1024).toFixed(digit)} KB`;
    } else if (Math.pow(1024, 2) <= size && size < Math.pow(1024, 3)) {
      return `${(size / Math.pow(1024, 2)).toFixed(digit)} MB`;
    } else if (Math.pow(1024, 3) <= size && size < Math.pow(1024, 4)) {
      return `${(size / Math.pow(1024, 3)).toFixed(digit)} GB`;
    } else {
      return `${(size / Math.pow(1024, 4)).toFixed(digit)} TB`;
    }
  },

  //! 기준 용량 이상(네 번째 인자 작성 안해도 무방) 또는 초과(네 번째 인자로 false를 반드시 넘겨줘야 함)인지 확인하는 로직
  //* ex1) checkOverFileSize(495832535, 400, 'MB') => true
  //* ex2) checkOverFileSize(495832535, 500, 'MB') => false
  //* ex3) checkOverFileSize(10485760, 10, 'MB') => true
  //* ex4) checkOverFileSize(10485760, 10, 'MB', false) => false
  checkOverFileSize(fileSize: number, criteriaFileSize: number, unit: FileUnit, equalFlag = true) {
    let squareNum = 0;
    if (unit === 'Byte') {
      squareNum = 0;
    } else if (unit === 'KB') {
      squareNum = 1;
    } else if (unit === 'MB') {
      squareNum = 2;
    } else if (unit === 'GB') {
      squareNum = 3;
    } else if (unit === 'TB') {
      squareNum = 4;
    }
    const diffFileSize = fileSize - criteriaFileSize * Math.pow(1024, squareNum);
    return equalFlag ? diffFileSize >= 0 : diffFileSize > 0;
  },

  //! 파일명에서 파일 확장자만 추출
  getFileIcon(fileName: string) {
    const extensions = ['ai', 'asf', 'avi', 'bin', 'bmp', 'csv', 'doc', 'docx', 'eps', 'exe', 'fla', 'flv', 'gif', 'html', 'htm', 'hwp', 'iso', 'jpeg', 'rtf', 'swf', 'txt', 'xls', 'jpg', 'mov', 'mp3', 'mp4', 'pdf', 'png', 'ppt', 'pptx', 'psd', 'rar', 'xlsx', 'zip'];
    const splitFileName = fileName.split('.');
    const extractedExtensionName = splitFileName[splitFileName.length - 1].toLowerCase();
    return extensions.indexOf(extractedExtensionName) !== -1 ? extractedExtensionName : 'etc';
  },
};

export { file };

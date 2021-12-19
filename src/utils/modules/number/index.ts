const number = {
  //* 콤마 찍는 함수(ex. 1234567(number 또는 string 형태) => 1,234,567)
  commaize(value: number | string): string {
    const stringizedPureNumber = this.extractNumber(String(value));

    const [ naturalNumber, decimal ] = stringizedPureNumber.split('.');

    const commaizedNaturalNumber = naturalNumber.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

    const decimalPart = decimal ? `.${decimal}` : '';

    return `${commaizedNaturalNumber}${decimalPart}`;
  },

  //* 콤마만 제거하는 함수
  unCommaize(value: string): string {
    return value.replace(/,/g, '');
  },

  //* 숫자 형태의 값만 추출하는 함수(ex. '42.195km' => '42.195')
  //* (숫자, 마이너스 부호, 소수점 표시를 위한 온점을 제외한 나머지는 모두 제거하는 방식으로 구성)
  extractNumber(value: string): string {
    let isNegativeValue = false; // 음수인 경우 정규 표현식 거친 후 맨 앞에 마이너스 부호 다시 붙여주기 위한 플래그 값

    if (value.length >= 1 && value[0] === '-') {
      value = value.slice(1);
      isNegativeValue = true;
    }

    const filteredNumber = String(value).replace(/[^.0-9]/g, '');

    const showNegativeSign = isNegativeValue ? '-' : '';

    return `${showNegativeSign}${filteredNumber}`;
  },

  //* 반올림하여 소수점 몇째 자리까지 표시할지 결정하는 함수
  //! (주의) Number.prototype.toFixed()의 파라미터는 0 부터 100 까지만 올 수 있기 때문에 이 점 유의하시기 바랍니다.
  roundOffNumber(value: number, roundOffIndex = 0): string {
    if (roundOffIndex < 0 || roundOffIndex > 100) {
      throw new RangeError('roundOffNumber 메소드의 두 번째 파라미터는 0 이상 100 이하의 숫자만 가능합니다.');
    }

    return value.toFixed(roundOffIndex);
  },

  //* 최대 소수점 몇째 자리까지 표시할지 결정하는 함수
  //* (만약 파라미터로 들어온 값의 소수점 자리수가 더 짧으면 나머지는 0으로 채워짐)
  padDecimalZero(value: number, maxDecimalLength = 0): string {
    if (maxDecimalLength < 0) {
      throw new RangeError('padDecimalZero 메소드의 두 번째 파라미터는 0 이상의 숫자만 가능합니다.');
    }

    //* 소수점(.) 기준으로 split하여 앞 부분은 자연수, 뒷 부분은 소수 영역으로 고려
    const [ naturalNumber, decimal ] = String(value).split('.');

    //* 소수 영역 만드는 로직
    const generateDecimalPart = (decimal: string | undefined): string => {
      // padDecimalZero의 첫 번째 인자로 자연수 값이 들어올 수 있기 때문에 소수가 없어 undefined인 경우
      // 추후 String.prototype.padEnd() 메소드를 원활하게 사용하기 위해 empty string으로 설정
      const stringizedDecimal = decimal || '';

      return `.${stringizedDecimal.padEnd(maxDecimalLength, '0')}`;
    }

    //* maxDecimalLength가 0인 경우 소수점을 표시할 필요가 없으므로 소수 영역은 empty string으로 설정
    const decimalNumber = !!maxDecimalLength ? generateDecimalPart(decimal) : '';

    return `${naturalNumber}${decimalNumber}`
  }
};

export { number };

const text = {
  //! 최대 몇 글자까지 표시하고 그 이후는 말줄임표로 표시하는 함수
  //* ex) textEllipsis('abcdefgh', 7) => "abcdefg..."
  //* ex) textEllipsis('abcdefgh', 8) => "abcdefgh"
  textEllipsis(text: string, maxRange: number) {
    // 텍스트 길이가 음수는 될 수 없기 때문에 음수값으로 들어온 경우 0으로 고정
    if (maxRange < 0) {
      maxRange = 0;
    }
    return text.length <= maxRange ? text : `${text.slice(0, maxRange)}...`;
  },

  //! 글자 뒤집기
  //* ex) reversedString('abcdefgh') => "hgfedcba"
  reversedString(text: string) {
    return text
      .split('')
      .reverse()
      .join('');
  },

  //! 첫 번째 문자만 대문자로 변환
  //* ex) capitalize('abcdefgh') => "Abcdefgh"
  capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
};

export { text };

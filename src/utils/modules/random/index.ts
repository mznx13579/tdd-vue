const random = {
  CHARACTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',

  //! 랜덤 숫자
  getRandomID(): number {
    return Math.floor(Math.random() * 100000);
  },

  //! 랜덤한 string 만들어주는 로직(기본 길이는 6)
  getRandomKey(length: number = 6): string {
    let result = '';

    for (let i = 0; i < length; i++) {
      result += this.getRandomCharacter();
    }

    return result;
  },

  getRandomCharacter(): string {
    return this.CHARACTERS.charAt(Math.floor(Math.random() * this.CHARACTERS.length));
  }
};

export { random };

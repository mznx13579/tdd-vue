import { random } from '.';

describe('[random 관련 유틸 함수 테스트]', () => {
  describe('getRandomID', () => {
    context('메서드를 실행하면', () => {
      it('랜덤 숫자는 0 ~ 100000 의 범위를 가진다', () => {
        const result = random.getRandomID();

        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(100000);
      });
    });
  });

  describe('getRandomKey', () => {
    context('파라미터 값 length를 10으로 하면', () => {
      it('10글자로 된 랜덤 문자열이 만들어진다', () => {
        const result = random.getRandomKey(10);

        expect(result.length).toBe(10);
      });
    });

    context('파라미터 값이 없을 경우', () => {
      it('6글자로 된 랜덤 문자열이 만들어진다', () => {
        const result = random.getRandomKey();

        expect(result.length).toBe(6);
      });

      it('random.characters 문자 안에서만 랜덤 문자열이 만들어진다', () => {
        const result = random.getRandomKey();

        const hasOtherCharacters = result.split('').reduce((acc, character) => {
          if (!~result.indexOf(character)) acc = true;

          return acc;
        }, false);

        expect(hasOtherCharacters).toBeFalsy();
      });
    });
  });

  describe('getRandomCharacter', () => {
    context('메서드를 실행하면', () => {
      it('랜덤 문자를 반환한다', () => {
        const result = random.getRandomCharacter();

        expect(result.length).toBe(1);
      });

      it('주어진 범위 내에서 랜덤 문자를 반환한다', () => {
        const tempCharacters = random.CHARACTERS;

        random.CHARACTERS = 'a';

        const result = random.getRandomCharacter();

        expect(result).toBe('a');

        random.CHARACTERS = tempCharacters;
      });
    });
  });
});

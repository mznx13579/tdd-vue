import { object } from '.';

describe('[object 관련 유틸 함수 테스트]', () => {
  describe('checkHasOwnProperty', () => {
    context('Object 의 property가 존재하면', () => {
      it('true 를 반환 한다', () => {
        const testObj = { property: 'helloworld' };
        const expectTrueResult = object.checkHasOwnProperty(testObj, 'property');

        expect(expectTrueResult).toBeTruthy();
      });
    });
    context('Object 의 property가 존재하지 않으면', () => {
      it('false를 반환 한다', () => {
        const testObj = { property: 'helloworld' };
        const expectFalseResult = object.checkHasOwnProperty(testObj, 'proto');

        expect(expectFalseResult).toBeFalsy();
      });
    });
  });

  describe('isEqual', () => {
    context('동일 객체를 넣는 다면 (주소값 일치)', () => {
      it('true를 반환한다', () => {
        const testObj = { property: 'hello' };
        const expectTrueResult = object.isEqual(testObj, testObj);

        expect(expectTrueResult).toBeTruthy();
      });
    });

    context('property는 값으나 value가 다른 경우라면', () => {
      it('false를 반환한다', () => {
        const testObj = { property: 'hello' };
        const targetObj = { property: 'hell4o' };
        const expectTrueResult = object.isEqual(testObj, targetObj);

        expect(expectTrueResult).toBeFalsy();
      });
    });

    context('값만 같은 객체를 넣는다면 (주소값은 다름)', () => {
      it('true를 반환한다', () => {
        const testObj = { property: 'hello' };
        const targetObj = { property: 'hello' };
        const expectTrueResult = object.isEqual(testObj, targetObj);

        expect(expectTrueResult).toBeTruthy();
      });
    });
  });

  describe('mergeUniqueObject', () => {
    context('값이 똑같은 객체가 하나 있는 배열을 병합한다면 ', () => {
      it('중복되지 않는 배열의 length를 반납한다.', () => {
        const testArr = [
          { id: 1, txt: 'hello' },
          { id: 2, txt: 'hello' },
          { id: 3, txt: 'hello' },
          { id: 4, txt: 'hello' },
        ];
        const targetArr = [
          { id: 1, txt: 'hello' },
          { id: 5, txt: 'hello' },
          { id: 6, txt: 'hello' },
          { id: 7, txt: 'hello' },
        ];
        const mergedArr = object.mergeUniqueObject(testArr, targetArr);

        expect(mergedArr.length).toBe(7);
      });
    });
  });
});

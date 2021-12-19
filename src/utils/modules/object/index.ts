import _ from 'lodash';

type Identifier = string | number;
type BaseObject<T = any> = { [K in Identifier]: T };

const object = {
  checkHasOwnProperty(obj: BaseObject, targetKey: Identifier) : boolean {
    return Object.prototype.hasOwnProperty.call(obj, targetKey);
  },

  //! 중복되지 않게 객체 병합
  mergeUniqueObject(baseArr: object[], tagetArr: object[]) {
    let stack = baseArr;
    _.forEach(tagetArr, function(item) {
      let unique = true;
      _.forEach(baseArr, function(t) {
        if (object.isEqual(t, item)) {
          unique = false;
        }
      });
      if (unique) {
        stack.push(item);
      }
    });
    return stack;
  },

  //! 객체 안에 찾으려는 key값이 있는지 확인
  deepCheckHasProperty(obj: BaseObject, properties: Identifier[], idx = 0): boolean {
    //* 두 번째 인자로 확인할 property 모음을 입력하지 않으면 무조건 false 반환
    if (properties === undefined) {
      return false;
    }
    //* 모두 다 검사해서 모든 property가 있는 경우 true 반환
    if (properties.length === idx) {
      return true;
    }
    if (this.checkHasOwnProperty(obj, properties[idx])) {
      return this.deepCheckHasProperty(obj[properties[idx]], properties, idx + 1);
    } else {
      return false;
    }
  },

  isEqual(x: any, y: any) :boolean {
    if (x === y) return true;
    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    if (x.constructor !== y.constructor) return false;
    for (let p in x) {
      if (!object.checkHasOwnProperty(x, p)) continue;
      if (!object.checkHasOwnProperty(y, p)) return false;
      if (x[p] === y[p]) continue;
      if (typeof x[p] !== 'object') return false;
      if (!this.isEqual(x[p], y[p])) return false;
    }
    for (let _p in y) {
      if (object.checkHasOwnProperty(y, _p) && !object.checkHasOwnProperty(x, _p)) return false;
    }
    return true;
  },
};

export { object };

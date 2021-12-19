import { AxiosResponse } from 'axios';

type Identifier = string | number;
type BaseObject<T = any> = { [K in Identifier]: T };

const api = {
  //! 응답 데이터 추출
  extractData(response: AxiosResponse) {
    return response.data;
  },

  //! axios params 객체로 넘길 object 형태의 데이터 생성
  //* 기존의 getQueryString 함수와 같이 base url 뒤에 직접 query가 포함된 주소를 붙이는 방식 대신에
  //* axios의 config 값 중 하나인 params object를 넘기는 방식을 권장함(즉, 상위 함수들은 추후 제거할 예정)
  //* ex1) getQueryParams('filter', {'keyword': 'board', 'flag': true}) => {filter[keyword]: "board", filter[flag]: true}
  //* ex2) getQueryParams('page', {'limit': 25, 'offset': 0}) => {page[limit]: 25, page[offset]: 0}
  getQueryParams(targetQuery: Identifier, responseObject: BaseObject) {
    let obj: BaseObject = {};
    for (const key in responseObject) {
      obj[`${targetQuery}[${key}]`] = responseObject[key];
    }
    return obj;
  },

  //! 이중 필터링인 경우
  //* ex1) getFilterQueryParams('filter', 'in', {'keyword': 'board,user', 'flag': true}) => {filter[in][keyword]: "board,user", filter[in][flag]: true}
  //* ex2) getFilterQueryParams('filter', 'in', {'keyword': 'board,user', 'flag': true}, true) => {filter[keyword][in]: "board,user", filter[flag][in]: true}
  getFilterQueryParams(targetQuery: Identifier, fixedKey: Identifier, responseObject: BaseObject, reverse = false) {
    let obj: BaseObject = {};
    for (const key in responseObject) {
      const detailedQueryParams = !reverse ? `[${fixedKey}][${key}]` : `[${key}][${fixedKey}]`;
      obj[`${targetQuery}${detailedQueryParams}`] = responseObject[key];
    }
    return obj;
  },
};

export { api };

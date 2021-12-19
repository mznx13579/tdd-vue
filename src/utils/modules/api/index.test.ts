import { api } from '.';
import { AxiosResponse } from 'axios';

describe('[api 관련 유틸 함수 테스트]', () => {
  
  const paramObject1 = {
    'keyword': 'board',
    'flag': true
  }

  const paramObject2 = {
    'limit': 25,
    'offset': 0
  }

  const responseObject1 = {
    'filter[keyword]': 'board',
    'filter[flag]': true
  }

  const responseObject2 = {
    'page[limit]': 25,
    'page[offset]': 0,
  }

  const notReverse = {
    'filter[in][keyword]': 'board',
    'filter[in][flag]': true,
  }
  
  const reverse = {
    'filter[keyword][in]': 'board',
    'filter[flag][in]': true,
  }

  describe('extractData 메소드는', () => {
    context('axios의 response를 넘겨주면', () => {
      it('response.data를 추출하여 반환한다.', () => {
        
        const axiosResponse = {
          data: {
            booleanData: true,
            stringData: 'string',
            numberData: 0,
            arrayData: ['t', 'e', 's', 't'],
          }
        } as AxiosResponse;
      
        const extractData = {
            booleanData: true,
            stringData: 'string',
            numberData: 0,
            arrayData: ['t', 'e', 's', 't'],
        }
        
        const testData = api.extractData(axiosResponse);

        expect(testData).toStrictEqual(extractData);
      })
    })
  })

  describe('getQueryParams 메소드는', () => {
    context('targetQuery와 responseObject를 넘겨주면', () => {
      it('queryParams를 반환한다.', () => {
        const testData1 = api.getQueryParams('filter', paramObject1);
        const testData2 = api.getQueryParams('page', paramObject2);

        expect(testData1).toStrictEqual(responseObject1);
        expect(testData2).toStrictEqual(responseObject2);
      })
    })
  })

  describe('getFilterQueryParams 메소드는', () => {
    context('이중 필터링 매개변수인 fixedKey를 함께 넘겨주면', () => {
      it('이중필터링 params를 반환한다.', () => {
        const testData = api.getFilterQueryParams('filter', 'in', paramObject1);

        expect(testData).toStrictEqual(notReverse);
      })
    })

    context('reverse = true를 넘겨주면', () => {
      it('필터링 순서가 바뀐 params를 변환한다.', () => {
        const testData = api.getFilterQueryParams('filter', 'in', paramObject1, true);

        expect(testData).toStrictEqual(reverse);
      })
    })
  })
})
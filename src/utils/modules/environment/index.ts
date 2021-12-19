const environment = {
  //! 현재 어떤 모드인지 알 수 있는 로직(D : 개발 서버 , A : asp 용 , G : inmail 오피스 용)
  getEndPoint() {
    const hostName = window.location.hostname;
    let endPointFlag = 'D';
    if (hostName.indexOf('gabia.com') !== -1) {
      endPointFlag = 'G';
    } else if (hostName.indexOf('hiworks.com') !== -1) {
      endPointFlag = 'A';
    }
    return endPointFlag;
  },

  //! .env 파일에 설정된 API 공통 url 부분 얻는 함수
  //* ex) getApiUrlFromEnv('menu') => process.env.VUE_APP_MENU_API 값을 가져옴
  //* ex) 만약 매칭되는 환경변수 값이 없는 경우 empty string을 반환
  getApiUrlFromEnv(endPoint: string): string {
    return process.env[`VUE_APP_${endPoint.toUpperCase()}_API`] || '';
  },
};

export { environment };

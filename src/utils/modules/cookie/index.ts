const cookie = {
  //! 특정 이름을 가진 cookie 얻기
  getCookie(name: string) {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
  },

  //! 쿠키 설정
  setCookie(name: string, value: string, expires: string, path: string, domain: string, secure: string) {
    const time = new Date();
    const expireValue = expires ? time.setDate(time.getDate() + +expires).toString() : '';

    path = path ? '; path=' + path : '';
    domain = domain ? '; domain=' + domain : '';
    secure = secure ? '; secure' : '';
    document.cookie = name + '=' + escape(value) + (expireValue ? '; expires=' + time.toUTCString() : '') + path + domain + secure;
  },
};

export { cookie };

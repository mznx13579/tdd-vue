const date = {
  /**
   * Date 객체는 문제가 많기 때문에 Moment를 사용해주시고.
   * 만약 아래의 메소드를 사용해야만 한다면
   * yyyy-mm-dd 까지만을 사용하는 것을 권장드립니다.
   * 
   * 아래의 gerFromFormat은 Date를 moment의 ('시간', 'format'); 처럼 사용해야
   * 할 때 사용되는 메소드 입니다.
   */
  getFromFormat(date: Date, format: string): string {
    const yyyy = date.getFullYear().toString();
    format = format.replace(/yyyy/g, yyyy);
    const mm = (date.getMonth() + 1).toString();
    format = format.replace(/mm/g, mm[1] ? mm : '0' + mm[0]);
    const dd = date.getDate().toString();
    format = format.replace(/dd/g, dd[1] ? dd : '0' + dd[0]);
    const hh = date.getHours().toString();
    format = format.replace(/hh/g, hh[1] ? hh : '0' + hh[0]);
    const ii = date.getMinutes().toString();
    format = format.replace(/ii/g, ii[1] ? ii : '0' + ii[0]);
    const ss = date.getSeconds().toString();
    format = format.replace(/ss/g, ss[1] ? ss : '0' + ss[0]);
    return format;
  },
};

export { date };

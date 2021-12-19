import moment from 'moment';

const time = {
  //! 시간차 계산
  // duration 메소드에 Moment가 들어가지 않아 아래의 getTimeDiffAsMinutes로 모두 대체가 가능할 것으로 보입니다.
  getDurationDiffAsMinutes(startAt: string , endAt: string ): number {
    const startTime = moment.duration(startAt, 'minutes');
    const endTime = moment.duration(endAt, 'minutes');
    return endTime.subtract(startTime).asMinutes();
  },

  // 몇 분 차이인지 알려주는 함수
  getTimeDiffAsMinutes(startAt: string | moment.Moment | Date, endAt: string | moment.Moment | Date, format = 'HH:mm'): number {
    const startTime = moment(startAt, format);
    const endTime = moment(endAt, format);
    return moment.duration(endTime.diff(startTime)).asMinutes();
  },
  
  // 시간 차를 return 하는 함수
  getTimeDiff(startAt: string | moment.Moment | Date, endAt: string | moment.Moment | Date, format = 'HH:mm:ss'): moment.Duration {
    const startTime = moment(startAt, format);
    const endTime = moment(endAt, format);
    
    // moment.Duration을 반환하고, .asDays(), .asHours(), .asMinutes(), ,asSeconds()를 붙혀 사용합니다.
    return moment.duration(endTime.diff(startTime));
  }
};

export { time };

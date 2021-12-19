//! 공통 이벤트
const commonEvents = {
  SET_PAGE: 'page-event', // 페이지네이션 페이지 이동
  GET_PENDING_LIST: 'pending-list',
  TOAST_EVENT: 'toast-event',
  CLOSE_MODAL: 'close-modal', // 모달의 동작으로 인한 refreash가 필요할떄 사용
  ALERT_WINDOW: 'alert-window',
  DETAIL_SEARCH: 'detail-search', // 리스트 상세검색
  RELOAD_LIST: 'reload-list', // 게시글 리스트 리로드
  LOCK_SCREEN_PROCESS: 'toggle-screen-lock', // 스크린락 토글
  DO_FILEUPLOAD: 'attach-file-upload', // 첨부파일 올리기
  IS_CHANGED_CID: 'cid-change-listener', // 에디터 CID 이벤트 리스너
  RELOAD_SIDEBAR: 'reload-sidebar',
  PENDING_NOTIFICATIONS: 'pending-notifications', // 스크롤하단 pending
  MODIFY_CONTENT: 'modify-content',
  SAVE_CONTENT: 'save-content', // 저장
  SAVE_CONTENT_CONTINUE: 'save-content-continue', // 저장 후 계속
  TEMP_SAVE_CONTENT: 'temp-save-content', // 임시 저장
  SEND_CONTENT: 'send-content', // 메일 발송 요청
  ROUTE_NEXT_PAGE: 'route-next-page', // 다음으로 이동
  ROUTE_PREV_PAGE: 'route-prev-page', // 이전으로 이동
  ROUTE_LIST_PAGE: 'route-list-page', // 목록으로 이동
  CLICK_ORG_NAME: 'click-org-name', // 조직도 이름 선택
  SEND_DIALOG_EMIT_PAYLOAD: 'send-dialog-emit-payload', // 공통 dialog 내 slot 컴포넌트에서 emit으로 payload 보낼 때
};

//! 주소록 팝업
const addressbookEvents = {
  ADDRESSBOOK_SELECT: 'addressbook-select', // 주소록선택(모달)
  ADDRESSBOOK_SYNC: 'addressbook-sync', // 주소록 선택 주소 동기화
  ADDRESSBOOK_INIT: 'addressbook-init', // 주소록 선택 창 초기화
  RESET_ADDRBOOK_CHECK: 'reset-addrbook-check',
};

export { commonEvents, addressbookEvents };

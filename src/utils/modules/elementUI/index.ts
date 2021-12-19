const elementUI = {
  //! element ui tooltip 또는 popover와 같은 component 지우는 로직
  //* (단, 함수의 인자로 string 값만 올 수 있고, 첫 번째 문자는 무조건 온점(.)이어야 한다.)
  //* ex) vue 컴포넌트에서 el-tooltip 마우스 hover 끝났을 때 해당 DOM 요소 전부 제거 => @mouseleave="removePopupElementUI('.el-tooltip__popper')"
  removePopupElementUI(selector: string) {
    const parentNode = document.querySelector('body') as HTMLBodyElement;
    const elements = Array.from(document.querySelectorAll(`body > ${selector}`));
    if (elements.length === 0) {
      return;
    }
    for (const element of elements) {
      parentNode.removeChild(element);
    }
  },
};

export { elementUI };

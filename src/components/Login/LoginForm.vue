<template>
  <div class="login">
    <div class="skip-navigation" data-ui="skipNavigation"><a href="#contents">본문 영역으로 바로가기</a></div>
    <div id="contents" class="loginWrap-ofc">
      <form class="login-form" @submit.prevent="login">
        <div class="loginBox-ofc">
          <h1 class="head-ofc">
            <img src="https://www.hiworks.com/static/temp_images/common/logo-blue.svg" alt="hiworks" />
          </h1>
          <div class="body-ofc">
            <ul class="save-ofc">
              <li>
                <input id="office_remember" type="checkbox" name="office_remember" />
                <label class="office_remember_label" for="office_remember">아이디 저장</label>
              </li>
              <li class="cont-ip" @click="openSecurityDialog">
                IP보안
                <span id="ip_security_state" class="is-state" :class="isOnIPSecurityClass">{{ isOnIPSecurity }}</span>
              </li>
            </ul>
            <section>
              <input
                id="office_id"
                ref="idInput"
                v-model="userId"
                type="text"
                class="type-J"
                title="아이디"
                name="office_id"
                placeholder="아이디"
              />
              <input
                id="office_passwd"
                v-model="password"
                type="password"
                class="type-J"
                title="비밀번호"
                name="office_passwd"
                placeholder="비밀번호"
              />
              <button type="submit" class="btn-login">로그인</button>
            </section>
            <p class="id-regform" onclick="accountRequest();">아이디 등록 신청</p>
            <article class="box-notice noline">
              <div class="inner">
                <p>공지사항</p>
                <a href="javascript:void(0)" onclick="jQuery('#phishingLayer').showPopup();">
                  <span class="phising"><span class="warning">!</span> 로그인 피싱 예방 안내</span>
                </a>
                <ul id="hiworks_notice">
                  <li>
                    <a href="https://www.hiworks.com/cs/notice/14604" target="_blank">
                      <span class="spr"></span>피싱 메일 주의 안내 - 04/08 (국세청 사칭 관련)
                    </a>
                    <span class="date">2021.04.08</span>
                  </li>
                  <li>
                    <a href="https://www.hiworks.com/cs/notice/14541" target="_blank">
                      <span class="spr"></span>[처리완료] 하이웍스 모바일앱 접속 지연 안내
                    </a>
                    <span class="date">2021.04.01</span>
                  </li>
                </ul>
                <a href="https://www.hiworks.com/cs/notice" target="_blank" class="spr" title="공지사항 더보기"></a>
              </div>
            </article>
          </div>
        </div>
      </form>
      <footer>
        <div class="foot-ofc">
          <a href="https://www.hiworks.com " title="새창" target="_blank">Powered by hiworks.com</a>
        </div>
      </footer>
    </div>
    <Dialog
      :title="$t('IP 보안 설정')"
      :isDialog="isSecurityDialog"
      :footerButtons="securityDialogButtons"
      @closeSecurityDialog="closeSecurityDialog"
      @setSecurityLevel="setSecurityLevel"
    >
      <SetSecurityLevel v-bind="{ selectedSecurityLevel }" />
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BaseObject, CustomVueRefs, StatusCode, ToastType } from '@/types/common';
import common from '@/common';
import authApi from '@/api/authApi';
import Dialog from '@/components/Dialog.vue';
import SetSecurityLevel from '@/components/Login/SetSecurityLevel.vue';
import { LoginForm } from './types';

export default (Vue as CustomVueRefs<{ idInput: HTMLInputElement }>).extend({
  name: 'LoginForm',

  components: {
    Dialog,
    SetSecurityLevel,
  },

  data() {
    return {
      userId: '',
      password: '',
      selectedSecurityLevel: '1',
      isSecurityDialog: false,
      securityDialogButtons: [
        {
          type: 'secondary',
          text: this.$t('취소').toString(),
          emitEvent: 'closeSecurityDialog',
        },
        {
          type: 'info',
          text: this.$t('저장').toString(),
          emitEvent: 'setSecurityLevel',
        },
      ],
    };
  },

  computed: {
    isOnIPSecurity(): string {
      return this.selectedSecurityLevel !== '0' ? 'ON' : 'OFF';
    },

    isOnIPSecurityClass(): string {
      return this.selectedSecurityLevel !== '0' ? 'on' : '';
    },
  },

  mounted() {
    this.focusIDInput();
  },

  methods: {
    focusIDInput() {
      const idInputElement = this.$refs.idInput;
      idInputElement.focus();
    },

    openSecurityDialog() {
      this.isSecurityDialog = true;
    },

    closeSecurityDialog() {
      this.isSecurityDialog = false;
    },

    setSecurityLevel(level: string) {
      this.selectedSecurityLevel = level;
      this.closeSecurityDialog();
    },

    async login() {
      //! test id
      //! id: hiworks_admin password: 2848048
      if (!this.loginPrechecker()) {
        return;
      }

      // 로그인 조회 상태값에 따라 이동할 페이지
      const routeNamesBasedOnLoginStatus: BaseObject<string> = {
        [StatusCode.NOT_LOGIN]: '',
        [StatusCode.AVAILABLE_USE_AFTER_REGISTER_OTP]: 'RegisterQRCode',
        [StatusCode.WAIT_REGISTER_OTP]: 'Verify',
        [StatusCode.AVAILABLE_USE_AFTER_CHANGE_PASSWAORD]: 'ChangePassword',
        [StatusCode.SUCCESS_LOGIN]: 'Home',
      };

      // 로그인 조회 상태값에 따라 보여주는 문구
      const showAlertMessagesBasedOnLoginStatus: BaseObject<string> = {
        [StatusCode.NOT_LOGIN]: '로그인 되지 않았습니다.',
        [StatusCode.AVAILABLE_USE_AFTER_REGISTER_OTP]: 'OTP 등록 후 사용 가능합니다.',
        [StatusCode.WAIT_REGISTER_OTP]: 'OTP 입력 대기 중입니다.',
        [StatusCode.AVAILABLE_USE_AFTER_CHANGE_PASSWAORD]: '비밀번호 변경 후 사용 가능합니다.',
        [StatusCode.SUCCESS_LOGIN]: '환영합니다.',
      };

      const movePage = (routeName: string) => {
        if (routeName === '') return;

        this.$router.push({ name: routeName });
      };

      const loginData: LoginForm = {
        user_id: this.userId,
        user_password: this.password,
        security_level: this.selectedSecurityLevel,
      };

      try {
        this.$eventHub.$emit(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, true);

        const { data } = await authApi.create<LoginForm>('/login', loginData);
        const loginStatus = data?.data?.status;

        this.$eventHub.$emit(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, false);

        if (loginStatus) {
          const routeName = routeNamesBasedOnLoginStatus[loginStatus];
          const alertMessage = showAlertMessagesBasedOnLoginStatus[loginStatus];
          const alertType = loginStatus === StatusCode.SUCCESS_LOGIN ? ToastType.SUCCESS : ToastType.INFO;

          this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
            message: alertMessage,
            type: alertType,
          });

          movePage(routeName);
          return;
        }

        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: '로그인을 다시 시도해주세요.',
          type: ToastType.INFO,
        });
      } catch (error) {
        this.$eventHub.$emit(this.HW_EVENT_NAMES.LOCK_SCREEN_PROCESS, false);
        console.warn(error);

        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: common.showErrorMessage(error),
          type: ToastType.ERROR,
        });

        this.focusIDInput();
      }
    },

    loginPrechecker() {
      if (this.userId.trim() === '') {
        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: '아이디를 입력하세요.',
          type: ToastType.INFO,
        });
        return false;
      }

      if (this.password.trim() === '') {
        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: '비밀번호를 입력하세요.',
          type: ToastType.INFO,
        });
        return false;
      }

      if (this.selectedSecurityLevel === '') {
        this.$eventHub.$emit(this.HW_EVENT_NAMES.TOAST_EVENT, {
          message: '보안 설정 단계를 선택하세요.',
          type: ToastType.INFO,
        });
        return false;
      }

      return true;
    },
  },
});
</script>

<style lang="scss" scoped>
//! 로그인 페이지 전용 전역 scss 설정
// 기존 구 오피스 로그인 페이지의 폰트 스타일과 동일하게 맞추기 위한 font 설정
.login {
  font-size: 14px;
  font-family: Apple Gothic, 'Malgun Gothic', dotum, 'Arial', sans-serif;
}

// 공지사항 + 아이콘, 리스트 불릿 아이콘
.spr {
  display: inline-block;
  background: url('https://devoffice.hiworks.com/static/images/login/sp_image.png') 0 0 no-repeat;
}

.skip-navigation a {
  position: absolute;
  top: -70px;
  left: 0;
  z-index: 10000;
  transition: 0.3s;
  width: 100%;
  background: #001157;
  text-align: center;
  color: #fff;
  padding: 20px 0px;
}

/* --------------------------------------------
 * mobile content
/* ------------------------------------------ */
#wrap {
  width: 100%;
  overflow: hidden;
}
.btn-login {
  display: block;
  width: 100%;
  height: 70px;
  margin: 20px auto 0;
  color: #fff;
  cursor: pointer;
  line-height: 70px;
  text-align: center;
  border: none;
  border-radius: 2px;
  background: #2c86dc;
  -webkit-appearance: none; /*Safari/Chrome*/
  -webkit-transition: all 0.25s;
  -moz-transition: all 0.25s;
  transition: all 0.25s;
}
.btn-login:hover,
.btn-login:focus {
  background: #1277d5;
}

/* office login */
input.type-J[type='text'],
input.type-J[type='password'] {
  border: 1px solid #c8c8c8;
  display: block;
  text-indent: 10px;
  margin-top: 12px;
  background: #fff;
  width: 100%;
  font-size: inherit;
  color: inherit;
  line-height: 56px;
  height: 56px;
  box-sizing: border-box;
}
input.sv[type='text'] {
  border: none;
  color: #333;
  background: none;
}
.security-level {
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-select {
    flex-grow: 1;
    text-align: right;

    label + label {
      margin-left: 30px;
    }
  }
}
.loginWrap-ofc {
  background: #fff;
}
.loginBox-ofc {
  width: 90%;
  margin: 0 auto;
  background: #fff;
}
.loginBox-ofc a {
  color: inherit;
}
.head-ofc {
  padding: 50px 0 0;
  text-align: center;
  a {
    display: inline-block;
    width: 230px;
    height: 50px;
    text-align: center;
  }
  img {
    max-width: 150px;
  }
}

.body-ofc {
  color: #666;
  text-align: center;
}
.body-ofc .go-www {
  color: #2985db;
  margin: 20px 0 0;
  display: inline-block;
}
.body-ofc .save-ofc {
  text-align: right;
  margin: 35px 0 15px;
}
.body-ofc .save-ofc:after {
  display: block;
  clear: both;
  content: '';
}
.body-ofc .save-ofc li {
  float: left;
}
.body-ofc .save-ofc label.office_remember_label {
  margin-left: 4px;
}
.body-ofc .save-ofc li.cont-ip {
  float: right;
}
.body-ofc .save-ofc .cont-ip .is-state {
  display: inline-block;
  width: 45px;
  height: 26px;
  line-height: 24px;
  border: 1px solid #ccc;
  border-radius: 20px;
  color: #939baa;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.body-ofc .save-ofc .cont-ip .is-state.on {
  color: #2c86dc;
}

.body-ofc .err {
  text-align: left;
  padding: 3px 0 0;
}
.body-ofc .save-ofc-2 {
  margin: 60px 0 0;
  position: relative;
}
.save-ofc-2 .office-login {
  text-align: left;
  padding: 0;
}
.save-ofc-2 .office-login span {
  color: #666;
}
.save-ofc-2 .office-login .icon-q {
  text-align: center;
}
.save-ofc-2 .save {
  position: absolute;
  right: 0;
  top: 0;
}
#svId + label {
  margin-left: 3px;
}
.body-ofc .box-notice {
  text-align: left;
  box-shadow: 1px 1px 3px 1px #eee;
  margin: 30px 0 40px;
  min-width: 288px;
}
.body-ofc .box-notice .inner {
  box-shadow: -1px -1px 3px 1px #eee;
  padding: 10px;
  position: relative;
}
.body-ofc .box-notice p:first-of-type {
  padding-bottom: 8px;
  color: #333;
}
.body-ofc .box-notice p:first-of-type .spr {
  background-position: -97px -47px;
  width: 11px;
  height: 11px;
  padding: 3px;
  margin: 0 0 -3px 6px;
}
.body-ofc .box-notice li:after {
  display: block;
  content: '';
  clear: both;
}
.body-ofc .box-notice li a {
  width: 65%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  float: left;
}
.body-ofc .box-notice li .spr {
  background-position: -100px -68px;
  width: 3px;
  height: 3px;
  margin: 0px 5px 3px 0;
}
.body-ofc .box-notice li .date {
  float: right;
}
.body-ofc .box-notice ul + .spr {
  background-position: -97px -47px;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 16px;
  left: 80px;
}
.body-ofc .btn-login {
  margin-top: 20px;
}
.foot-ofc {
  display: none;
}
.body-ofc .box-notice .inner .phising {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ff472e;
}
.body-ofc .box-notice .inner .phising .warning {
  position: relative;
  top: 1px;
  display: inline-block;
  width: 14px;
  height: 14px;
  background: #ff472e;
  color: #fff;
  border-radius: 50%;
  line-height: 14px;
  font-weight: bold;
  text-align: center;
}

.layer_box.mid_large {
  width: 350px;
  padding: 14px 15px 16px;
  box-sizing: border-box;
}
.layer_box .title_layer {
  font-size: 18px;
}

.layer_box.phishing {
  box-sizing: border-box;
  width: 320px;
}
.layer_box.phishing .header {
  background: #ffe1dd;
  padding: 30px 20px;
  color: #ff472e;
  text-align: center;
  font-size: 12px;
  letter-spacing: -1px;
}
.layer_box.phishing .header .warning {
  position: relative;
  top: 1px;
  display: inline-block;
  width: 14px;
  height: 14px;
  background: #ff472e;
  color: #fff;
  border-radius: 50%;
  line-height: 14px;
  font-weight: bold;
}
.layer_box.phishing .body {
  font-size: 14px;
  padding: 20px;
  letter-spacing: -1px;
  color: #666;
}
.layer_box.phishing .body p {
  padding-bottom: 20px;
}
.layer_box.phishing .body .underline {
  text-decoration: underline;
}
.layer_box.phishing .body li {
  font-size: 12px;
  color: #9a999e;
  text-indent: -5px;
  line-height: 1.8;
}

/* --------------------------------------------
 * ipad-portrait
/* ------------------------------------------ */
@media screen and (min-width: 768px) {
  /* office login */
  .body-ofc .box-notice li a {
    width: 80%;
  }
  .modal_body .ex-inner,
  .my_layer .ex-inner {
    display: table;
    margin: 30px 0 0 15px;
  }
  .modal_body .ex-inner span,
  .my_layer .ex-inner span {
    display: table-cell;
    width: 40px;
    word-break: break-all;
    word-wrap: break-word;
  }
  .set-pw .several.tr .btn {
    margin: 0 0 0 15px;
  }

  .layer_box.large {
    width: 640px;
    padding: 25px 30px 32px;
  }
  .layer_box.mid_large {
    width: 450px;
    padding: 25px 30px 32px;
  }
  .layer_box .title_layer {
    font-size: 16px;
    padding-bottom: 21px;
  }
}

/* --------------------------------------------
 * ipad-landscape
/* ------------------------------------------ */
@media screen and (min-width: 1024px) {
  .spr {
    background-size: 500px 500px;
  }

  /* office login */
  input.type-J[type='text'],
  input.type-J[type='password'] {
    text-indent: 20px;
    margin-top: 12px;
    line-height: 50px;
    height: 50px;
  }
  .loginWrap-ofc {
    background: #f3f2f0; /* min-height:870px; */
    padding: 10% 0 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .loginWrap-ofc.bg .loginBox-ofc {
    background: rgba(255, 255, 255, 0.3);
  }
  .loginBox-ofc {
    width: 420px;
    padding: 0 30px;
    border: 1px solid #d0d0d0;
    box-sizing: content-box;
  }
  .loginBox-ofc.noline {
    border: none;
  }
  .head-ofc {
    padding: 60px 0 0;
  }
  .head-ofc a {
    width: 280px;
    height: 60px;
  }
  .body-ofc .save-ofc {
    margin: 70px 0 15px;
  }

  /*기획 요청 주석 처리*/
  /*.body-ofc .save-ofc li:last-child{margin-left:6px}
	.body-ofc .save-ofc li:last-child:before{margin-right:12px}*/

  .body-ofc .box-notice {
    margin: 25px 0 50px;
  }
  .body-ofc .box-notice.noline {
    box-shadow: none;
  }
  .body-ofc .box-notice .inner {
    padding: 23px 20px;
  }
  .body-ofc .box-notice.noline .inner {
    box-shadow: none;
    padding: 10px;
  }
  .body-ofc .box-notice p:first-of-type {
    padding-bottom: 8px;
  }
  .body-ofc .box-notice p:first-of-type .spr {
    background-position: -240px -100px;
    width: 13px;
    height: 13px;
    padding: 0;
    margin: 0px 0 -1px 8px;
  }
  .body-ofc .box-notice li a {
    width: 75%;
  }
  .body-ofc .box-notice li .spr {
    background-position: -216px -138px;
    width: 4px;
    height: 4px;
    margin: 0px 5px 3px 0;
  }
  .body-ofc .box-notice ul + .spr {
    background-position: -240px -100px;
    width: 13px;
    height: 13px;
    padding: 0;
    position: absolute;
    top: 28px;
    left: 83px;
  }
  .body-ofc .box-notice.noline ul + .spr {
    top: 14px;
    left: 73px;
  }
  .body-ofc .btn-login {
    margin-top: 20px;
  }
  .body-ofc .btn-login {
    line-height: 60px;
    font-size: 18px;
  }
  .foot-ofc {
    display: block;
    text-align: center;
    padding: 14px 0 0;
  }
  .foot-ofc a {
    color: #999;
  }

  .layer_box.large {
    width: 640px;
    padding: 25px 30px 32px;
  }
  .layer_box.mid_large {
    width: 450px;
    padding: 25px 30px 32px;
    box-sizing: content-box;
  }
  .layer_box .title_layer {
    font-size: 16px;
    padding-bottom: 21px;
  }
  .layer_box.phishing {
    width: 392px;
  }
  .layer_box.phishing .header {
    font-size: 14px;
    text-align: left;
    padding: 30px;
  }
  .layer_box.phishing .header .warning {
    text-align: center;
    line-height: 14px;
  }
  .layer_box.phishing .body {
    padding: 30px;
  }
}

/* --------------------------------------------
 * wide
/* ------------------------------------------ */
@media screen and (min-width: 1200px) {
  #wrap {
    position: relative;
  }

  /* office login */
  .loginWrap-ofc {
    /* min-height:980px */
  }

  .layer_box.large {
    width: 640px;
    padding: 25px 30px 32px;
  }
  .layer_box.mid_large {
    width: 450px;
    padding: 25px 30px 32px;
    box-sizing: content-box;
  }
  .layer_box .title_layer {
    font-size: 16px;
    padding-bottom: 21px;
  }
}

#dimmed {
  background-color: #000;
  display: none;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0.3;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

/* 로그인 페이지 아이디 신청 추가 */
.id-regform {
  margin-top: 20px;
  color: #2985db;
  cursor: pointer;
}
.after:after {
  content: '';
  display: block;
  clear: both;
}
.w50 {
  width: 50px !important;
}
.w100 {
  width: 100px !important;
}
.w200 {
  width: 200px !important;
}
.mgt_10 {
  margin-top: 10px;
}
.mgr_10 {
  margin-right: 10px;
}
.pdt_30 {
  padding-top: 30px;
}
.font12 {
  font-size: 12px;
  color: #9a989d;
}
.weakblue {
  color: #779ec0 !important;
}
.layer_box {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1010;
  border: 1px solid #8d8d8d;
  background: #fff;
}
.layer_box .scroll {
  height: 475px;
  overflow-y: auto;
}
.layer_box .title_layer {
  padding-bottom: 21px;
}
.layer_box .text_variables {
  color: #2985db;
}
.layer_box .to-add dl {
  width: 100%;
  margin-bottom: 15px;
  color: #676767;
}
.layer_box .to-add dt {
  width: 20%;
  float: left;
}
.layer_box .to-add dt span {
  color: #d91a1a;
}
.layer_box .to-add dd {
  float: right;
  width: 80%;
}
.layer_box input[type='text'],
.layer_box input[type='password'] {
  height: 21px;
  font-size: 14px;
  border: 1px solid #a5acb2;
  color: #676767;
}
.layer_box .select-box {
  border: 1px solid #a5acb2;
  height: 23px;
  color: #676767;
}
.layer_box .layer_button {
  margin-top: 29px;
  line-height: 19px;
  text-align: center;
}
.layer_button button {
  padding: 6px 27px 7px;
  color: #444;
  letter-spacing: -1px;
  border: 0;
  background: #f1f1f1;
}
.layer_button button:hover {
  background: #dadada;
}
.layer_box .btn_variables {
  background: #fff;
  padding: 5px 27px 6px;
  border: 1px solid #c8c8c8;
  color: #2c86dc;
}
.layer_box .btn_variables:hover {
  border: 1px solid #2c86dc;
  background: #fff;
}

.icon.btn_closelayer {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 17px;
  height: 16px;
  background-position: -281px 0;
}

/* 로그인 페이지 아이디 등록 신청 우편번호 검색 레이어*/
.layer_box .title_layer {
  padding-bottom: 21px;
}
.layer_box .text_variables {
  color: #2985db;
}
.mgr_20 {
  margin-right: 20px;
}
.bold {
  font-weight: 700;
}
.cal_table1.bdt {
  border-top: 1px solid #dedede;
}
.cal_table1 {
  width: 100%;
}
.mgt_10 {
  margin-top: 10px;
}
.cal_table1 tr td:first-child,
.cal_table1 tr th:first-child {
  border-left: 0 none;
}
.cal_table1 tbody th {
  text-align: left;
}
.cal_table1 th {
  background: #f9f9f9 none repeat scroll 0 0;
  border-bottom: 1px solid #dedede;
  border-left: 1px solid #dedede;
  font-weight: 400;
  padding: 6px 12px;
}
.cal_table1 td {
  border-bottom: 1px solid #dedede;
  border-left: 1px solid #dedede;
  padding: 6px 12px;
}
.layer_box table caption {
  display: none;
}
.pdt_10 {
  padding-top: 10px !important;
}
.gr_depth1 {
  padding-left: 14px;
  text-indent: -12px;
}
.tableType01 {
  border-bottom: 1px solid #cdcdcd;
  border-top: 1px solid #cdcdcd;
  width: 100%;
}
.post_scroll {
  height: 224px;
  overflow-y: auto;
}
.tableType01 th,
.list_select .tableType01 th {
  background: #f9f9f9 none repeat scroll 0 0;
  border-bottom: 1px solid #ececec;
  color: #333;
  font-weight: 400;
  padding: 14px 0;
}
.tableType01 .center {
  padding-left: 0;
  text-align: center;
}
.tableType01 td,
.list_select .tableType01 td {
  padding: 12px 0 12px 16px;
  word-break: break-all;
}
.pdt_30 {
  padding-top: 30px;
}
</style>

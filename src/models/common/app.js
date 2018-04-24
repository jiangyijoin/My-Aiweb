/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import qs from 'qs'
import config from 'config'
import {url} from 'f-utils'
import {registerListener} from 'utils';
const { prefix, loginUrlDef, sso:{loginUrl: loginUrl, logoutUrl: logoutUrl, enable:SSOEnable} } = config;

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    activeMenu: [],
    menu: [],
    letterMenu: [],
    historyMenu: JSON.parse(window.localStorage.getItem(`${prefix}hisMenu`)) || [],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: false,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: qs.parse(location.search, { ignoreQueryPrefix: true }),
          },
        })
        dispatch({
          type: 'writeHistory',
          payload: {
            locationPathname: location.pathname,
            locationQuery: qs.parse(location.search, { ignoreQueryPrefix: true }),
          },
        })
      })
    },
    setup ({ dispatch }) {
      dispatch({ type: 'query', payload: {} });
    },

  },
  effects: {
    * query ({ payload,}, { call, put, select }) {
      // const { locationPathname, locationQuery:{token} } = yield select(_ => _.app);
      // if(config.openPages && config.openPages.indexOf(locationPathname)>0){
      //   return ;
      // }
      /**
       * 登陆方法
       */
      const loginFn = () => {
        const user = window.sessionStorage.getItem("user");
        const pl = {};
        user && Object.assign(pl, JSON.parse(user));
        //如果没有用户信息，单点登录跳转单点登录页面，普通登陆跳转login
        if(!user || !pl.auth) {
          if (SSOEnable) {
            if(/^http/.test(loginUrl)){
              url.redirect(loginUrl, {serviceUrl: window.location.href});
            }else if(!(new RegExp(loginUrl + '$')).test(window.location.href)){
              window.location.href = 'http://' + window.location.host + loginUrl;
            }
          }
          return null;
        }else{
          window.sessionStorage.setItem("user", JSON.stringify(pl));
          return pl;
        }
      };
      //如果登录成功 写入session
      if(payload.auth){
        try{
          window.sessionStorage.setItem("user", JSON.stringify(payload));
        }catch(e) {
          console.log(`ERROR ${e}`)
          window.sessionStorage.removeItem("user");
          yield put(routerRedux.push({
            pathname: '/error?type=0'
          }))
          return;
        }
      }
      //判断是否需要登陆
      const pl = loginFn();
      if(pl){
        //获取菜单等登陆后信息操作
        try {
          if(pl.username){
            // console.log(`PL : ${JSON.stringify(pl)}`);
            yield put({
              type: 'updateState',
              payload: {
                user: pl
              },
            })
          }
        }catch(e) {
          if (e.statusCode === 401) {
            loginFn();
            return;
          }else{
            throw e;
          }
        }
      }
    },

    * login ({ payload }, { call, put }) {
      if (SSOEnable) {
        if(/^http/.test(loginUrl)){
          url.redirect(loginUrl, {serviceUrl: window.location.href});
        }else if(!(new RegExp(loginUrl + '$')).test(window.location.href)){
          window.location.href = 'http://' + window.location.host + loginUrl;
        }
      }else{
        window.location.href = 'http://' + window.location.host + loginUrlDef;
      }
    },

    * logout ({payload}, { call, put }) {
      window.sessionStorage.removeItem("user");
      //url.redirect(logoutUrl, {serviceUrl: window.location.href});
      const href_new = 'http://' + window.location.host + '/dashboard';
      if(SSOEnable && /^http/.test(logoutUrl)){
        url.redirect(logoutUrl, {serviceUrl: href_new});
      }else{
        window.location.href = href_new;
      }
    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = false;
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    writeHistory (state, { payload }){
      const filterMenu = state.menu.filter((item) => {return item.route==payload.locationPathname});
      if(filterMenu.length>0){
        let localMenu = filterMenu[0];
        const historyMenu = state.historyMenu.filter((item) => {
          if(item.route==payload.locationPathname){
            localMenu = item;
            return false;
          }else{
            return true;
          }
        });
        //记录访问次数
        !localMenu.cnt?localMenu.cnt=1:localMenu.cnt++;
        historyMenu.push(localMenu);
        state.historyMenu = historyMenu;
        window.localStorage.setItem(`${prefix}hisMenu`, JSON.stringify(state.historyMenu));
      }
      return {
        ...state,
        ...payload,
      }
    },

    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
    handleActiveMenuChange (state, { payload }) {
      return {
        ...state,
        activeMenu: payload.activeMenu,
      }
    },
  },
}

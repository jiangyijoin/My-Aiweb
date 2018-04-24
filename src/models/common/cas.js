/**
 * Created by liang on 2017/12/25.
 */
/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import qs from 'qs'
import config from 'config'
import * as svc from 'services/common/app'
import * as menusService from 'services/common/menus'
import {firstLetterSort, url} from 'f-utils'
import {registerListener} from 'utils';
const { prefix, sso:{loginUrl: loginUrl, logoutUrl: logoutUrl, enable:SSOEnable} } = config;
const { query, user : userToken } = svc;

export default {
  namespace: 'cas',
  state: {
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
      })
    },
    setup ({ dispatch }) {
      dispatch({ type: 'query' });
    },

  },
  effects: {

    * query ({ payload,}, { call, put, select }) {
      const { locationPathname, locationQuery:{token} } = yield select(_ => _.app);
      /**
       * 登陆方法
       */
      const loginFn = () => {
        const user = window.sessionStorage.getItem("user");
        const pl = {};
        user&&Object.assign(pl, JSON.parse(user));
        //如果没有用户信息，单点登录跳转单点登录页面，普通登陆跳转login
        if(!user || !pl.auth) {
          if (SSOEnable) {
            url.redirect(loginUrl, {serviceUrl: window.location.href});
            return null;
          }
          return null;
        }else{
          window.sessionStorage.setItem("user", JSON.stringify(pl));
          return pl;
        }
      };
      //如果是SSO登陆，获取token，根据token查找用户，写入session
      if(token && SSOEnable){
        //验证token
        window.sessionStorage.setItem("user", JSON.stringify({'auth':token}));
        try{
          const data = yield call(userToken);
          //用户验证成功
          window.sessionStorage.setItem("user", JSON.stringify({"username":data.data, "auth":token}));
        }catch(e) {
          console.log(`ERROR ${e}`)
          window.sessionStorage.removeItem("user");
          yield put(routerRedux.push({
            pathname: '/error?type=0'
          }))
          return ;
        }
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
  },
}

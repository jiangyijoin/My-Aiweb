import { routerRedux } from 'dva/router'
import { login } from 'services/common/login'
import { message } from 'antd'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      console.log('config',data,login,_)
      if (data.code === 1000) {
        const { from } = {};
        yield put({ type: 'app/query', payload:{'username': payload.username, 'auth' : data.data} })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/aiScene')) //dashboard
        }
      } else if(data.statusCode === 200){
        message.error(data.msg);
      }else {
        throw data
      }
    },
  },

}

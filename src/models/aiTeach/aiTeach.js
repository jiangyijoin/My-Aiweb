import modelExtend from 'dva-model-extend'
import { pageModel } from 'models/common/common'
import { config } from 'utils'
const { prefix } = config
import { message } from 'antd';

export default modelExtend(pageModel, {
  namespace: 'aiTeach',
  state: {
    cur:'机器学习简介',
    href:"#21"
  },

  subscriptions:{
    setup ({ dispatch, history }) {
      history.listen((location) => { //启动时监听
        if (location.pathname === '/aiTeach') {
          clearInterval(window.TIMER);
        }
      })
    },
  },
  effects: {

  },

  reducers:{
    setCur(state, { payload }) {
        const {cur}=payload;
        return {
          ...state,
          cur
        }
    },
    setHref(state, { payload }) {
      const {href}=payload;
      return {
        ...state,
        href
      }
    }
  }
})

import modelExtend from 'dva-model-extend'
import { pageModel, checkResult } from 'models/common/common'
import { config } from 'utils'
import { AIScenesList } from "services/aiScene/aiSceneService"

export default modelExtend(pageModel, {
  namespace: 'aiScene',
  state: {
    sceneList:[],
  },

  subscriptions:{
    setup ({ dispatch, history }) {
      dispatch({
        type:"AIScenesList"
      })
      history.listen((location) => { //启动时监听
        if (location.pathname === '/aiScene') {
          clearInterval(window.TIMER);
        }
      })
    },
  },
  effects: {
    *AIScenesList ({ payload = {} }, { call, put }) {
      const data = yield call(AIScenesList, payload);
      if (checkResult(data)) {
        yield put({
          type: 'setSceneList',
          payload: {
            sceneList: data.data
          }
        });
      }
    },
  },

  reducers:{
    setSceneList(state, { payload }) {
      const {sceneList}=payload;
      return {
        ...state,
        sceneList
      }
    },
  }
})

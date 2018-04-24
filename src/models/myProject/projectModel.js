import modelExtend from 'dva-model-extend'
import { queryProjectServer, queryProjectSource, queryScenes, remove } from 'services/myProject/projectServer'
import { pageModel, checkResult } from 'models/common/common'
import { message } from 'antd'

//从models/commmon/common/pageModel继承模型
export default modelExtend(pageModel, {
  //模型命名空间
  namespace: 'projectData',
  //模型初始化状态，由于参数已经在`models/common/common.js`中设置过了，这里不需要设置
  state: {
    date: [],
    projectInfo: [],
    scenesInfo: [],
  },
  //创建订阅方法
  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen((location) => { //启动时监听
          if(location.pathname === '/myProject'){
            clearInterval(window.TIMER);
            dispatch({
              type: `queryProjectServer`,
              payload: {sceneId: 'ALL', projectId: '', userName: user.username, pageNo: '1', limit: '10'},
            })
            dispatch({
              type: `queryProjectSource`,
              payload: {flag: 'project', sceneId: 'ALL', userName: user.username},
            })
            dispatch({
              type: `queryScenes`,
              payload: {userName: user.username}
            })
          }
      })
    },
  },
  //异步操作调用函数模块，这里需要创建的是 Generator函数
  effects: {
    *queryProjectServer ({ payload = {} }, { call, put }) {
      const result = yield call(queryProjectServer, payload)
      console.log(user)
      if(checkResult(result)){
        console.log(user)
        yield put({//表示下一步调用哪个方法
          type: 'queryModel',
          payload: {
            list: result
          },
        });
      }
    },
    *queryProjectSource ({ payload = {} }, { call, put }) {
      const result = yield call(queryProjectSource, payload)
      if(checkResult(result)){
        yield put({
          type: 'getProject',
          payload: {
            projectInfo: result.data
          },
        });
      }
    },
    *queryScenes ({ payload = {} }, { call, put }) {
      const result = yield call(queryScenes, payload)
      if(checkResult(result)){
        yield put({
          type: 'getScenes',
          payload: {
            scenesInfo: result.data
          },
        });
      }
    },
    *remove ({ payload = {} }, {select, call, put }) {
      const result = yield call(remove, payload)
      if(checkResult(result)){
        message.success("\u5220\u9664\u6210\u529F\uFF01"); //删除成功！
        yield put({
          type:"queryProjectServer",
          payload: {sceneId:'ALL',projectId:'',userName:user.username,pageNo:'1',limit:'10'}
        });
      }else{
        message.error("\u5220\u9664\u5931\u8D25\uFF01"); //删除失败！
      }
    },
  },
  //reducer已经在pageModel中实现过了，这里就不用写querySuccess了
  reducers:{
    queryModel(state, { payload }) {
      const { list } = payload
      return {
        ...state,
        list
      }
    },
    getProject(state, { payload }) {
      const { projectInfo } = payload
      //console.log("projectInfo")
      return {
        ...state,
        projectInfo
      }
    },
    getScenes(state, { payload }) {
      const { scenesInfo } = payload
      return {
        ...state,
        scenesInfo
      }
    },
  },
})

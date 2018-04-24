import modelExtend from 'dva-model-extend'
import { predictionServer, queryMoldeSource, queryScenes, predictHistory, resourceDownload, forecastProcess, getForecastResult } from 'services/prediction/predictionServer'
import { pageModel, checkResult } from 'models/common/common'

//从models/commmon/common/pageModel继承模型
export default modelExtend(pageModel, {
  //模型命名空间
  namespace: 'predictionData',
  //模型初始化状态，由于参数已经在`models/common/common.js`中设置过了，这里不需要设置
  state: {
    modelList: [],
    date: [],
    baseInfo: [],
    scenesInfo: [],
    historyInfo: [],
    result: [],
    processD: [],
  },
  //创建订阅方法
  subscriptions:{
    //启动时监听
    setup ({ dispatch, history }) {
      // 监听当前的地址变换,这里使用 箭头函数
      history.listen(location => {
        //触发查询effect
        console.log(location)
        if(location.pathname === '/prediction'){
          clearInterval(window.TIMER);
          let processId = 'ALL'
          if(location.PROCESS_ID){
            processId = location.PROCESS_ID
          }
          dispatch({
            type: `predictionServer`,
            payload: {sceneId: processId, forecastId: '', startTime: '', endTime: '', pageNo: '1', limit: '10'}
          })
          dispatch({
            type: `queryMoldeSource`,
            payload: {flag: 'model', sceneId: 'ALL'}
          })
          dispatch({
            type: `queryScenes`,
            payload: {userName: 'SYSTEM'}
          })
        }
      })
    },
  },
  //异步操作调用函数模块，这里需要创建的是 Generator函数
  effects: {
    *predictionServer ({ payload = {} }, { call, put }) {
      const result = yield call(predictionServer, payload)
      if(checkResult(result)){
        /*let datas = [], forecId = ''
        let dataa = result.data
        if(dataa!=''||dataa.length>0){
          datas = dataa.elements
          if(datas!=''||datas.length>0){
            forecId = datas[0].FORECAST_ID
            yield put({
              type: `predictHistory`,
              payload: {forecastId: forecId, pageNo: '1', limit: '10'},
            })
          }
        }*/
        yield put({//表示下一步调用哪个方法
          type: 'queryModel',
          payload: {
            modelList: result.data
          },
        });
      }
    },
    *queryMoldeSource ({ payload = {} }, { call, put }) {
      const result = yield call(queryMoldeSource, payload)
      if(checkResult(result)){
        yield put({
          type: 'getMolde',
          payload: {
            baseInfo: result.data
          },
        });
      }
    },
    *queryScenes ({ payload = {} }, { call, put }) {
      const result = yield call(queryScenes, payload)
      if(checkResult(result)){
        console.log(location)
        if(location.PROCESS_ID){
          let pId = location.PROCESS_ID
          let ites = result.data
          for(let i=0;i<ites.length;i++){

          }
        }
        yield put({
          type: 'getScenes',
          payload: {
            scenesInfo: result.data
          },
        });
      }
    },
    *predictHistory ({ payload = {} }, { call, put }) {
      const result = yield call(predictHistory, payload)
      if(checkResult(result)){
        yield put({
          type: 'getHistory',
          payload: {
            historyInfo: result
          },
        });
      }
    },
    *resourceDownload ({ payload = {} }, { call, put }) {
      const result = yield call(resourceDownload, payload)
      if(checkResult(result)){
        yield put({//表示下一步调用哪个方法
          type: 'getDownload',
          payload: {
            list: result.data.elements
          },
        });
      }
    },
    *forecastProcess ({ payload = {} }, { call, put }) {
      const result = yield call(forecastProcess, payload)
      if(checkResult(result)){
        yield put({//表示下一步调用哪个方法
          type: 'getProcess',
          payload: {
            processD: result
          },
        });
      }
    },
    *getForecastResult ({ payload = {} }, { call, put }) {
      const result = yield call(getForecastResult, payload)
      if(checkResult(result)){
        yield put({//表示下一步调用哪个方法
          type: 'getResult',
          payload: {
            result: result
          },
        });
      }
    },
  },
  //reducer已经在pageModel中实现过了，这里就不用写querySuccess了
  reducers:{
    queryModel(state, { payload }) {
      const { modelList } = payload
      return {
        ...state,
        modelList,
      }
    },
    getMolde(state, { payload }) {
      const { baseInfo } = payload
      return {
        ...state,
        baseInfo
      }
    },
    getScenes(state, { payload }) {
      const { scenesInfo } = payload
      return {
        ...state,
        scenesInfo
      }
    },
    getHistory(state, { payload }) {
      const { historyInfo } = payload
      return {
        ...state,
        historyInfo
      }
    },
    getDownload(state, { payload }) {
      const { list } = payload
      return {
        ...state,
        list,
      }
    },
    /*getResult*/
    getProcess(state, { payload }) {
      const { result } = payload
      return {
        ...state,
        result,
      }
    },
    getResult(state, { payload }) {
      const { processD } = payload
      return {
        ...state,
        processD,
      }
    },
  },
})

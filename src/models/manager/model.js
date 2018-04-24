import modelExtend from 'dva-model-extend';
import { queryProcess, publishProcess, saveProcess, updateProcess,
            forecastProcess, runProcess, getProcessResult, pageParams } from 'services/manager/process'
import { dataResourceList } from 'services/dataSource/dataSourceService'
import { pageModel, checkResult, getProcessData } from 'models/common/common';
import { message } from 'antd';

export default modelExtend(pageModel, {
  namespace: 'model',
  state: {
    modelType: null, //页面类型(['model'])
    footer: {}, //页脚配置
    readOnly: false, //参数是否只读
    processId: null, //当前流程图的ID
    processVisible: false, //是否显流程模型
    processData: {modelData: {nodes: [], connections: []}}, //流程图数据
    processDataSrc: {}, //流程图原始数据(接口直接返回)
    processState: [], //流程图组件状态
    dataResourceList: [], //数据源列表
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      //console.log('history', history);
      history.listen((location) => {
        // console.log('重定向接收参数：%o', location.state);
        if(location.pathname === '/model'){
          const { state = {} } = history.location ;
          const { data = {}, footer = {}, readOnly = false, type } = state ;
          const { user = {} } = window;
          const processId = data.PROCESS_ID;
          if('PROCESS_ID' in data){
            dispatch({ //清空流程图
              type: 'setData',
              payload: { processId: '', processData: {modelData: {nodes: [], connections: []}}},
            });
            dispatch({ //获取流程图数据 先获取状态
              type: 'getProcessResult',
              payload: { processId },
              extData: { bFirst: true, processId }
            });
            dispatch({
              type: 'setData',
              payload: { processId, footer, readOnly, modelType: type },//{save: true, saveAs: true, run: true, deploy: true}
            });
            dispatch({ //获取数据源列表
              type: 'getDataResourceList',
              // payload: {sceneId: (data.SCENE_ID || 'ALL'), userName: data.USERNAME, limit: 10, pageNo: 1, sourceId:'', startTime: '', endTime: ''}
              payload: {sceneId: (data.SCENE_ID || 'ALL'), userName: user.username, flag: 'dataSource'}
            })
          }else {
            message.error('未选择流程图！');
          }
        }
      })
    }
  },

  effects: {
    *queryProcess({payload = {}, extData = {}}, {call, put}){
      let result = yield call(queryProcess, payload);
      if(checkResult(result)){
        message.success('查询成功！');
        const processData = getProcessData(result);
        yield put({
          type: 'setModelData',
          payload: {
            processData,
            processDataSrc: result.data,
            processState: extData.processState || []
          }
        });
        yield put({
          type: 'showModel',
          payload: {},
        })
      }
    },
    *saveProcess({payload = {}, extData = {}}, {call, put}){
      let result = yield call(saveProcess, payload);
      if (checkResult(result)) {
        message.success('保存成功！');
        console.log(result, extData)
        const { modelType } = extData, { processId } = result.data, data = {};
        if(modelType === 'model'){ //特殊处理
          let { footer = {} } = extData;
          footer.update = footer.save;
          delete footer.save;
          data.footer = footer;
        }
        if(modelType === 'prediction'){ //跳转到我的项目
          yield put({
            type: "@@router/CALL_HISTORY_METHOD",
            payload: {
              "method": "push",
              "args": [{pathname: '/myProject',}]
            }
          });
        }else{
          yield put({
            type: 'setData',
            payload: {
              ...data,
              processId
            }
          });
          yield put({ //重新查询流程图
            type: 'queryProcess',
            payload: {
              processId
            }
          });
        }
      }
    },
    *updateProcess({payload = {}}, {call, put}){
      let result = yield call(updateProcess, payload);
      if (checkResult(result)) {
        message.success('更新成功！');
        const { processId } = payload;
        yield put({ //获取流程图数据 先获取状态
          type: 'queryProcess',
          payload: { processId },
          extData: { bFirst: true, processId }
        });
      }
    },
    *runProcess({payload = {}}, {call}){
      let result = yield call(runProcess, payload);
      if (checkResult(result)) {
        console.log(result)
      }
    },
    *publishProcess({payload = {}}, {call}){
      let result = yield call(publishProcess, payload);
      if (checkResult(result)) {
        message.success('发布成功！');
        console.log(result)
      }
    },
    *getProcessResult({payload = {}, extData = {}}, {call, put}){
      let result = yield call(getProcessResult, payload);
      if (checkResult(result)) {
        const processState = result.data || [];
        yield put({
          type: 'updateProcessStatus',
          payload: {
            processState
          }
        })
        if(extData.bFirst){
          const { processId } = extData;
          yield put({ //获取流程图数据
            type: 'queryProcess',
            payload: { processId },
            extData: { processState }
          });
        }
      }
    },
    *getDataResourceList({payload = {}}, {call, put}){
      let result = yield call(pageParams, payload);
      if (checkResult(result)) {
        yield put({
          type: 'setData',
          payload: {
            dataResource: result.data
          }
        })
      }
    },
  },

  reducers: {
    showModel(state){
      return {
        ...state,
        processVisible: true,
      }
    },
    hideModel(state){
      return {
        ...state,
        processVisible: false,
      }
    },
    setData(state, {payload}){
      return {
        ...state,
        ...payload,
      }
    },
    setModelData(state, {payload}){ //流程图数据
      const { processData, processDataSrc, processState } = payload;
      return {
        ...state,
        processData,
        processDataSrc,
        processState,
      }
    },
    updateProcessStatus(state, {payload}){ //更新流程图状态
      const { processState } = payload;
      return {
        ...state,
        processState
      }
    },
  }
})

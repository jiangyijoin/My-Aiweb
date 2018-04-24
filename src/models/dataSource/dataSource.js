import modelExtend from 'dva-model-extend'
import { pageModel,checkResult } from 'models/common/common'
import { config } from 'utils'
const { prefix } = config
import { message } from 'antd';
import moment from 'moment';
import {dataResourceList,deleteById,previewFiles,uploadFile,insertDataResource,AIScenesList,params} from "services/dataSource/dataSourceService"
//从models/commmon/common/pageModel继承模型
export default modelExtend(pageModel, {
  namespace: 'dataSource',
  state: {
    common:{sceneId:'ALL',sourceId:"" ,startTime:'',endTime:''},//保存组件状态
    dateSourceList:{"elements":[],"total":0,"pageNo":0,"pageNum":0,"pageSize":10,loading:true},//数据源列表
    prams:{sceneId:'ALL',sourceId:"",userName:user.username,limit:10,pageNo:1,startTime:'',endTime:''},//查询参数
    visible1:false,//主页面预览模态框是否弹出
    previewList:[],//预览数据列表
    scenesList:[],//场景列表,
    fileList:[],//不同场景，文件列表不同，默认为所有场景的文件

  },

  subscriptions:{
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/dataSource') {
          clearInterval(window.TIMER);
        }
      })
      dispatch({
        type:"dataResourceList",
        payload:{sceneId:'ALL',sourceId:"",userName:user.username,limit:10,pageNo:1,startTime:'',endTime:''}
      });
      dispatch({
        type:"AIScenesList",
        payload:{userName:'SYSTEM'}
      });
      dispatch({
        type:"params",
        payload:{flag:'dataSource',sceneId:'ALL',userName:user.username}
      });
    },
  },
  //异步操作调用函数模块，这里需要创建的是 Generator函数
  effects: {
    *dataResourceList ({ payload = {} }, { call, put }) {
      payload.limit=5;
      const data = yield call(dataResourceList, payload);
      if(checkResult(data)){
        yield put({//表示下一步调用哪个方法
          type: 'setSourceList',//表示下个方法的名称
          payload: {
            list: data//表示传给下一个方法的参数
          }
        });
      }
    },
    *deleteById ({ payload = {} }, {select, call, put }) {
      const prams = yield select(state => state.dataSource.prams);
      const data = yield call(deleteById, payload)
      if (data &&data.success) {
        message.success("删除成功")
        yield put({
          type:"dataResourceList",
          payload:prams
        });
        yield put({
          type:"params",
          payload:{flag:'dataSource',sceneId:'ALL',userName:user.username}
        })
      }else{
        message.error("删除失败")
      }
    },
    *previewFiles ({ payload = {} }, { call, put }) {
      const data = yield call(previewFiles, payload)
      if(checkResult(data)){
        yield put({
          type:"setModel1AndPreview",
          payload: data
        });
      }
    },
    *uploadFile ({ payload = {} }, { call, put }) {
      const data = yield call(uploadFile, payload)
      if (data &&data.success) {
        // yield put({
        //   type:"setModel1AndPreview",
        //   payload: data
        // });
      }
    },
    *insertDataResource ({ payload = {} }, { select,call, put }) {
      const prams = yield select(state => state.dataSource.prams);
      const data = yield call(insertDataResource, payload)
      if (data &&data.success) {
        message.success("数据源导入成功")
        yield put({
          type:"dataResourceList",
          payload:prams
        });
        yield put({
          type:"params",
          payload:{flag:'dataSource',sceneId:'ALL',userName:user.username}
        })
      }
      if(!data.success){
        message.error("数据源导入失败")
      }
    },
    *AIScenesList ({ payload = {} }, { call, put }) {
      const data = yield call(AIScenesList, payload)
      if(checkResult(data)){
          yield put({
            type:"setScenesList",
            payload: data
          });
      }
    },
    *params ({ payload = {} }, { call, put }) {
      if(payload.sceneId==undefined){
        payload.sceneId="ALL"
      }
      console.log(payload)
      const data = yield call(params, payload)
      if(checkResult(data)){
        yield put({
          type:"setFileList",
          payload: data
        });
      }
    }
  },

  reducers:{
    setSourceList(state, { payload }) {
      let dateSourceList=payload.list.data;
      if(dateSourceList==null){
        dateSourceList=state.dateSourceList
      }
      dateSourceList.loading=false;
      return {
        ...state,
        dateSourceList
      }
    },
    setPrams(state, { payload }) {
      const prams=payload;
      return {
        ...state,
        prams
      }
    },
    setModel1AndPreview(state, { payload }) {
      const visible1=true;
      let previewList=[];
      if(payload.success){
        previewList=payload.data;
      }
      return {
        ...state,
        visible1,
        previewList
      }
    },
    changeState(state, { payload }) {
      if(payload.key=="visible1"){
        const visible1=payload.value;
        return {
          ...state,
          visible1
        }
      }
    },
    changeCommon(state, { payload }) {
      const common=state.common;
      if(payload.key=="sceneId"){

        common.sceneId=(payload.value==undefined)?"ALL":payload.value;
        console.log(common.sceneId)
      }
      if(payload.key=="sourceId"){
        common.sourceId=(payload.value==undefined)?"":payload.value;
        common.sourceId=payload.value;
      }
      if(payload.key=="startTime"){
        let time=moment(payload.value).format('YYYYMMDDhh');

        common.startTime=time;
        if(payload.value==null){
          common.startTime="";
        }
      }
      if(payload.key=="endTime"){
        let time=moment(payload.value).format('YYYYMMDDhh');
        common.endTime=time;
        if(payload.value==null){
          common.endTime="";
        }
      }
      return {
        ...state,
        common
      }
    },
    setScenesList(state, { payload }) {
        const scenesList=payload.data;
        return {
          ...state,
          scenesList
        }
    },
    setFileList(state, { payload }) {
      const fileList=payload.data;
      return {
        ...state,
        fileList
      }
    },
    setLoading(state, { payload }) {
      let dateSourceList=state.dateSourceList;
      dateSourceList.loading=true;
      return {
        ...state,
        dateSourceList
      }
    }

  }
})

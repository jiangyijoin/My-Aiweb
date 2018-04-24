import modelExtend from 'dva-model-extend'
import { prefix } from 'config'
import {message} from 'antd';
const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};

const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0,
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
});

const checkResult = (result) => {
  let bSuccess = false;
  if (result.success){
    bSuccess = true;
  }else {
    message.error(result.msg);
  }
  return bSuccess;
};

const getProcessData = (result) => {
  const modelData = {
    connections: [],
    nodes: []
  };
  const processData = { modelData };
  const { data = {} } = result;
  processData.name = data.PROCESS_NAME;
  processData.id = data.PROCESS_ID;
  processData.desc = data.PROCESS_DESC;
  processData.sourceId = data.SOURCE_ID;
  processData.timestamp = `${data.SOURCE_ID}_${+new Date()}`;
  processData.userName = data.USERNAME;
  const { cmptlst = [], relationlst = [] } = data;
  cmptlst.forEach((item) => {
    const { info } = item;
    modelData.nodes.push({
      id: info.PCMPT_ID,
      config: {
        pcmptId : info.PCMPT_ID,
        label: info.PCMPT_NAME,
        type: info.BCMPT_ID,
        icon: info.BCMPT_ICON,
        state: '',
        layoutX: info.LAYOUT_X,
        layoutY: info.LAYOUT_Y,
        isProcessEntrance: info.IS_PROCESS_ENTRANCE,
        paramslst: info.paramslst
      }
    })
  });
  modelData.connections = relationlst.map((i) => {
    const { sourceCmpt, targetCmpt } = i;
    return {
      sourceId: sourceCmpt.FATHER_PCMPT_ID,
      sourcePort: sourceCmpt.FATHER_PCMPT_INTF_ORDER,
      targetId: targetCmpt.PCMPT_ID,
      targetPort: targetCmpt.PCMPT_INTF_ORDER,
      desc: targetCmpt.INFO_DESC
    }
  });
  console.log('modelData',processData,result);
  return processData;
};
module.exports = {
  model,
  pageModel,
  checkResult,
  getProcessData
};

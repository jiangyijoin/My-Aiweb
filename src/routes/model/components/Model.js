/**
 * Created by PanStar on 2018/2/26.
 */
import PropTypes from 'prop-types'
import cs from 'classnames'
import { uuid, camelCase } from 'utils'
import { Input, InputNumber, Button, Checkbox, Select, Icon, Modal, Form, Row, Col, message } from 'antd'
import { CustomDAG, FileGrid } from 'components'
import ModalProject from './ModalProject'
import { previewPictureUrl } from 'services/manager/process'
import styles from './Model.less'

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { DagCustom } = CustomDAG;

const { user = {}} = window;
// const formItemLayout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 14 },
// };
const formItemLayout = null;
const transObj = (obj1 = {}) => {
  const obj2 = {};
  for(let key in obj1){
    obj2[camelCase(key.toLocaleLowerCase())] = obj1[key];
  }
  return obj2;
};
const copyString = (a = {}, b = {}) => {
  for(let key in b){
    if(typeof b[key] !== 'object'){
      a[camelCase(key.toLocaleLowerCase())] = b[key];
    }
  }
};
const getLayout = (id) => {
  let layout = { };
  const obj = document.getElementById(id);
  if(obj){
    const style = getComputedStyle(obj);
    layout = {
      left: parseInt(style.left),
      top: parseInt(style.top)
    };
  }
  return layout;
}
//流程图数据转换
const data2result = (data = {}, dataSrc = {}, isNew) => {
  const { relationlst = [], cmptlst = [], metaDataCollst = [] } = dataSrc;
  const pcmptMap = {};
  if(isNew){
    cmptlst.forEach(i => {
      const { info = {} } = i;
      pcmptMap[info.PCMPT_ID] = uuid.v4().replace(/\-/g,'');
    })
  }

  const result = { //暂时只支持修改组件参数
    relationlst: relationlst.map(i => {
      const sourceCmpt = transObj(i.sourceCmpt);
      const targetCmpt = transObj(i.targetCmpt);
      //修改组件ID
      if(sourceCmpt.fatherPcmptId in pcmptMap)sourceCmpt.fatherPcmptId = pcmptMap[sourceCmpt.fatherPcmptId];
      if(targetCmpt.pcmptId in pcmptMap)targetCmpt.pcmptId = pcmptMap[targetCmpt.pcmptId];
      return {
        sourceCmpt,
        targetCmpt,
      }
    }),
    infolst: cmptlst.map(i => {
      const { info = {} } = i;
      const { paramslst = {}, transeformlst = {} } = info;
      const newData = data[info.PCMPT_ID] || {};
      const layout = getLayout(info.PCMPT_ID);
      const { left = info.LAYOUT_X, top = info.LAYOUT_Y } = layout;
      console.log('getLayout', info.BCMPT_ID, layout)
      return {
        bcmptId: info.BCMPT_ID,
        isProcessEntrance: info.IS_PROCESS_ENTRANCE,
        layoutX: left,
        layoutY: top,
        pcmptId: pcmptMap[info.PCMPT_ID] || info.PCMPT_ID,
        pcmptName: info.PCMPT_NAME,
        sourceId: newData.sourceId || (Model.IsBadValue(info.SOURCE_ID) ? '' : info.SOURCE_ID),
        paramslst: paramslst.map(m => {
          let value = m.PCMPT_PARAM_VALUE;
          if(m.PCMPT_PARAM_KEY in newData){
            value = newData[m.PCMPT_PARAM_KEY]
          }else if(Model.IsBadValue(value)){
            value = m.BCMPT_PARAM_DVALUE;
          }
          return {
            bcmptParamId: m.BCMPT_PARAM_ID,
            pcmptParamKey: m.PCMPT_PARAM_KEY,
            pcmptParamValue: value //保存修改后的参数
          }
        }),
        transeformlst: transeformlst.map(n => {
          return {
            inputColKey: n.INPUT_COL_KEY,
            inputColValue: n.INPUT_COL_VALUE,
            outputName: n.OUTPUT_NAME,
            retainOrcol: n.CAN_RETAIN_ORCOL,
            transformId: n.TRANSFORM_ID
          }
        }).filter(n => !Model.IsBadValue(n.inputColValue)),//过滤空字段
      }
    }),
    metaDataCollst: metaDataCollst.map(i => {
      return transObj(i)
    })
  };
  copyString(result, dataSrc);
  if('sourceId' in data){ //保存修改后的数据源
    result.sourceId = data.sourceId;
  }
  if(isNew){
    result.username = user.username;
  }
  // result.relationlst = result.relationlst.splice(0, 4);
  // result.infolst = result.infolst.splice(0, 4);

  console.log('data2result-data', data);
  console.log('data2result-dataSrc', dataSrc);
  console.log('data2result-result', result);
  return result;
};

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '', //当前弹窗类型
      saveModalVisible: false, //项目保存
      deployModalVisible: false, //项目发布
      previewModalVisible: false, //文件预览
      worked: -2, //是否运行完成
      compState: {}, //预览文件数据
      currentComp: {}, //当前组件
      newData: {}, //最新数据
    };
    this.checkState = this.checkState.bind(this);
    this.startTimer = this.startTimer.bind(this);
    if(this.checkState() === 1){
      this.startTimer();
    }
    console.log('props', props);
  }
  static IsBadValue(value) {
    return value === undefined || value === null;
  }
  static saveExecute(func, funcSave) {
    if(func && typeof func === 'function'){
      func()
    }else if(funcSave && typeof funcSave === 'function'){
      funcSave()
    }
  };
  static getName(cfg, def) { //获取按钮的名称
    return typeof cfg === 'boolean' ? def : cfg;
  };
  componentWillReceiveProps() {
    const worked = this.checkState();
    this.setState({
      worked
    })
  }
  // 0 运行成功 1 运行中 -1 运行失败 -2 未运行
  checkState(){//检查当前是否是运行状态
    const { processData, processState } = this.props.dataSource;
    const nodes = processData.modelData.nodes;
    let result = -2;//未运行
    if(processState.filter(i => i.resultCode == -1).length > 0){//运行失败
      result = -1;
    }else if(nodes.length > 0 &&
      nodes.length === processState.length &&
      processState.filter(i => i.resultCode > 0).length === 0){//运行成功
      result = 0;
    }else if(processState.length > 0){//运行中
      result = 1;
    }
    return result;
  }
  doUpdate(data) {
    Model.saveExecute(() => this.props.doUpdate(data));
  };
  doSave(data) {
    Model.saveExecute(() => this.props.doSave(data));
  };
  doWork() {
    if(this.checkState() !== 1){
      Model.saveExecute(this.props.doWork);
    }else{
      message.warning('正在运行中...');
    }
    this.startTimer();
  };
  startTimer() {
    clearInterval(window.TIMER);
    window.TIMER = setInterval(this.getResult.bind(this), 2000);
  }
  previewData(compState) {
    console.log('数据预览', compState);
    this.setState({
      previewModalVisible: true,
      compState
    })
  };
  getResult() {
    Model.saveExecute(this.props.getResult);
    console.log('getResult',this.props.dataSource);
    const result = this.checkState();
    if (result === 1){
      console.log('运行中！');
    }else if(result !== -2){
      clearInterval(window.TIMER);
      console.log('运行结束！');
      if (result === -1){
        message.warning('运行失败！');
      }else if(result === 0){
        message.success('运行成功！');
      }
    }
    this.setState({
      worked: result
    });
  };
  onClose() {
    Model.saveExecute(this.props.onClose, () => {history.go(-1);})
  };
  onChange(key, newValue) {
    console.log('onChange', key, newValue);
    if(Array.isArray(newValue)) newValue = newValue.join(',');
    const { newData, currentComp } = this.state;
    const compParam = newData[currentComp.pcmptId] || {};
    compParam[key] = newValue;
    newData[currentComp.pcmptId] = compParam;
    if(key === 'sourceId'){
      newData[key] = newValue;
    }
    this.setState({
      newData
    });
  };
  //项目保存
  showSaveModal(modalType) {
    this.setState({
      modalType,
      saveModalVisible: true
    })
  };
  onSaveOk(item = {}){
    const { modalType } = this.state;
    const bSave = modalType === 'save';
    const data = data2result(this.state.newData, this.props.dataSource.processDataSrc, bSave);
    data.processName = item.name;//保存修改后的流程名称
    if(bSave){
      this.doSave(data);
    }else{
      this.doUpdate(data);
    }
    this.setState({
      saveModalVisible: false
    })
  };
  //项目发布
  showDeployModal() {
    this.setState({
      deployModalVisible: true
    })
  };
  onDeployOk(item = {}){
    const processData = data2result({}, this.props.dataSource.processDataSrc, true);
    processData.username = 'DEPLOY';
    processData.processName = item.name;
    const data = {
      userName: user.username,
      processId: processData.processId,
      forecastName: item.name,
      data: processData,
    };
    this.props.doDeploy(data);
    this.setState({
      deployModalVisible: false
    })
  };
  renderComp(state, props) {
    const { currentComp = {}, newData = {} } = state;
    const { processData = {}, processState = [], dataResource = [] } = props.dataSource;
    const disabled = props.readOnly;
    const compData = currentComp.paramslst || [];
    const compState = processState.filter(i => i.pcmptId === currentComp.pcmptId)[0] || {};
    const buttonVisible = !!compState.csvPath || !!compState.picPath || !!compState.txtPath;
    return <Form style={{padding: 20}}>
            {/*<FormItem key="label" label="节点名称"  {...formItemLayout}>{currentComp.label}</FormItem>*/}
            {!!currentComp.isProcessEntrance && <FormItem key="dataResource" label="数据源" {...formItemLayout}>
              <Select onChange={this.onChange.bind(this, 'sourceId')} defaultValue={processData.sourceId} disabled={disabled}>
                {dataResource.map(i => {return <Option key={i.SOURCE_ID} value={i.SOURCE_ID}>{i.SOURCE_NAME}</Option>})}
              </Select>
            </FormItem>}
            {compData.map(item => {
                  let comp = undefined;
                  let value = item.PCMPT_PARAM_VALUE;
                  let name = item.BCMPT_PARAM_NAME;
                  const key = item.BCMPT_PARAM_KEY;
                  const type = item.BCMPT_PARAM_TYPE;
                  if(Model.IsBadValue(value))value = item.BCMPT_PARAM_DVALUE;
                  if(key in newData) value = newData[key];
                  if(type === 1){
                    comp = <Input defaultValue={value} onChange={this.onChange.bind(this, key)} disabled={disabled}></Input>;
                    if(item.BCMPT_PARAM_VALUE_UP || item.BCMPT_PARAM_VALUE_DOWN){
                      let max = item.BCMPT_PARAM_VALUE_UP , min = item.BCMPT_PARAM_VALUE_DOWN;
                      if(Model.IsBadValue(max))max = undefined;
                      if(Model.IsBadValue(min))min = undefined;
                      comp = <InputNumber max={max} min={min} defaultValue={value} disabled={disabled}
                                          onChange={this.onChange.bind(this, key)} ></InputNumber>;
                    }
                  }else if(type === 2){
                    const options = item.BCMPT_PARAM_VALUE_ENUM.split(',');
                    comp = <CheckboxGroup defaultValue={value.split(',')}
                                          options={options.map(i => { return { label: i, value: i }})}
                                          onChange={this.onChange.bind(this, key)} disabled={disabled}
                            ></CheckboxGroup>
                  }else if(type === 3){
                    const options = item.BCMPT_PARAM_VALUE_ENUM.split(',');
                    comp = <Select onChange={this.onChange.bind(this, key)} defaultValue={value} disabled={disabled}>
                              {options.map(i => {return <Option key={i} value={i}>{i}</Option>})}
                          </Select>
                  }
                  // if(name.length > 6){ //过长的名称用...代替
                  //   if(name.replace(/[a-z A-Z]/g,'').length < 3){
                  //     if(name.length > 10){
                  //       name = name.substring(0, 10) + '...';
                  //     }
                  //   }else{
                  //     name = name.substring(0, 5) + '...';
                  //   }
                  // }

                  return <FormItem {...formItemLayout} key={item.BCMPT_PARAM_ID}
                                   label={<span title={item.BCMPT_PARAM_NAME}>{name}</span>}>{comp}</FormItem>
              })
            }
            {<FormItem key="previewData" {...formItemLayout}>
              <Button type="primary" className={cs({hide:!buttonVisible, fr: true})} onClick={this.previewData.bind(this, compState)}>数据预览</Button>
            </FormItem>}
          </Form>
  };
  render() {
    const { processData, processState, footer} = this.props.dataSource;
    const dagProps = {
      dataSource: processData.modelData,
      timestamp: processData.timestamp,
      processState,
      func: {
        onClick: (item) => {
          console.log('onClick comp',item);
          if(item.state === 'error'){
            message.error(item.stateInfo.exception);
          }
          this.setState({
            currentComp: item
          })
        }
      }
    };
    const { picPath, storageId } = this.state.compState;
    const processName = processData.name; //流程图名称
    const { currentComp, worked } = this.state;
    const compName =  currentComp.label; //组件名称
    const bWorking = worked === 1;
    return (
      <div className={styles.model} style={{display: this.props.visible ? '' : 'none'}}>
        <div className="p-part-left" style={{ width: '75%' }}>
          <div className="p-top">{processName}</div>
          <div className="p-content" style={{overflow: 'hidden'}}><DagCustom {...dagProps} ref="dag"/></div>
          <div className="p-footer">
            <Button type="primary" className={cs({hide:!this.props.doSave})}
                    onClick={this.showSaveModal.bind(this, 'save')} disabled={bWorking}>
              {Model.getName(footer.save, '保存')}</Button>
            <Button type="primary" className={cs({hide:!this.props.doUpdate})}
                    onClick={this.showSaveModal.bind(this, 'update')} disabled={bWorking}>
              {Model.getName(footer.update, '修改')}</Button>
            <Button type="primary" className={cs({hide:!this.props.doWork})}
                    onClick={this.doWork.bind(this)} disabled={bWorking || processData.userName === 'SYSTEM'}>
              {Model.getName(footer.run, '运行')}</Button>
            <Button type="primary" className={cs({hide:!this.props.doDeploy})}
                    onClick={this.showDeployModal.bind(this)} disabled={worked !== 0}>
              {Model.getName(footer.deploy, '发布')}</Button>
          </div>
        </div>
        <div className="p-part-right" style={{ width: '25%' }}>
          <div className="p-top">{compName}</div>
          <div className="p-content">{this.renderComp(this.state, this.props)}</div>
        </div>
        <div className="p-close" >
          <Icon className="p-icon" type="close" title="关闭" onClick={this.onClose.bind(this)}></Icon>
        </div>
        {this.state.previewModalVisible && <Modal
          title="文件预览"
          visible={this.state.previewModalVisible}
          width="900px"
          onOk={()=> this.setState({previewModalVisible: false})}
          onCancel={()=> this.setState({previewModalVisible: false})}
        ><Row gutter={24}>
          <Col span={!!picPath ? 12 : 24}><FileGrid params={this.state.compState} /></Col>
          <Col span={12}>{!!picPath &&
              <img alt="img" style={{width: '100%'}} src={`${previewPictureUrl}?storageId=${storageId}&remotePath=${picPath}`}></img>}</Col>
        </Row>
        </Modal>}
        {this.state.saveModalVisible && <ModalProject
          title="项目保存"
          visible={this.state.saveModalVisible}
          dataSource={{
            desc: "您正在保存该流程及参数为 我的项目",
            name: processData.name,
            placeholder: "项目名称"
          }}
          onOk={this.onSaveOk.bind(this)}
          onCancel={()=> this.setState({saveModalVisible: false})}
        ></ModalProject>}
        {this.state.deployModalVisible && <ModalProject
          title="模型发布"
          visible={this.state.deployModalVisible}
          dataSource={{
            desc: "此模型已通过，您正在进行发布，请为该模型命名：",
            name: '',
            placeholder: "模型名称"
          }}
          onOk={this.onDeployOk.bind(this)}
          onCancel={()=> this.setState({deployModalVisible: false})}
        ></ModalProject>}
      </div>
    )
  }
}

Model.propTypes = {
  onClose: PropTypes.func,
  doSave: PropTypes.func,
  doUpdate: PropTypes.func,
  doWork: PropTypes.func,
  doDeploy: PropTypes.func,
};

export default Model

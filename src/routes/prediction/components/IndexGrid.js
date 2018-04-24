import React, { Component, PropTypes } from 'react'
import { Modal, Select, message, DatePicker, Button, Icon } from 'antd'
import { Table } from 'firebrand-component'
import { predictHistory, queryMoldeSource } from 'services/prediction/predictionServer'
import ForecastTest from './ForecastTest'
import HistoryGrid from './HistoryGrid'
import style from "./IndexGrid.less"

class IndexGrid extends React.Component {
  constructor(props) {//构造函数
    super(props);
    this.state = {
      res: [],
      res_: [],
      sceneId: '0000',
      forecastId: '',
      startTime: '',
      endTime: '',
      pageNo: '1',
      limit: '10',
      fromDataS: [],
      testDataS: [],
      forecName: [],
    };
    this.columns = [
      {title: '序号', dataIndex: 'keyNum',key: 'keyNum',width:30},
      {title: '场景',dataIndex: 'SCENE_NAME',key: 'SCENE_NAME',width:100},
      {title: '模型名',dataIndex: 'FORECAST_NAME',key: 'FORECAST_NAME',width:100},
      {title: '发布时间', dataIndex: 'RELEASE_TIME',key: 'RELEASE_TIME',width:100},
      {title: '发布人',dataIndex: 'USERNAME',key: 'USERNAME',width:50},
      {title: '操作',dataIndex: 'OPERATION',key: 'OPERATION',width:100,render: (text, record, index) => (
        <span>
          <a style={{textDecoration: 'underline'}} onClick = {(e) => this.forecastTest(record)} >预测</a>&nbsp;&nbsp;&nbsp;
          <a style={{textDecoration: 'underline'}} onClick = {(e) => this.forecastHistory(record)}>预测历史</a>&nbsp;&nbsp;&nbsp;
          <a style={{textDecoration: 'underline'}} onClick = {this.showModel.bind(this, record)}>模型详情</a>
        </span>
      )},
    ];
    this.loading = true
    this.handleOk1 = this.handleOk1.bind(this);//绑定this
    this.handleCancel1 = this.handleCancel1.bind(this);
  }
  handleScenesChange(value) {
    if(value!=''&&value!=undefined){
      this.state.sceneId = value
    }else {
      this.state.sceneId = 'ALL'
    }
  }
  handleForecChange(value) {
    if(value!=''&&value!=undefined){
      this.state.forecastId = value
    }else {
      this.state.forecastId = ''
    }

  }
  queryPrediction = (e) => {
    let dispatch = this.props.dispatch
    let time_1 = document.getElementsByClassName("ant-input")[0].value
    let time_2 = document.getElementsByClassName("ant-input")[1].value
    if(time_1 != '' && time_2 != '') {
      let test = (time_1.replace(/\W|_/g, '')+'00')
      let test2 = (time_2.replace(/\W|_/g, '')+'00')
      this.state.startTime = test
      this.state.endTime = test2
    }else if(time_1 === '' && time_2 != '') {
      message.warning('请选择发布起始时间！')
    }else if(time_1 != '' && time_2 === '') {
      message.warning('请选择发布终止时间！')
    }
    dispatch({
      type: `predictionData/predictionServer`,
      payload: {sceneId: this.state.sceneId, forecastId: this.state.forecastId, startTime: this.state.startTime, endTime: this.state.endTime, pageNo: '1', limit: '10'}
    })
  }
  forecastTest = (e) => {
    let forecastId = e.FORECAST_ID
    let forecastName = e.FORECAST_NAME
    if(e.SCENE_ID){
      this.state.sceneId = e.SCENE_ID
    }
    let previewPrams = {flag: 'dataSource', sceneId: this.state.sceneId, userName: user.username};
    let dataSource = [];
    queryMoldeSource(previewPrams).then((list)=>{
      if(list.msg) {
        let dataItem = list.data;
        if(dataItem != "" && dataItem != null && dataItem.length !=0) {
          for (let i = 0; i < dataItem.length; i++) {
            let item = ""
            item = dataItem[i]
            if(item.SOURCE_NAME != ''){
              dataSource.push({SOURCE_ID: item.SOURCE_ID, SOURCE_NAME: item.SOURCE_NAME, forecastId: forecastId})
            }else {
              console.log("无数据源")
            }
          }
          console.log("有数据1！")
          this.setState({
            previewPrams:previewPrams,
            hisTitle: forecastName,
            testDataS: dataSource,
            visible: true,
          });
        }else {
          console.log("无数据1！")
          this.setState({
            previewPrams:previewPrams,
            hisTitle: forecastName,
            testDataS: dataSource,
            visible: true,
          });
        }
      }else {
        console.log("无数据2！")
        console.log(list)
        this.setState({
          previewPrams:previewPrams,
          hisTitle: forecastName,
          testDataS: dataSource,
          visible: true,
        });
      }
    })
  }

  /*forecastHistory = (e) => {
    let forecId = e.FORECAST_ID
    let forecName = e.FORECAST_NAME
    let previewPrams={forecastId: forecId, pageNo: '1', limit: '10'}
    let listDa=[]
    predictHistory(previewPrams).then((list)=> {
      if (list.msg) {
        listDa = list.data
        console.log("listDa数据")
        console.log(listDa)
        if(listDa!='' || listDa.length>0){
          console.log("有数据1！")
          //fromDataS.push({gridData:gridData,pagination:pagination})
          this.setState({
            hisPrams: previewPrams,
            hisTitle: forecName,
            fromDataS: listDa,
            visible1: true,
          });
        }else {
          console.log("无数据！")
          this.setState({
            hisPrams: previewPrams,
            hisTitle: forecName,
            fromDataS: listDa,
            visible1: true,
          });
        }
        console.log("有数据2！")
        this.setState({
          hisPrams: previewPrams,
          hisTitle: forecName,
          fromDataS: listDa,
          visible1: true,
        });
      }
    })
  }*/
  forecastHistory = (e) => {
    let forecId = e.FORECAST_ID
    let forecName = e.FORECAST_NAME
    let dispatch = this.props.dispatch
    dispatch({
      type: `predictionData/predictHistory`,
      payload: {forecastId: forecId, pageNo: '1', limit: '10'}
    })
    this.setState({
      hisTitle: forecName,
      visible1: true,
    });
  }
  showModel = (e) => {
    // message.warning("开发中...")
    this.props.dispatch({
      "type": "@@router/CALL_HISTORY_METHOD",
      "payload": {
        "method": "push",
        "args": [
          {
            pathname: '/model',
            state: { data: {PROCESS_ID: e.SNAP_PROCESS_ID}, footer: {save: '另存为项目'}, readOnly: true, type: 'prediction' }
          }
        ]
      }
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
      testDataS: [],
    })
  }
  handleOk1 = (e) => {
    this.setState({
      visible1: false,
      visible2: false,
    })
  }
  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
      visible2: false,
      testDataS: [],
    })
  }
  componentDidMount() {
    this.loading = false
  }
  /*onClick = (current, pageSize) => {
    let dispatch = this.props.dispatch
    dispatch({
      type: `predictionData/predictionServer`,
      payload: {sceneId: 'ALL', forecastId: '', startTime: '', endTime: '', pageNo: current, limit: pageSize}
    })
  }*/

  render() {
    //let histG = this.props
    const dispatch = this.props
    const { baseInfo = [], scenesInfo = [], modelList = [] } = this.props.dataSource
    let modelD = [], pagination = []
    if(modelList != '' || modelList.length>0){
      this.loading = false
      modelD = modelList.elements
      /*pagination = {
        total: modelList.total,//dataSource.total,
        defaultCurrent: modelList.pageNo,
        pageSize: modelList.pageSize,
        onChange:(current, pageSize) => {
          this.onClick(current, pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          this.onClick(current, pageSize)
        },
        showTotal:(total, range) => {
          return (
            <div>
              <div className="table-div2-bot-left">
              </div>
              <div className="table-div2-bot-right">
                <span>{range[0]}-{range[1]}&nbsp;&nbsp;共 <i>{total}</i> 条数据</span>
              </div>
            </div>
          )
        },
        formatInfo:( total ) => {
          return (
            <span >共 <i>{total}</i> 条数据</span>
          )
        },
      }*/
    }

    const gridData = modelD.map((item, i) => {
      const text = item.RELEASE_TIME;
      let releaseItem = item.RELEASE_TIME;
      if(text != ''|| text.length>0){
        releaseItem = text.substring(0,4)+'-'+text.substring(4,6)+'-'+text.substring(6,8)+' '+text.substring(8,10)+':'+text.substring(10,12)
      }
      return {
        keyNum: i+1,
        FORECAST_ID: item.FORECAST_ID,
        SCENE_ID: item.SCENE_ID,
        PROCESS_ID: item.PROCESS_ID,
        FORECAST_NAME: item.FORECAST_NAME,
        SCENE_NAME: item.SCENE_NAME,
        RELEASE_TIME: releaseItem,
        SNAP_PROCESS_ID: item.SNAP_PROCESS_ID,
        USERNAME: item.USERNAME,
        OPERATION: 'operation'
      }
    })

    const provinceOptions1 = baseInfo.map(
      province => <Select.Option key={province.FORECAST_ID}>{province.FORECAST_NAME}</Select.Option>)
    const provinceOptions = scenesInfo.map(
      province => <Select.Option key={province.PROCESS_ID}>{province.PROCESS_NAME}</Select.Option>)

    return (
      <div className={style['r-j-m']}>
        <div className="r-j-div">
          <div className="r-j-div-1">
            <div className="r-j-div-div">
              <h5 className="r-j-fl"> <i className="anticon iconfont icon-yucemoxing"
                                         style={{ fontSize: 24,color: '#0085d0'}}></i>&nbsp;&nbsp;预测模型
              </h5>
            </div>
          </div>
          <div className="r-j-2">
            <span style={{ width:'100px !important' }}> 场景:</span>
            <Select allowClear placeholder="-请选择-" style={{ width: 140, marginLeft: 15}} onChange={(key) => this.handleScenesChange(key)}>
              {provinceOptions}
            </Select>
            <span style={{marginLeft: 20, width:'100px !important'}}> 模型名:</span>
            <Select allowClear placeholder="-请选择-" style={{ width: 140, marginLeft: 15}} onChange={(key) => this.handleForecChange(key)}>
              {provinceOptions1}
            </Select>
            <span style={{marginLeft: 20, width: '100px !important'}}> 发布时间:</span>
            <DatePicker ref="input" style={{ width: 150, marginLeft: 15}} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm"/>
            <span className="span-time">-</span>
            <DatePicker ref="input" style={{ width: 150}} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm"/>
            <Button type="primary" style={{marginLeft: 20}} onClick={(e) => this.queryPrediction(e)}>查询</Button>
          </div>
          <div className="table-div2" >
            {/*<Table dataSource={gridData} columns={this.columns} loading={this.loading} pagination={pagination} rowKey="keyNum" />*/}
            <Table
              dataSource={gridData}
              pagination={{
                pageSizeOptions: ['5','10','20'],
                pageSize: 5,
              }}
              columns={this.columns}
              loading={this.loading}
              rowKey="id"
              ref="table"
            />
          </div>
          <Modal title={<div>预测-<span style={{color:'#1890ff'}}>{this.state.hisTitle}</span></div>}
                   visible={this.state.visible}
                   onOk={this.hideModal}
                   onCancel={this.hideModal}
                   width={800}
                   maskClosable={false}
                   footer={[
                     <Button ref="noButton" key="submit" type="primary" style = {{ visibility:"inline" }} onClick={this.hideModal}>
                       关闭
                     </Button>
                   ]}
          >
            <ForecastTest {...this.state.testDataS}/>
              {/*<ForecastTest param={this.state.previewPrams} />*/}
          </Modal>{/*//title={"模型预测历史查看-("+this.state.hisTitle+")"}*/}
          <Modal title={<div>模型预测历史-<span style={{color:'#1890ff'}}>{this.state.hisTitle}</span></div>} visible={this.state.visible1} onOk={this.handleOk1} onCancel={this.handleCancel1} width={950} style={{'marginTop':'-50px'}}
                 footer = {[
                   <Button key="submit" type="primary" onClick={this.handleCancel1}>
                     关闭
                   </Button>
                 ]}
          >
            <HistoryGrid {...dispatch}/>
            {/*<HistoryGrid {...this.state.fromDataS} {...dispatch}/>*/}
          </Modal>
        </div>
      </div>
    )
  }
}

export default IndexGrid

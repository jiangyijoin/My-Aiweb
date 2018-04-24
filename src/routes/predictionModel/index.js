import React from 'react'
import { connect } from 'dva'
import { Icon, Button, Select, DatePicker, message } from 'antd'
import IndexGrid from './indexGrid'
import style from './index.less'
import { predictionServer } from 'services/prediction/predictionServer'

const  predictionModule = function ({ dispatch, predictionData }) {
  const { baseInfo,scenesInfo } = predictionData
  let res = []
  let gridData = []
  let showtest = '1'
  let provinceBase = [], provinceD2=[]
  let param = []
  let endTime = '', startTime = '', sceneId = '', forecastId = ''//场景、模型名
  let pageNo = '', limit = ''
  if(predictionData.baseInfo.message) {
    let database = predictionData.baseInfo.list
    if(database != "" && database != null && database.length !=0) {
      for (let i = 0; i < database.length; i++) {
        let item = ""
        item = database[i]
        provinceBase.push({FORECAST_ID: item.FORECAST_ID,FORECAST_NAME: item.FORECAST_NAME})
      }
    }
  }
  if(predictionData.scenesInfo.message) {
    let datascenes = predictionData.scenesInfo.data
    if(datascenes != "" && datascenes != null && datascenes.length != 0) {
      for (let i = 0; i < datascenes.length; i++) {
        let item = ""
        item = datascenes[i]
        provinceD2.push({PROCESS_ID: item.PROCESS_ID, PROCESS_NAME: item.PROCESS_NAME})
      }
    }
  }
  const provinceData = provinceD2
  let provinceOptions = provinceData.map(province => <Select.Option key={province.PROCESS_ID}>{province.PROCESS_NAME}</Select.Option>)
  const provinceModle = provinceBase
  let provinceOptions1 = provinceModle.map(province => <Select.Option key={province.FORECAST_ID}>{province.FORECAST_NAME}</Select.Option>);
  if(predictionData.list.message) {
    let dataItem = predictionData.list.data.elements
    if(dataItem != "" && dataItem != null && dataItem.length !=0) {
      for (let i = 0; i < dataItem.length; i++) {
        let item = ""
        let releaseTime = []
        item = dataItem[i]
        if(item.UPDATE_TIME != ''|| item.UPDATE_TIME != null) {
          let text = item.RELEASE_TIME
          releaseTime = text.substring(0,4)+'-'+text.substring(4,6)+'-'+text.substring(6,8)+' '+text.substring(8,10)+':'+text.substring(10,12)
        }else {
          releaseTime = item.UPDATE_TIME
        }
        gridData.push({ keyNum: i+1, FORECAST_ID: item.FORECAST_ID, SCENE_ID: item.SCENE_ID, FORECAST_NAME: item.FORECAST_NAME, PROCESS_NAME: item.PROCESS_NAME, RELEASE_TIME: releaseTime,
          USERNAME: item.USERNAME })
      }
      const rankData = {
        pageSize: 10,
        total: gridData.length,
        defaultCurrent: 1,
        data: gridData,
      }
      res.push({"rankData": rankData})
    }else {
      const rankData = {
      }
      res.push({"rankData": rankData})
    }
  }else {
    const rankData = {
    }
    res.push({"rankData": rankData, "showtest": showtest})
  }

  class Index extends React.Component {
    state = {
      div: {},
      res_: res,
      sceneId: 'ALL',
      forecastId: forecastId,
      startTime: startTime,
      endTime: endTime,
      pageNo: pageNo,
      limit: limit,
      param: {sceneId: sceneId, forecastId: forecastId, startTime: startTime, endTime: endTime, pageNo: '1', limit: '10'},
    };
    queryPrediction = (e) => {
      alert("123")
    }
    componentDidMount(){
    }
    queryPrediction = (e) => {
      let time_1 = document.getElementsByClassName("ant-input")[0].value
      let time_2 = document.getElementsByClassName("ant-input")[1].value
      if(time_1 != '' && time_2 != '') {
        let test = time_1.replace(/\W|_/g, '')
        let test2 = time_2.replace(/\W|_/g, '')
        this.state.startTime = test
        this.state.endTime = test2
      }else if(time_1 === '' && time_2 != '') {
        message.warning('请选择发布起始时间！')
      }else if(time_1 != '' && time_2 === '') {
        message.warning('请选择发布终止时间！')
      }
      param = {sceneId: this.state.sceneId, forecastId: this.state.forecastId, startTime: this.state.startTime, endTime: this.state.endTime, pageNo: '1', limit: '10'},
      predictionServer(param).then((list) => {
        let res_ = []
        let gridData = []
        if(list.message) {
          let dataItem = list.data.elements
          if(dataItem != "" && dataItem != null && dataItem.length !=0) {
            for (let i = 0; i < dataItem.length; i++) {
              let releaseTime = []
              let item = dataItem[i]
              let text = item.RELEASE_TIME
              if(text.length != 0){
                releaseTime = text.substring(0,4)+'-'+text.substring(4,6)+'-'+text.substring(6,8)+' '+text.substring(8,10)+':'+text.substring(10,12)
              }else {
                releaseTime = item.RELEASE_TIME
              }
              gridData.push({ keyNum: i+1, FORECAST_NAME: item.FORECAST_NAME, PROCESS_NAME: item.PROCESS_NAME, RELEASE_TIME: releaseTime,
                USERNAME: item.USERNAME })
            }
            const rankData = {
              pageSize: 10,
              total: gridData.length,
              defaultCurrent: 1,
              data: gridData,
            }
            res_.push({"rankData": rankData})
          }else {
            const rankData={
            }
            res_.push({"rankData": rankData})
          }
        }else {
          const rankData = {
          }
          res_.push({"rankData": rankData, "showtest": showtest})
        }
        this.state.res_ = res_
        this.setState({ })
      })
    }
    handleScenesChange(value) {
      this.state.sceneId = value
    }
    handleModleChange(value) {
      this.state.forecastId = value
    }

    render() {
      return (
        <div className={style['r-j-m']}>
          <div className="r-j-div">
            <div className="r-j-div-1">
              <div className="r-j-div-div">
                <h5 className="r-j-fl"> <Icon type="share-alt" style={{ fontSize: 24,color: '#0085d0'}}/>&nbsp;&nbsp;预测模型
                </h5>
              </div>
            </div>
            <div className="r-j-2">
              <span style={{ width:'100px !important' }}> 场景:</span>
              <Select defaultValue={"全选"} style={{ width: 100, marginLeft: 15}} onChange={(key) => this.handleScenesChange(key)}>
                {provinceOptions}
              </Select>
              <span style={{marginLeft: 20, width:'100px !important'}}> 模型名:</span>
              <Select defaultValue={''} style={{ width: 130, marginLeft: 15}} onChange={(key) => this.handleModleChange(key)}>
                {provinceOptions1}
              </Select>
              <span style={{marginLeft: 20, width: '100px !important'}}> 发布时间:</span>
              <DatePicker ref="input" style={{ width: 150, marginLeft: 15}} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder="Select Time"/>
              <span style={{width: '100px !important'}}> - </span>
              <DatePicker ref="input" style={{ width: 150}} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder="Select Time"/>
              <Button type="primary" style={{marginLeft: 20}} onClick={(e) => this.queryPrediction(e)}>查询</Button>
            </div>
            <div>
              <IndexGrid dataSource={this.state.res_}/>
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <Index></Index>
  )
}
export default connect(({ dispatch, predictionData }) => ({ dispatch, predictionData }))(predictionModule)


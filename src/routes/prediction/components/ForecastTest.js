import React from 'react'
import 'antd/dist/antd.css'
import ReactDOM from 'react-dom'
import { Button, Select, message } from 'antd'
import { forecastProcess, getForecastResult } from 'services/prediction/predictionServer'
import style from './IndexGrid.less'

class ForecastTest extends React.Component {
  constructor(props) {//构造函数
    super(props);
    this.state = {
      dataSource: [],
      forecastName: '',
      forecastId: '',
      sourceId: '',
    };
  }
  componentWillMount(){
    //this.state.dataSource = this.props
  }
  handleForecChange(value) {

    if(value!=''&&value!=undefined){
      this.state.sourceId = value
    }else {
      this.state.sourceId = ''
    }
  }
  queryPrediction1 = (e) => {
    let fNameId = this.state.sourceId
    if(fNameId.length == 0){
      message.warning("请选择数据源！")
    }else {
      //var noButton = ReactDOM.findDOMNode(this.refs.noButton)
      var peResult = ReactDOM.findDOMNode(this.refs.peResult)
      peResult.style.display = 'block'
      let testDat = this.state.dataSource
      let forecastId = []
      if(testDat!='' || testDat.length>0){
        forecastId = testDat[0].forecastId
      }
      //message.warning("预测需要1-5分钟，稍后可在预测历史中查看预测结果！")
      let Prams={forecastId: forecastId, userName: user.username, sourceId: this.state.sourceId}
      forecastProcess(Prams).then((list)=>{
        if(list.msg) {
          message.success("预测中...")
        }else {
          message.warning("预测失败，请联系管理员！")
        }
      })
    }
  }

  render() {
    let dataItem = this.props
    let arr = Object.keys(dataItem);
    let provinceData = []
    if(arr!='' ||arr.length>0){
      for(let i=0;i<arr.length;i++){
        let item = dataItem[i]
        provinceData.push({SOURCE_ID: item.SOURCE_ID, SOURCE_NAME: item.SOURCE_NAME, forecastId: item.forecastId})
      }
    }
    this.state.dataSource = provinceData
    const provinceOptions = provinceData.map(
      province => <Select.Option key={province.SOURCE_ID}>{province.SOURCE_NAME}</Select.Option>)
    console.log(provinceOptions)
    return (
      <div className={style['r-j-m']}>
        <div className="r-j-div-div2-2-1">
          <span style={{marginLeft: 20, width: '100px !important'}}> 数据源:</span>
          <Select allowClear placeholder='-请选择-' style={{ width: 300, marginLeft: 15}} onChange={(key) => this.handleForecChange(key)}>
            {provinceOptions}
          </Select>
          <span>
              <Button type="primary" style={{marginLeft: 20}} onClick={(e) => this.queryPrediction1(e)}>预测</Button>
            </span>
        </div>
        <div className="r-j-div-div2-2-2">
          <span className="result" style={{marginLeft: 15}}></span>
          <div className="r-j-result" ref="peResult" style={{display: "none"}}>
            <p style={{marginLeft: 20, marginRight: 20, color:'#cccccc'}}>预测需要1-5分钟，稍后可在预测历史中查看预测结果！</p>
            {/*<span className="r-j-result-1" style={{width: '80%', marginLeft: 20, marginRight: 20}}>
            ********************************************************************************************************************************************************************8
            *********************************************************************************************8
            ************************************************************
            </span>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default ForecastTest

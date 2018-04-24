import React from 'react'
import 'antd/dist/antd.css'
import { Button, Select } from 'antd'
import ReactDOM from 'react-dom'
import style from './indexGrid.less'

class Forecast extends React.Component {
  componentDidMount(){
  }

  render() {
    const provinceData = this.props.dataSource[0]
    let provinceOptions = provinceData.map(province => <Select.Option key={province.SOURCE_ID}>{province.SOURCE_NAME}</Select.Option>)
    this.queryPrediction1 = (e) => {
      var noButton = ReactDOM.findDOMNode(this.refs.noButton)
      var peResult = ReactDOM.findDOMNode(this.refs.peResult)
      peResult.style.display = 'block'
    }
    return (
      <div className={style['r-j-m']}>
        <div className="r-j-div-div2-2-1">
          <span style={{marginLeft: 20, width: '100px !important'}}> 数据源:</span>
          <Select defaultValue={''} style={{ width: 300, marginLeft: 15}} onChange={(value) => this.handleProvinceChange2(value)}>
            {provinceOptions}
          </Select>
          <span>
            <Button type="primary" style={{marginLeft: 20}} onClick={(e) => this.queryPrediction1(e)}>预测</Button>
          </span>
        </div>
        <div className="r-j-div-div2-2-2">
          <span className="result" style={{marginLeft: 15}}>预测结果：</span>
          <div className="r-j-result" ref="peResult" style={{display: "none"}}>
            <p style={{marginLeft: 20, marginRight: 20}}>您所选的数据源，数据共**条。</p>
            <span className="r-j-result-1" style={{width: '80%', marginLeft: 20, marginRight: 20}}>
                  ********************************************************************************************************************************************************************8
                  *********************************************************************************************8
                  ************************************************************
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Forecast

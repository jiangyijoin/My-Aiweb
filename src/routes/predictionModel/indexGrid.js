import React from 'react'
import { Table, Modal, Button, Select } from 'antd'
import ReactDOM from 'react-dom'
import style from './indexGrid.less'
import { connect } from 'dva'
import { predictHistory, queryMoldeSource } from 'services/prediction/predictionServer'
import HistoryGrid from './historyGrid'
import Forecast from './forecast'

const IndexGrid = ({ dispatch, dataSource }) => {
  let res = [], res2 = [], res3 = []
  let showtest = '1'
  class IndexBlock extends React.Component {
    columns = [
      {title: '序号', dataIndex: 'keyNum',key: 'keyNum',width:30},
      {title: '模型名',dataIndex: 'FORECAST_NAME',key: 'FORECAST_NAME',width:100},
      {title: '场景',dataIndex: 'PROCESS_NAME',key: 'PROCESS_NAME',width:100},
      {title: '发布时间', dataIndex: 'RELEASE_TIME',key: 'RELEASE_TIME',width:100},
      {title: '发布人',dataIndex: 'USERNAME',key: 'USERNAME',width:50},
      {title: '操作',dataIndex: 'data7',key: 'data7',width:100,render: (text, record, index) => (
        <span>
          <a style={{textDecoration: 'underline'}} onClick = {(e) => this.showModal(record)} >预测</a>&nbsp;&nbsp;&nbsp;
          <a style={{textDecoration: 'underline'}} onClick = {(e) => this.preview1(record)}>预测历史</a>&nbsp;&nbsp;&nbsp;
          <a style={{textDecoration: 'underline'}} onClick = {(e) => this.preview2(index)}>模型详情</a>
        </span>
      )},
    ];

    constructor(props) {
      super(props)
      this.ref = {ref_pre: null, ref_next: null}
      // 设置 initial state
      this.state = {
        data: dataSource,
        pagination: this.pagination_,
        loading: true,
        res:{"showtest": showtest},
        res2: res2,
        res3: res3,
      };

      this.expro_excel = (e) => {
        //alert("daochu")
      }
    }
    componentDidMount() {
      if(dataSource[0].showtest) {
        this.state.loading = false
        this.setState({
          loading: false,
        })
      }else {
        this.state.loading = false
        this.setState({
          loading: false,
        })
      }
    }
    showModal = (e) => {
      let sceneId = e.SCENE_ID
      let userName = e.USERNAME
      let param = {flag: 'dataSource', sceneId: sceneId, userName: userName}
      queryMoldeSource(param).then((list) => {
        let res_ = []
        if(list.message) {
          let dataItem = list.list
          if(dataItem != "" && dataItem != null && dataItem.length !=0) {
            for (let i = 0; i < dataItem.length; i++) {
              let item = ""
              item = dataItem[i]
              res_.push({SOURCE_ID: item.SOURCE_ID, SOURCE_NAME: item.SOURCE_NAME})
            }
            this.state.res = res_
          }
        }else {
          res_.push({"showtest": showtest})
        }
        this.state.res2 = res_
        this.setState({
          visible: true,
        })
      })
    }
    hideModal = () => {
      this.setState({
        visible: false,
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
      })
    }
    preview1 = (e) => {
      let forecastId = e.FORECAST_ID
      let param = {forecastId: forecastId, pageNo: '1', limit: '10'}
      predictHistory(param).then((list) => {
        let res_1 = []
        let gridData = []
        if(list.message) {
          let dataItem = list.data.elements
          if(dataItem != "" && dataItem != null && dataItem.length !=0) {
            for (let i = 0; i < dataItem.length; i++) {
              let resultTime = []
              let item = dataItem[i]
              let text = item.FORECAST_RESULT_TIME
              if(text.length != 0) {
                resultTime = text.substring(0,4)+'-'+text.substring(4,6)+'-'+text.substring(6,8)+' '+text.substring(8,10)+':'+text.substring(10,12)
              }else {
                resultTime = item.FORECAST_RESULT_TIME
              }
              gridData.push({keyNum: i+1,SCENE_NAME: item.SCENE_NAME,FORECAST_NAME: item.FORECAST_NAME,SOURCE_NAME: item.SOURCE_NAME,
                USERNAME: item.USERNAME,FORECAST_RESULT_TIME: resultTime,FORECAST_RESULT_INFO: item.FORECAST_RESULT_INFO,PATH: item.PATH});
            }
            const rankData = {
              pageSize: 10,
              total: gridData.length,
              defaultCurrent: 1,
              data: gridData,
              loading: false,
            }
            res_1.push({"rankData": rankData})
            this.state.res3 = res_1
          }
        }else {
          res_1.push({"showtest": showtest})
        }
        this.state.res3 = res_1
        this.setState({ })
      })
      this.setState({//forecastId=1&pageNo=1&limit=10
        visible1: true,
      })
    }
    preview2 = (e) => {
      alert("占位！")
    }
    handleProvinceChange2(value){
      dataSource = value
    }
    render() {
      this.queryPrepdiction1 = (e) => {
        var noButton = ReactDOM.findDOMNode(this.refs.noButton)
        var peResult = ReactDOM.findDOMNode(this.refs.peResult)
        noButton.style.visibility = 'visible'
        peResult.style.display = 'block'
      }
      const provinceData = this.state.res2
      let provinceOptions = provinceData.map(province => <Select.Option key={province.SOURCE_ID}>{province.SOURCE_NAME}</Select.Option>)
      let gridData = this.state.data[0]
      let grid = []
      let pagination = []
      let columns = []
      if(gridData != "" && gridData != null && gridData != undefined) {
        let datas = gridData.rankData
        columns = datas.colNames
        grid = datas.data
        pagination = {
          total: datas.total,//dataSource.total,
          defaultCurrent: datas.defaultCurrent,
          pageSize: datas.pageSize,
          onChange: (current, pageSize) => {
            this.setState({page: current, size: pageSize})
            this.loadData(current, pageSize)
          },
          showTotal:(total, range) => {
            return (
              <span>{range[0]}-{range[1]}&nbsp;&nbsp;共 <i>{total}</i> 条数据</span>
            )
          },
          formatInfo:(total, activePage) => {
            return (
              <span >共 <i>{total}</i> 条数据</span>
            )
          },
        }
      }
      return (
        <div className={style['r-j-m']}>
          <div className="con">
            <div className="table-div2" >
              <Table dataSource={grid} columns={this.columns} pagination={pagination} loading={this.state.loading} scroll={{ x: 540 }}/>
              <div className="clear"></div>
            </div>
            {/*<Modal title="预测"
                   visible={this.state.visible}
                   onhandleRelease={this.handleSubmit}
                   confirmLoading={this.hideModal}
                   onOk={this.hideModal}
                   onCancel={this.hideModal}
                   width={900}
                   maskClosable={false}
                   footer={[
                     <Button ref="noButton" key="submit" type="primary" style = {{ visibility:"inline" }} onClick={this.hideModal}>
                       关闭
                     </Button>
                   ]}
            >
              <Forecast dataSource={this.state.res2} />
            </Modal>*/}
            <Modal title="模型预测历史查看" visible={this.state.visible1} onOk={this.handleOk1} onCancel={this.handleCancel1} width={900} style={{'marginTop':'-50px'}}
                   footer = {[
                     <Button key="submit" type="primary" onClick={this.handleCancel1}>
                       关闭
                     </Button>
                   ]}
            >
              <HistoryGrid dataSource={this.state.res3} />
            </Modal>
          </div>
        </div>
      );
    }
  }
  return (
    <IndexBlock></IndexBlock>
  )
}

export default connect(({ dispatch }) => ({ dispatch }))(IndexGrid)

import React from 'react'
import { Table } from 'antd'
import { downloadFileUrl } from 'services/prediction/predictionServer'
import 'antd/dist/antd.css'
import { connect } from 'dva'
import style from './indexGrid.less'

function downloadFile(url) {
  var myForm = document.createElement("form")
  myForm.method = "post"
  myForm.target = "_blank"
  myForm.action = url
  document.body.appendChild(myForm)
  myForm.submit()
  document.body.removeChild(myForm)
}

const IndexGrid = ({ dispatch, predictionData, dataSource }) => {

  class IndexBlock extends React.Component {
    columns = [
      {title: '场景', dataIndex: 'SCENE_NAME',key: 'SCENE_NAME',width:50},
      {title: '使用模型', dataIndex: 'FORECAST_NAME',key: 'FORECAST_NAME',width:100},
      {title: '使用数据源', dataIndex: 'SOURCE_NAME',key: 'SOURCE_NAME',width:150,render: (text, record, index) => (
        <span>
          <a style={{textDecoration: 'underline'}} onClick={(e) => this.suedataSource(record)} >{text}</a>&nbsp;&nbsp;&nbsp;
        </span>
      )},
      {title: '预测人', dataIndex: 'USERNAME',key: 'USERNAME',width:50},
      {title: '预测时间', dataIndex: 'FORECAST_RESULT_TIME',key: 'FORECAST_RESULT_TIME',width:100},
      {title: '预测结论', dataIndex: 'FORECAST_RESULT_INFO',key: 'FORECAST_RESULT_INFO',width:100,render: (text, record, index) => (
        <span>
          <a style={{textDecoration: 'underline'}} onClick={(e) => this.resultdataSource(record)} >{text}</a>&nbsp;&nbsp;&nbsp;
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
      };

      this.expro_excel = (e) => {
        //alert("daochu")
      }
    }
    componentDidMount() {
      if(dataSource.showtest) {
        this.state.loading=true
        this.setState({
          loading: true,
        })
      }else {
        this.state.loading = false
        this.setState({
          loading: false,
        })
      }
    }
    suedataSource = (e) => {
      let url = downloadFileUrl +e.PATH
      downloadFile(url)
      return
    }
    resultdataSource = (e) => {
      /*alert("是否下载文件："+e.FORECAST_RESULT_INFO+"  到本地？")
      let rUrl = "./index.js"
      let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
      let isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1
      let link = document.createElement('a');
      link.href = rUrl;
      if (link.download !== undefined) {
        let fileName = rUrl.substring(rUrl.lastIndexOf('/') + 1, rUrl.length);
        link.download = fileName;
      }
      //调用click事件
      if (document.createEvent) {
        let me = document.createEvent('MouseEvents');
        me.initEvent('click', true, true);
        link.dispatchEvent(me);
        return true;
      }*/
    }

    render() {
      console.log(this.state.data)
      let gridData = this.state.data[0]
      let grid = []
      let pagination = []
      let columns = []
      if(gridData != "" && gridData != null && gridData != undefined) {
        let datas = gridData.rankData
        console.log(datas)
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
          <div className="r-j-div">
            <div className="table-div2" >
              <Table dataSource={grid} columns={this.columns} pagination={pagination} loading={this.state.loading} scroll={{ x: 440 }}/>
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <IndexBlock></IndexBlock>
  )
}

export default connect(({ dispatch, predictionData }) => ({ dispatch, predictionData }))(IndexGrid)

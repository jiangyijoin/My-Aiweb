import React from 'react'
import { Table } from 'firebrand-component'
import 'antd/dist/antd.css';
import style from './IndexGrid.less';
import { downloadFileUrl, predictHistory } from 'services/prediction/predictionServer'

function downloadFile(url) {
  var myForm = document.createElement("form")
  myForm.method = "post"
  myForm.target = "_blank"
  myForm.action = url
  document.body.appendChild(myForm)
  myForm.submit()
  document.body.removeChild(myForm)
}
class HistoryGrid extends React.Component {
  constructor(props) {//构造函数
    super(props);
    this.state = {
      pagination: {},
      loading:true,
      dataSource:[],
    };
    this.loading = true;
    this.columns = [
      {title: '场景', dataIndex: 'SCENE_NAME',key: 'SCENE_NAME',width:120},
      {title: '使用模型', dataIndex: 'FORECAST_NAME',key: 'FORECAST_NAME',width:150,
        /*render: (text) => <span className="col-sql" title={text}>{text}</span>*/},
      {title: '使用数据源', dataIndex: 'SOURCE_NAME',key: 'SOURCE_NAME',width:150,render: (text, record, index) => (
        <span>
              <a style={{textDecoration: 'underline'}} onClick={(e) => this.suedataSource(record)} >{text}</a>&nbsp;&nbsp;&nbsp;
            </span>
      )},
      {title: '预测人', dataIndex: 'USERNAME',key: 'USERNAME',width:100},
      {title: '预测时间', dataIndex: 'FORECAST_RESULT_TIME',key: 'FORECAST_RESULT_TIME',width:140},
      {title: '预测结论', dataIndex: 'frInfoPathName',key: 'frInfoPathName',width:170,render: (text, record, index) => (
        <span className="col-sql" title={text}>
              <a style={{textDecoration: 'underline'}} onClick={(e) => this.resultdataSource(record)} >{text}</a>&nbsp;&nbsp;&nbsp;
            </span>
      )},
      {title: '预测状态', dataIndex: 'FORECAST_RESULT_STATUS',key: 'FORECAST_RESULT_STATUS',width:100},
    ];
  }
  suedataSource = (e) => {
    let url = downloadFileUrl +e.PATH+"&storageId="+e.STORAGE_ID
    downloadFile(url)
    return
  }
  resultdataSource = (e) => {
    //message.warning("待确认需求...")
    let url = downloadFileUrl +e.frInfoPath+"&storageId="+e.STORAGE_ID
    downloadFile(url)
    return
  }
  componentDidMount() {
    this.loading = false
  }
  onClick = (current, pageSize) => {
    let iemtmD = this.props.historyInfo.data.elements[0]
    let dispatch = this.props.dispatch
    dispatch({
      type: `predictionData/predictHistory`,
      payload: {forecastId: iemtmD.FORECAST_ID, pageNo: current, limit: pageSize}
      //forecastId=:forecastId&pageNo=:pageNo&limit=:limit
    })
  }

  render() {
    let histG = this.props.historyInfo
    let modelD = [], mdat = [], pagination = [], gridData = []
    if(histG != '' || histG.length>0){
      this.loading = false
      let mdat = histG.data
      if(mdat!=0 || mdat.length>0){
        modelD = mdat.elements
      }
      gridData = modelD.map((item, i) => {
        const text = item.FORECAST_RESULT_TIME;
        let frTime = item.FORECAST_RESULT_TIME;
        if(text != ''|| text.length>0){
          frTime = text.substring(0,4)+'-'+text.substring(4,6)+'-'+text.substring(6,8)+' '+text.substring(8,10)+':'+text.substring(10,12)
        }
        const text1 = item.FORECAST_RESULT_STATUS
        let status = item.FORECAST_RESULT_STATUS
        if(text1 != ''|| text1.length>0){
          if(text1 === '0'){
            status = '新建'
          }else if(text1 === '1'){
            status = '预测成功'
          }else if(text1 === '2'){
            status = '预测失败'
          }else {
            status = ''
          }
        }
        return {
          //keyNum: i+1,
          FORECAST_NAME: item.FORECAST_NAME,
          FORECAST_RESULT_INFO: item.FORECAST_RESULT_INFO,
          FORECAST_RESULT_TIME: frTime,
          PATH: item.PATH,
          SCENE_NAME: item.SCENE_NAME,
          SOURCE_ID: item.SOURCE_ID,
          SOURCE_NAME: item.SOURCE_NAME,
          STORAGE_ID: item.STORAGE_ID,
          USERNAME: item.USERNAME,
          FORECAST_RESULT_STATUS: status,
        }
      })
      pagination = {
        total: mdat.total,//dataSource.total,
        defaultCurrent: mdat.pageNo,
        pageSize: mdat.pageSize,
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
      }
    }
    console.log("modelD数据")
    console.log(modelD)
    if (gridData != "" && gridData != null && gridData.length != 0) {
      for (let i = 0; i < gridData.length; i++) {
        let fri = [], fri2 = [], fri3 = []
        let itmeD = gridData[i]
        let frInfo = gridData[i].FORECAST_RESULT_INFO
        if(itmeD.FORECAST_RESULT_STATUS != '预测失败' && itmeD.FORECAST_RESULT_STATUS != '新建'){
          if (frInfo != '') {
            fri = frInfo.path
            fri3 = fri.substring(fri.lastIndexOf('/') + 1, fri.length);
            fri2 = frInfo.storage_id
          }
        }
        gridData[i].key = i + 1
        gridData[i].frInfoPath = fri
        gridData[i].frInfoPathName = fri3
        gridData[i].frInfoId = fri2
      }
    }
    return (
      <div className={style['r-j-m']}>
        <div className="con" >
          <div className="table-div2" >
            {/*<Table  dataSource={gridData} columns={this.columns} loading={this.loading} pagination={pagination}  scroll={{ y: 350 }} />*/}
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
              scroll={{ x: 1000, y: 350 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HistoryGrid

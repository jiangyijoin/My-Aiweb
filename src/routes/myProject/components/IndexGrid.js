import React, { Component, PropTypes } from 'react'
import { Modal, Select, message, Input, Button, Icon } from 'antd'
import { Table } from 'firebrand-component'
import 'antd/dist/antd.css'
import style from "./System.less"

const confirm = Modal.confirm
class IndexGrid extends React.Component {
  constructor(props) {//构造函数
    super(props);
    this.state = {
      sceneId: 'ALL',
      projectId: '',
      userName: user.username,
      pageNo: '1',
      limit: '10',
    };
    this.columns = [
        {title: '序号', dataIndex: 'keyNum', key: 'keyNum', width: 30},
        {title: '项目名称', dataIndex: 'PROCESS_NAME', key: 'PROCESS_NAME', width: 100},
        {title: '场景', dataIndex: 'SCENE_NAME', key: 'SCENE_NAME', width: 100},
        {title: '创建/修改时间', dataIndex: 'UPDATE_TIME', key: 'UPDATE_TIME', width: 100},
        {title: '创建人', dataIndex: 'USERNAME', key: 'USERNAME', width: 50},
        {title: '操作', dataIndex: 'OPERATION', key: 'OPERATION', width: 100, render: (text, record, index) => (
          <span>
              <a style={{textDecoration: 'underline'}} onClick={this.showModel.bind(this, record)} >查看</a>&nbsp;&nbsp;&nbsp;
            <a style={{textDecoration: 'underline'}} onClick={(e) => this.preview(record)}>删除</a>
            </span>
        ),
        }
    ];
    this.loading = true
    this.onClicks = this.onClicks.bind(this)
  }
  componentDidMount() {
    this.loading = false
  }
  showModel = (e) => {
    // message.success("开发中...")
    this.props.dispatch({
      "type": "@@router/CALL_HISTORY_METHOD",
      "payload": {
        "method": "push",
        "args": [
          {
            pathname: '/model',
            state: { data: e, footer: {update: '修改保存', run: true, deploy: '模型发布'} }
          }
        ]
      }
    });
  }
  handleScenesChange(value) {
    if(value!=''&&value!=undefined){
      this.state.sceneId = value
    }else {
      this.state.sceneId = 'ALL'
    }
  }
  handleProjectChange(value) {
    if(value!=''&&value!=undefined){
      this.state.projectId = value
    }else {
      this.state.projectId = ''
    }

  }
  preview = (e) => {
    let dispatch = this.props.dispatch
    confirm({
      title: '你确定要删除当前项吗?',
      okText: '确定',
      okType: 'primary',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: `projectData/remove`,
          payload: {flag: 'project', id: e.PROCESS_ID},
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  queryPrediction = (e) => {
    let dispatch = this.props.dispatch
    dispatch({
      type: `projectData/queryProjectServer`,
      payload: {sceneId:this.state.sceneId,projectId:this.state.projectId,userName:this.state.userName,pageNo:'1',limit:'10'},
    })//payload: {sceneId: 'ALL', projectId: '', userName: user.username, pageNo: '1', limit: '10'},
  }
  onClicks = (current, pageSize) => {
    let dispatch = this.props.dispatch
    let ite = this.props.dataSource
    dispatch({
      type: `projectData/queryProjectServer`,
      payload: {sceneId:this.state.sceneId, projectId:this.state.projectId, userName:this.state.userName, pageNo: current, limit: pageSize},
    })
  }

  render() {
    const { list = [], projectInfo = [], scenesInfo = [] } = this.props.dataSource
    let listd = []
    if(list.data){
      this.loading = false
      listd = list.data.elements
    }
    /*if(list.data){
      this.state.loading = false
      listd = list.elements
    }*/
    const gridData = listd.map((item, i) => {
      const text = item.UPDATE_TIME;
      let updateItem = item.UPDATE_TIME;
      if(text != ''|| text != null){
        updateItem = text.substring(0,4)+'-'+text.substring(4,6)+'-'+text.substring(6,8)+' '+text.substring(8,10)+':'+text.substring(10,12)
      }
      return {
        ...item,
        keyNum: i+1,
        UPDATE_TIME: updateItem,
        OPERATION: 'operation'
      }
    })

    //let pagination = []
    const provinceOptions1 = projectInfo.map(
      province => <Select.Option key={province.PROCESS_ID}>{province.PROCESS_NAME}</Select.Option>)
    const provinceOptions = scenesInfo.map(
      province => <Select.Option key={province.PROCESS_ID}>{province.PROCESS_NAME}</Select.Option>)
    /*if(list!= '' || list.length>0) {
      pagination = {
        total: list.total,//dataSource.total,
        defaultCurrent: list.pageNo,
        pageSize: list.pageSize,
        onChange:(current, pageSize) => {
          this.onClicks(current, pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          this.onClicks(current, pageSize)
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
    }*/

    return (
      <div className={style['r-j-m']}>
        <div className="r-j-div">
          <div className="r-j-div-1">
            <div className="r-j-div-div">
              <div className="r-j-div-img"></div>
              <div className="r-j-div-Icon">
                <h5 className="r-j-fl">
                  <i className="anticon iconfont icon-xiangmu"
                     style={{ fontSize: 24,color: '#0085d0'}}></i>&nbsp;&nbsp;我的项目
                </h5>
              </div>
            </div>
          </div>
          <div className="r-j-2">
            <span style={{width:'100px !important'}}> 场景:</span>
            <Select allowClear placeholder="-请选择-" style={{ width: 140,marginLeft:15}}
                    onChange={(key) => this.handleScenesChange(key)}>{provinceOptions}
            </Select>
            <span style={{marginLeft:20, width:'100px !important'}}> 项目名称:</span>
            <Select allowClear placeholder="-请选择-" style={{ width: 140, marginLeft:15}}
                    onChange={(key) => this.handleProjectChange(key)}>{provinceOptions1}
            </Select>
            <Button type="primary" style={{marginLeft:20}} onClick={(e) => this.queryPrediction(e)}>查询</Button>
          </div>
          <div className="table-div2" >
            {/*<Table dataSource={gridData} columns={this.columns} pagination={pagination} loading={this.loading} rowKey="keyNum" />*/}
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
        </div>
      </div>
    )
  }
}

export default IndexGrid

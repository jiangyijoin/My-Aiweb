import React from 'react'
import { connect } from 'dva'
import { getFileType } from 'utils'
import { Icon,Button,Select,DatePicker,Modal,message   } from 'antd'
import IndexGrid from './indexGrid'
import PreviewGrid from './previewGrid'
import style from './dataSource.less';
import MyModel from './MyModel'
import moment from 'moment';
// import { ComComp } from 'components'
// const { Modal } = ComComp;
const confirm = Modal.confirm;
const  myDataSource=function ({dispatch, dataSource, loading}) {
  const {dateSourceList,prams,visible1,common,previewList,scenesList,fileList}=dataSource
  let dataItem =dateSourceList.elements;
  //处理数据源列表的数据
  let mydata=[];
  for (let i = 0; i < dataItem.length; i++) {
    let option={SOURCE_ID:dataItem[i].SOURCE_ID,STORAGE_ID:dataItem[i].STORAGE_ID,SOURCE_NAME: dataItem[i].SOURCE_NAME,METADATA_ID:dataItem[i].METADATA_ID};
    mydata.push({key: i+1,SOURCE_NAME: dataItem[i].SOURCE_NAME,SCENE_NAME: dataItem[i].SCENE_NAME,
      CREATE_TIME:dataItem[i].CREATE_TIME,USERNAME:dataItem[i].USERNAME,OPTION: option});
  }


  class Index extends React.Component{
    //数据源列表
    columns = [
      {title: '序号', dataIndex: 'keyNum',key: 'keyNum',width:30, render: (text, record, index) =>(index+1)},
      {title: '文件名', dataIndex: 'SOURCE_NAME',key: 'SOURCE_NAME',width:100},
      {title: '场景', dataIndex: 'SCENE_NAME',key: 'SCENE_NAME',width:100},
      {title: '导入时间', dataIndex: 'CREATE_TIME',key: 'CREATE_TIME',width:100,render:text  =>
          <span>{text.substring(0,4)}-{text.substring(4,6)}-{text.substring(6,8)} {text.substring(8,10)}:{text.substring(10,12)}</span>
      },
      {title: '导入人', dataIndex: 'USERNAME',key: 'USERNAME',width:50},
      {title: '操作', dataIndex: 'OPTION',key: 'OPTION',width:100, render:option =>
          <div>
            <span><a style={{textDecoration: 'underline'}} onClick={(e) => this.preview(option.SOURCE_ID,option.STORAGE_ID,option.SOURCE_NAME,option.METADATA_ID)}>预览</a></span>
            <span style={{'marginLeft':'10px'}}><a style={{textDecoration: 'underline'}} onClick={(e) =>this.deleteit(option.SOURCE_ID)}>删除</a></span>
          </div>
      }
    ];
    data=mydata;
    pagination= {
      total: dateSourceList.total,
      defaultCurrent:prams.pageNo,
      pageSize: 5,
      pageSizeOptions: ['5','10','20'],
      // showSizeChanger:false
    }
    rankData={pagination:this.pagination,columns:this.columns,data:this.data,prams:prams,dispatch:dispatch,loading:dateSourceList.loading};
    state = { visible: false,size:'scene',visible1:visible1,fileArray:[],sceneArray:[]}
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
    setvisible = () => {
      this.setState({
        visible: false,
      });
    }
    //预览

    preview= (sourceId,storageId,sourceName,metadataId) => {
      let flag = getFileType(sourceName);
      let previewPrams={sourceId:sourceId,storageId:storageId,flag:flag,metadataId:metadataId}
      this.setState({
        visible1: true,
        previewTitle:sourceName,
        previewPrams:previewPrams
      });
    }
    handleCancel1=()=>{
      dispatch({
        type:"dataSource/changeState",
        payload:{key:"visible1",value:false}
      })
    }
    //删除
    deleteit=(id)=>{
      confirm({
        title: '你确定要删除当前项吗?',
        onOk () {
          dispatch({
            type:"dataSource/deleteById",
            payload:{flag:'dataResource',id:id}
          })
        }
      })
    }
    //主页面改变触发事件
    changeCommon=(value,key)=>{

      dispatch({
        type:"dataSource/changeCommon",
        payload:{key:key,value:value}
      })
      if(key=="sceneId"){
        dispatch({
          type:"dataSource/params",
          payload:{flag:'dataSource',sceneId:value,userName:user.username}
        })
      }
    }

    //查询方法
    query=()=>{
      let startTime=document.getElementsByClassName("ant-input")[0].value.replace(/\W|_/g, '');
      let endTime=document.getElementsByClassName("ant-input")[1].value.replace(/\W|_/g, '');
      startTime=startTime.length>0?startTime+"00":startTime;
      endTime=endTime.length>0?endTime+"00":endTime;
      let prams={sceneId:common.sceneId,sourceId:common.sourceId,userName:user.username,limit:10,pageNo:1,startTime:startTime,endTime:endTime};
      dispatch({
        type:"dataSource/setPrams",
        payload:prams
      })
      dispatch({
        type:"dataSource/dataResourceList",
        payload:prams
      })
    }

    componentDidMount(){
      if(common.sceneId=="ALL"){
        document.getElementsByClassName("ant-select-selection-selected-value")[0].classList.add("ant-select-selection__placeholder")
      }
      if(common.sourceId==""){
        document.getElementsByClassName("ant-select-selection-selected-value")[1].classList.add("ant-select-selection__placeholder")
      }
      let sceneArray=[];
      let fileArray=[];
      //sceneArray.push(<Select.Option key="ALL">-请选择-</Select.Option>)
      scenesList.map(function(item){
        sceneArray.push(<Select.Option key={item.PROCESS_ID}>{item.PROCESS_NAME}</Select.Option>)
      })
      if(undefined!=fileList){
        fileList.map(function(item){
          fileArray.push(<Select.Option key={item.SOURCE_ID}>{item.SOURCE_NAME}</Select.Option>)
        })
      }
      this.setState({
        sceneArray:sceneArray,
        fileArray:fileArray
      })
    }
    render() {

      return (
        <div className={style['g-page']} style={{'width':'100%','paddingLeft':'25px','paddingRight':'25px'}}>
          <div className="g-head">
            {/*<Icon type="database" className="icon-sty"/><span className="span-title">数据源</span>*/}
            <i className="anticon iconfont icon-shujuyuan  icon-sty" ></i><span className="span-title">数据源</span>
            <Button  type="primary"  className="button-import" onClick={this.showModal}>导入</Button>
          </div>
          <div className="g-head-mid">
            <span className="span-input-f">场景:</span>
            <Select    allowClear ={true} placeholder="-请选择-" value={(common.sceneId=="ALL")?"-请选择-":common.sceneId} style={{ width: 140,marginLeft:15 }} onChange={(value)=>this.changeCommon(value,"sceneId")}  >
              {this.state.sceneArray}
            </Select>
            <span className="span-input">文件名：</span>
            <Select  allowClear ={true} placeholder="-请选择-" value={common.sourceId==""?"-请选择-":common.sourceId} style={{ width: 150 }}  onChange={(value)=>this.changeCommon(value,"sourceId")}
                     showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              {this.state.fileArray}
            </Select>
            <span className="span-input">导入时间：</span>
            <DatePicker defaultValue={common.startTime.length>0?moment(common.startTime, 'YYYYMMDDhh'):null }
                showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm"  onChange={(value)=>this.changeCommon(value,"startTime")} locale="zh"></DatePicker>
            <span className="span-time">-</span>
            <DatePicker defaultValue={common.endTime.length>0?moment(common.endTime, 'YYYYMMDDhh'):null }
                showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm"  onChange={(value)=>this.changeCommon(value,"endTime")} locale="zh"></DatePicker>
            <Button  type="primary" onClick={this.query} className="button-search">查询</Button>
          </div>
          <div className="mar-l-f-10">
            <IndexGrid dataSource={this.rankData}/>
          </div>
          {this.state.visible?<MyModel  visible={this.state.visible} setvisible={this.setvisible} dispatch={dispatch} scenesList={scenesList}></MyModel> :""}
          <Modal title={"预览数据("+this.state.previewTitle+")"} visible={this.state.visible1}  onCancel={this.handleCancel1}
                 width={600}  bodyStyle={{padding:2}} style={{'marginTop':'-50px'}}
          footer={[<Button key="back" onClick={this.handleCancel1}>关闭</Button>]}
          >
            <PreviewGrid param={this.state.previewPrams} />
          </Modal>
        </div>
      )
    }
  }
  return (
    <Index></Index>
  );
}
export default connect(({ dataSource, loading }) => ({ dataSource, loading }))(myDataSource)

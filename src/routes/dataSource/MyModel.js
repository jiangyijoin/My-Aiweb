import React from 'react'
import { connect } from 'dva'
import { getFileType } from 'utils'
import {Modal,Radio,Select,Icon,Upload,Button,Input,Checkbox,message   } from 'antd'
import ReactDOM from 'react-dom'
import ModelGrid from './ModelGrid'
import PreviewGrid from './previewGrid'
import {previewFiles,systemDataSourcePath,downloadFileUrl,uploadFile,repeatName} from "services/dataSource/dataSourceService"
import style from './dataSource.less';
const getValue = (arr, key) => {var reg = new RegExp(`^${key}:`); return arr.filter(i => reg.test(i))[0].replace(reg,'')}
const  MyModel=function ({visible,setvisible,dispatch,scenesList}) {
  class Index extends React.Component{
    state = { visible: visible,size: 'scene',visible1:false,sceneId:'1',fileUrl1:'',fileName1:"请选择文件上传...",fileUrl2:'',fileName2:"请选择文件上传...",
            rowsep1:'',rowsep2:'',colsep1:'',colsep2:'',checked1:true,checked2:false,previewSelect:"预览",scenesArray:[],param:{},yulan1:true,yulan2:true,yulan3:true,
      listCol:[],remotePath:'',fileName:'',metadataId:"",repeatName:true};


    onCellChange(val,col,index,props){//val:值,col:列,index:下标,props:当前MyModel对象
      if(col=="filename"){
        props.state.listCol[index].name=val;
      }
      if(col=="type"){
        props.state.listCol[index].type=val;
      }
      if(col=="desc"){
        props.state.listCol[index].desc=val;
      }
    }

    upLoadOnChange(info,type) {
      console.log(info)
      console.log(info.file.webkitRelativePath)
      if(info.file.response!=undefined&&info.file.response.success){
        if(type=="scene"){
          this.setState({
            fileUrl1:info.file.response.data,
            fileName1:info.file.name,
          })
        }else{
          this.setState({
            fileUrl2:info.file.response.data,
            fileName2:info.file.name,
            yulan1:false
          })
        }
        message.success("文件提交成功")
      }
      if(info.file.response!=undefined&&!info.file.response.success){
        message.error("文件提交失败")
      }
    }
    submit = (e) => {
      //判断输入的格式是否满足
      let sceneName="";
      let  sceneId=this.state.sceneId;
      scenesList.map(function (item){
        if(item.PROCESS_ID==sceneId){
          sceneName=item.PROCESS_NAME;
        }
      })

      let prams={
        flag:this.state.size=="scene"?'sceneImport':'selfImport',
        sceneId:sceneId,
        urlPath:this.state.size=="scene"?this.state.fileUrl1:this.state.fileUrl2,
        separatorRow:this.state.size=="scene"?this.state.rowsep1:this.state.rowsep2,
        separatorCol:this.state.size=="scene"?this.state.colsep1:this.state.colsep2,
        isContent:this.state.size=="scene"?this.state.checked1:this.state.checked2,
        sceneName:sceneName,
        userName:user.username,
        metadataId:this.state.size=="scene"?this.state.metadataId:"",
      }
      if(prams.urlPath==""){
        message.warn("请导入文件后再提交");
        return
      }

      if(getFileType(prams.urlPath) === 'OTHER'){
        if(!(prams.separatorRow=="\\r"||prams.separatorRow=="\\n"||prams.separatorRow=="\\r\\n")){
          message.warn("行分隔符只能是\\r、\\n或\\r\\n");
          return
        }
      }

      let editNum=document.getElementsByClassName("editable-cell-input-wrapper").length;
      if(editNum>0){
          message.warn("请编辑完表格再提交");
          return
      }
      if(!this.state.repeatName){
        message.warn("该场景下已有此文件，请重新选择文件进行导入");
        return
      }
      let url_=this.state.size=="scene"?this.state.fileUrl1:this.state.fileUrl2;
      let flag=getFileType(url_)


      let param1={
        filePath:this.state.size=="scene"?this.state.fileUrl1:this.state.fileUrl2,
        separatorCol:this.state.size=="scene"?this.state.colsep1:this.state.colsep2,
        separatorRow:this.state.size=="scene"?this.state.rowsep1:this.state.rowsep2,
        previewRows:1,
        isContent:this.state.size=="scene"?this.state.checked1:this.state.checked2,
        flag:flag,
        metadataId:this.state.size=="scene"?this.state.metadataId:"",
      }
      //处理不同模式的导入
      if(this.state.size!="scene"){
        previewFiles(param1).then((list)=> {
          let listCol=[];
        for(let key in list.data[0]){
          listCol.push({name:key,type:'String',desc:'暂无描述'});
        }
        if(this.state.listCol.length==0){
          this.setState({
            listCol:listCol
          });
        }
        let listCol_="";
        for(let n=0;n<this.state.listCol.length;n++){
          listCol_=listCol_+this.state.listCol[n].name+","+this.state.listCol[n].type+","+this.state.listCol[n].desc
          if(n!=this.state.listCol.length){
            listCol_=listCol_+";";
          }
        }
        prams.listCol=listCol_;
        // prams.sceneId="";
        // prams.sceneName=""
          dispatch({
            type:"dataSource/insertDataResource",
            payload:prams
          })
        })
      }else {
        let key1="";
        let key2="";
        previewFiles(param1).then((list)=> {//模板文件与上传的文件的表头进行对比
          for(let key in list.data[0]){
            key1=key1+key
          }
          let flag_=getFileType(this.state.fileName)
          previewFiles({filePath:this.state.remotePath,previewRows:1,isContent:true,flag:flag_}).then((list)=> {
            for(let key in list.data[0]){
              key2=key2+key
            }
            if(key1!=key2){
              message.warn("表头与模板文件不同");
              return
            }
            dispatch({
              type:"dataSource/insertDataResource",
              payload:prams
            })
          })
        })
      }
    }
    handleCancel = (e) => {
      this.setState({
        visible: visible,
      });
      setvisible();
    }
    //
    handleOk1 = (e) => {
      this.setState({
        visible1: false,
        visible: true,
      });
    }
    handleCancel1 = (e) => {
      this.setState({
        visible1: false,
        visible: true,
      });
    }
    previewFile = (value) => {
      this.setState({
        visible1: true,
      });
      let flag=getFileType(this.state.fileUrl2);

      let param={
        filePath:this.state.fileUrl2,
        separatorCol:this.state.colsep2,
        separatorRow:this.state.rowsep2,
        previewRows:value,
        isContent:this.state.checked2,
        flag:flag
      }
      this.setState({
        param:param
      })
    }
    //切换导入
    onChange=(e)=>{
      this.setState({ size: e.target.value });
      let cjdr= ReactDOM.findDOMNode(this.refs.cjdr);
      let zdydr= ReactDOM.findDOMNode(this.refs.zdydr);
      if(e.target.value=="scene"){
        cjdr.style.display="block";
        zdydr.style.display="none";
      }else{
        cjdr.style.display="none";
        zdydr.style.display="block";
      }
    }
    //场景改变触发事件
    modelSceneChange=(value)=>{
      this.setState({
        sceneId:value
      });
      systemDataSourcePath({sceneId:value}).then((list)=> {
      console.log(list.data)
        if(list.data.length>0){
          let params=list.data[0].PARAMS.split(",");
          let remotePath= getValue(params, 'path');
          let fileName=remotePath.split("/")[remotePath.split("/").length-1];
          let metadataId=list.data[0].METADATA_ID;
          console.log(metadataId)
          let storageId=list.data[0].STORAGE_ID;
          this.setState({
            remotePath:remotePath,
            fileName:fileName,
            metadataId:metadataId,
            storageId:storageId,
            rowsep1: getValue(params, 'separatorRow'),
            colsep1: getValue(params, 'separatorCol'),
            checked1: getValue(params, 'isContent')
          })
        }
      // if(list.data.length>0){
      //     let remotePath=list.data[0].SOURCE_PARAM_VALUE;
      //     let fileName=remotePath.split("/")[remotePath.split("/").length-1];
      //     let metadataId=list.data[0].METADATA_ID;
      //     this.setState({
      //       remotePath:remotePath,
      //       fileName:fileName,
      //       metadataId:metadataId
      //     })
      //   }else{
      //     this.setState({
      //       remotePath:"",
      //       fileName:"",
      //       metadataId:""
      //     })
      //   }
      })
    }
    //是否包含列头行
    checkChange=(e,type)=>{
      this.setState({
        checked2: e.target.checked
      });
    }
    rowcol(num,obj){
      if(num==3){
          let yulan2=obj.target.value.length==0?true:false;
          this.setState({
            rowsep2:obj.target.value,
            yulan2:yulan2
          });
        }else{
          let yulan3=obj.target.value.length==0?true:false;
          this.setState({
            colsep2:obj.target.value,
            yulan3:yulan3
          });
        }
    }
    getField(e){
      let flag=getFileType(this.state.fileUrl2);
      let param={
        filePath:this.state.fileUrl2,
        separatorCol:this.state.colsep2,
        separatorRow:this.state.rowsep2,
        previewRows:2,
        isContent:this.state.checked2,
        flag:flag
      }
      previewFiles(param).then((list)=> {
        let listCol=[];
        for(let key in list.data[0]){
          listCol.push({name:key,type:'String',desc:'暂无描述'});
        }
        this.setState({
          listCol:listCol
        });
      })
    }
    download=(e)=>{

      let myForm = document.createElement("form");
      myForm.method="post" ;
      myForm.target="_blank";
      myForm.action = downloadFileUrl+this.state.remotePath+"&storageId="+this.state.storageId;
      //myForm.action = downloadFileUrl+"/home/etai/skai/2018/04/11/ETAI_STORAGE.csv&storageId="+this.state.storageId;
      document.body.appendChild(myForm);
      myForm.submit() ;
      document.body.removeChild(myForm);
    }
    componentDidMount(){
      let sceneArray= scenesList.map(function(item){
        return <Select.Option key={item.PROCESS_ID}>{item.PROCESS_NAME}</Select.Option>
      });
      if(sceneArray.length>0){
        this.setState({
          sceneArray:sceneArray,
          sceneId:scenesList[0].PROCESS_ID
        })
        systemDataSourcePath({sceneId:scenesList[0].PROCESS_ID}).then((list)=> {
          if(list.data.length>0){
            let params=list.data[0].PARAMS.split(",");
            let remotePath= getValue(params, 'path');
            let fileName=remotePath.split("/")[remotePath.split("/").length-1];
            let metadataId=list.data[0].METADATA_ID;
            let storageId=list.data[0].STORAGE_ID;
            this.setState({
              remotePath:remotePath,
              fileName:fileName,
              metadataId:metadataId,
              storageId:storageId,
              rowsep1: getValue(params, 'separatorRow'),
              colsep1: getValue(params, 'separatorCol'),
              checked1: getValue(params, 'isContent')
            })
          }
        })
      }
    }
    beforeUpload=(info)=>{
      let prams={
        sourceName:info.name,
        userName:user.username,
        id:this.state.sceneId
      }
      repeatName(prams).then((list)=>{
         this.setState({
           repeatName:list.success
         })
      })
    }

    componentWillUnmount = () => {
      this.setState = (state,callback)=>{
        return;
      };
    }
    render() {
      let suffix1 = getFileType(this.state.fileName1);
      let suffix2 = getFileType(this.state.fileName2);
      let display1=(suffix1 !== 'OTHER')?"none":"block";
      let display2=(suffix2 !== 'OTHER')?"none":"block";
      return (
        <div className={style['g-page']}>
          <Modal title="数据源导入" visible={this.state.visible}  width={690}   bodyStyle={{}} onCancel={this.handleCancel}
                 footer={
                   this.state.size=="scene"?[<Button  type="primary" key="sub" onClick={this.submit}>提交</Button>]:
                     [<Button   key="cal"  onClick={this.handleCancel}>取消</Button>,<Button type="primary" key="sub"  onClick={this.submit}>确定</Button>]
                 }
          >
            <Radio.Group value={this.state.size}  onChange={this.onChange}>
              <Radio.Button value="scene">场景导入</Radio.Button>
              <Radio.Button value="custom" >自定义导入</Radio.Button>
            </Radio.Group>
              <div ref='cjdr' style={{display:'block',marginLeft:140}}>
                <div style={{height:'30px','marginTop':'10px'}}>
                  <span style={{fontSize: 14,marginLeft:27}}>场景:</span>
                  <Select  value={this.state.sceneId}  style={{ width: 130,marginLeft:10}} onChange={this.modelSceneChange}  >
                    {this.state.sceneArray}
                  </Select>
                </div>
                <div style={{height:'30px','marginTop':'10px'}}>
                  <span style={{fontSize: 14}}>模板下载:</span>
                  <span style={{"marginLeft":10,cursor:'pointer',color:'#40a9ff'}} onClick={this.download}><Icon type="link" /> {this.state.fileName}</span>
                </div>
                <div style={{height:'30px','marginTop':'10px'}}>
                  <span style={{fontSize: 14}}>导入文件:</span>
                  <Input disabled style={{width: 200,"marginLeft":10}} value={this.state.fileName1}/>
                  <Upload
                     name="file"
                     action={uploadFile}
                     onChange={(info)=>this.upLoadOnChange(info,"scene")}
                     showUploadList={false}
                     beforeUpload={(info)=>this.beforeUpload(info)}
                  >
                    <Button type="primary" style={{marginLeft:10}}> 选择文件</Button>
                  </Upload>
                </div>
              </div>

              <div ref='zdydr' style={{display:'none'}}>
                <div style={{height:'30px','marginTop':'10px'}}>
                  <span style={{fontSize: 14,marginLeft:27}}>场景:</span>
                  <Select  value={this.state.sceneId} style={{ width: 200,marginLeft:'10px'}} onChange={this.modelSceneChange}  >
                    {this.state.sceneArray}
                  </Select>
                </div>
                <div style={{height:'30px','marginTop':'10px'}}>
                  <span>导入文件:</span>
                  <Input disabled style={{width: 200,"marginLeft":10}} value={this.state.fileName2}/>
                  <Upload
                    name="file"
                    action={uploadFile}
                    onChange={(info)=>this.upLoadOnChange(info,"custom")}
                    showUploadList={false}
                    beforeUpload={(info)=>this.beforeUpload(info)}
                  >
                    <Button type="primary"  style={{'marginLeft':10, width: 85}}>选择文件</Button>
                  </Upload>
                  <Select value={this.state.previewSelect} disabled={display2!="none"&&(this.state.yulan1||this.state.yulan2||this.state.yulan3)} style={{'marginLeft':10,width:80}} onChange={this.previewFile} >
                    <Select.Option value="10">10行</Select.Option>
                    <Select.Option value="20">20行</Select.Option>
                    <Select.Option value="50">50行</Select.Option>
                    <Select.Option value="100">100行</Select.Option>
                  </Select>
                </div>
                <div style={{height:'30px','marginTop':'10px',display:display2}}>
                  <span>行分隔符:</span>
                  <span style={{color:'#cccccc'}}> (行分隔符只能是\r、\n或\r\n)</span>
                  <span style={{'marginLeft':'90px'}}>列分隔符:</span>
                  <span style={{color:'#cccccc'}}> (列分隔符不能为空)</span><br/>
                  <Input ref='rowsep2' style={{width:300}} onBlur={(e)=>this.rowcol(3,e)} />
                  <Input ref='colsep2' style={{'marginLeft':30,width:300}} onBlur={(e)=>this.rowcol(4,e)} />
                </div>
                <div style={{height:'30px','marginTop':'25px'}}>
                  <Checkbox checked={this.state.checked2} onChange={(e)=>this.checkChange(e,"custom")} >包含列头行</Checkbox>
                  <Button type="primary" disabled={display2!="none"&&(this.state.yulan1||this.state.yulan2||this.state.yulan3)}
                    style={{'marginLeft':'10px'}} onClick={(e)=>this.getField(e)}>获取字段</Button>
                </div>
                <div className="table-div2" style={{'overflow':'scroll',height:'230px',width:'640px',marginTop:'5px',border:'1px solid #d5d5d5'}}>
                  <ModelGrid dataSource={this.state.listCol} onCellChange={this.onCellChange} props={this} />
                </div>
              </div>

          </Modal>

          <Modal title="预览数据" visible={this.state.visible1} onOk={this.handleOk1} onCancel={this.handleCancel1}
                 width={600}  bodyStyle={{padding:2}} style={{'marginTop':'-50px'}}>
            <PreviewGrid param={this.state.param} />
          </Modal>
        </div>
      )
    }
  }
  return (
    <Index></Index>
  );
}
export default connect(({MyModel}) => ({MyModel}))(MyModel)


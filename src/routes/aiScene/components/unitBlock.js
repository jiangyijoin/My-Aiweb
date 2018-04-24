import React from "react";
import {Button} from "antd"
import  MyModel from './MyModel'
const UnitBlock = ({ data,sceneList,dispatch }) => {

  class IndexBlock  extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount(){
      this.setState({
          display:"none",
          model:{
            visible:false,
            PROCESS_ID:data.PROCESS_ID,
            PROCESS_NAME:data.PROCESS_NAME
          }
      })
    }
    show(e,obj){
      if(!obj.state.model.visible){
        obj.setState({
          display:"block"
        })
      }
    }
    hide(e,obj){
      if(!obj.state.model.visible){
        obj.setState({
          display:"none"
        })
      }
    }
    handleCancel(e,obj){
      obj.setState({
        model:{
          visible:false,
          PROCESS_ID:data.PROCESS_ID,
          PROCESS_NAME:data.PROCESS_NAME
        }
      })
    }
    gotoModel(){
      dispatch({
        "type": "@@router/CALL_HISTORY_METHOD",
        "payload": {
          "method": "push",
          "args": [
            {
              pathname: '/model',
              state: { data, footer: {save: '项目保存', run: true, deploy: true}, type: 'model' }
            },
          ]
        }
      })
    }
    showModel(){
      this.setState({
        model:{
          visible:true,
          PROCESS_ID:data.PROCESS_ID,
          PROCESS_NAME:data.PROCESS_NAME
        }
      })
    }
    gotoPrediction(){
      dispatch({
        "type": "@@router/CALL_HISTORY_METHOD",
        "payload": {
          "method": "push",
          "args": [
            {"pathname": '/prediction',
              PROCESS_ID:data.PROCESS_ID
            }
          ]
        }
      })
    }
    render() {
      //src={data.PROCESS_ICON}
      //console.log(data.PROCESS_ICON)
      return (
        <div className="unitblock" style={{marginRight:24,background:"#fff"}} onMouseEnter={(e)=>this.show(e,this)} onMouseLeave={(e)=>this.hide(e,this)}>
          <div className="unitblock-common"><img src="/images/img3.jpg" style={{width:350,height:222}}/></div>
          <h2 className="unitblock-common">{data.PROCESS_NAME}</h2>
          <h3 className="unitblock-common font-color">{data.PROCESS_DESC}</h3>
          <div className="unitblock unitblock-block" style={{display:this.state.display}}>
            <div className="unitblock-posi" style={{marginTop:80}} onClick={(e)=>this.gotoModel(e)}><Button  className="unitblock-but">从模板创建</Button></div>
            <div className="unitblock-posi" onClick={(e)=>this.showModel(e)}><Button  className="unitblock-but">查看文档</Button></div>
            <div className="unitblock-posi" onClick={(e)=>this.gotoPrediction(e)}><Button  className="unitblock-but">已有模型</Button></div>
          </div>
          <MyModel data={this.state.model} handleCancel={this.handleCancel}  obj={this} sceneList={sceneList}></MyModel>
        </div>
      );
    };
  }
  return (
    <IndexBlock></IndexBlock>
  );
};
UnitBlock.propTypes = {

}

export default UnitBlock



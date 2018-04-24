import React from "react";
import {Button} from "antd"
import  MyModel from './MyModel'
const Complaint = ({ complaint,sceneList }) => {
  class IndexBlock  extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount(){
      this.setState({
        model:{
          visible:false,
          PROCESS_ID:complaint.data.PROCESS_ID,
          PROCESS_NAME:complaint.data.PROCESS_NAME
        }
      })
    }
    showModel(){
      this.setState({
        model:{
          visible:true,
          PROCESS_ID:complaint.data.PROCESS_ID,
          PROCESS_NAME:complaint.data.PROCESS_NAME
        }
      })
    }
    handleCancel(e,obj){
      obj.setState({
        model:{
          visible:false,
          PROCESS_ID:complaint.data.PROCESS_ID,
          PROCESS_NAME:complaint.data.PROCESS_NAME
        }
      })
    }
    render() {
      return (
        <div className="head">
            <div style={{float:"left"}}>
              <img style={{height:"230px",width:'360px',marginLeft:10,marginTop:10}} src="/images/img1.jpg"/>
            </div>
            <div className="complaint">
              <h2>{complaint.data.PROCESS_NAME}</h2>
              <h3 className="font-color" style={{height:90}}>
                {complaint.data.PROCESS_DESC}
              </h3>
              <div>
                <Button className="complaint-but" style={{marginRight:30}} onClick={complaint.openModel}>从模板创建</Button>
                <Button className="complaint-but" style={{marginRight:30}} onClick={complaint.openProdiction}>已有模型</Button>
                <Button className="complaint-but" onClick={(e)=>this.showModel(e)}>了解更多</Button>
              </div>
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
Complaint.propTypes = {

}

export default Complaint



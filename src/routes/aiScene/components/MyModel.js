import React from 'react'
import {Modal,Select,Button   } from 'antd'
const MyModel = ({ data,handleCancel,obj,sceneList}) => {
  class IndexBlock  extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount(){
      this.setState({
        PROCESS_ID:data.PROCESS_ID
      })
    }


    render() {
      let options=[];
      sceneList.map(function(item){
        options.push(<Select.Option key={item.PROCESS_ID} value={item.PROCESS_ID}>{item.PROCESS_NAME}</Select.Option>)
      })
      return (
        <div>
          <Modal title={"场景介绍--"+data.PROCESS_NAME} visible={data.visible}  width={700}    bodyStyle={{}} onCancel={(e)=>handleCancel(e,obj)}
                 footer={[<Button  key="close" onClick={(e)=>handleCancel(e,obj)}>关闭</Button>]}>
            <div>

              {data.PROCESS_NAME == "投诉预警" ?
                <div>
                  <div
                    style={{textIndent: 20}}>传统监控模式缺乏对用户投诉的关注维度，基于用户投诉的日常分析无法实时发现网络问题，通过构建用户投诉主动预警监控体系，是构建面向网络、业务、客户的全方位综合监控体系转型中最简单、最有效、最客观也是最直接的着力点。
                  </div>
                  <div
                    style={{textIndent: 20}}>通过构建基于用户投诉的主动监测机制，从用户投诉感知网络问题，让网络问题无处遁形，充分暴露在阳光下，进而提升监控专业的故障发现能力和问题掌控能力。
                  </div>
                  <div
                    style={{textIndent: 20}}>建立全量网络投诉监控预警机制，实时动态扫描全网络投诉数量“变化”，从业务、地域等维度汇聚投诉热点，建立广义网络投诉的主动预警监测机制，实时感知网络质量问题。
                  </div>
                  <div style={{textIndent: 20}}>模型构建的整体思路是：</div>
                  <div
                    style={{textIndent: 20}}>将原始投诉工单数据转换为每种投诉类型每天的投诉累积量数据，用统计与规则的方法筛选出比较可能发生预警的时间点，这种方法的作用是发现较为明显的预警点。利用打上预警标签的数据作为负样本，正常无预警的时间点为正样本，继续使用特征工程筛选指标，用融合模型做有监督分类（或回归）。将融合模型的结果转化为实际预警的时间点。
                  </div>
                </div>
                :
                <div>
                  暂无
                </div>
              }
            </div>
          </Modal>
        </div>
      );
    };
  }
  return (
    <IndexBlock></IndexBlock>
  );
};
MyModel.propTypes = {

}

export default MyModel


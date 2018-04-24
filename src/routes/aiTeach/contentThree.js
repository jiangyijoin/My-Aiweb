import React from 'react'
import { prefix } from 'utils/config'
import { Page } from 'firebrand-component'
import ReactDOM from 'react-dom'
import { Anchor,Table } from 'antd';
const { Link } = Anchor;

class ContentThree extends React.Component {


  renderMenuItem=(date)=>{
    return  date.map((item)=>{
      return (
        <Link href={"#"+item.key} title={item.val} />
      )
    })
  }

  render() {

    return (
      <div>
        {/*<Anchor style={{position:'fixed',right:10,top:150,width:150}}>*/}
          {/*{this.renderMenuItem(this.props.date)}*/}
        {/*</Anchor>*/}
        <div className="target-fix" id='31' >
          <h2 className="title-one">投诉预警</h2>
          <div className="content-row">传统监控模式缺乏对用户投诉的关注维度，基于用户投诉的日常分析无法实时发现网络问题，通过构建用户投诉主动预警监控体系，是构建面向网络、业务、客户的全方位综合监控体系转型中最简单、最有效、最客观也是最直接的着力点。</div>
          <div className="content-row">通过构建基于用户投诉的主动监测机制，从用户投诉感知网络问题，让网络问题无处遁形，充分暴露在阳光下，进而提升监控专业的故障发现能力和问题掌控能力。</div>
          <div className="content-row">建立全量网络投诉监控预警机制，实时动态扫描全网络投诉数量“变化”，从业务、地域等维度汇聚投诉热点，建立广义网络投诉的主动预警监测机制，实时感知网络质量问题。</div>
        </div>
        <div className="target-fix" id='32' >
          <h2 className="title-one">高校场景流量预测</h2>
          <div className="content-row">高校场景波动比较大，以某市高校为例，七月流量仅为六月总流量的36%，而九月较八月增长293%，假期前后流量变化显著。对于高校场景，经过对数据的分析发现，由于寒暑假以及较长的假期（比如国庆）期间学生离校，导致4G流量使用量下降，而假期结束学生返校，流量又回归到平时的水平。所以对于高校场景，考虑引入寒暑假与假期的特征变量以及能够处理时间序列问题的LSTM模型来对4G流量的变化进行拟合。</div>
        </div>
        <div className="target-fix" id='33' >
          <h2 className="title-one">节假日场景流量预测</h2>
          <div className="content-row">各个地市在大型假日期间出现了4G流量的较大波动，而且各个地市情况不同，比如某市（较发达）在十一期间出现了流量的显著降低；而另一城市（发展较缓慢）则正相反，出现了流量的明显增长。节假日场景下的基础模型为ARIMA模型，其全称为自回归积分滑动平均模型，其中AR为自回归，MA为移动平均。这是一种著名的时间序列预测方法，曾被应用于GDP预测，社会消费品零售预测等场景中。</div>
        </div>
        <div className="target-fix" id='34' >
          <h2 className="title-one">网优智能分析</h2>
          <div className="content-row">选择相关所有基站\小区的历史工参调整配置数据，以及对应调整配置后的网络优化质量的统计结果，初步尝试使用 决策树-随机森林算法进行分类挖掘，从而发现基站参数变更对相关网络优化质量的影响，用于辅助网优调参。</div>
        </div>
        <div className="target-fix" id='35' >
          <h2 className="title-one">咪咕推荐</h2>
          <div className="content-row">伴随着4G业务的发展，移动4G流量已成为公司收入增长的第一驱动力，而视频内容播放则是用户流量消费的主要场景，如何做好视频内容运营和上网流量拉升是目前公司市场运营重点工作。</div>
          <div className="content-row">通过大数据平台的数据及技术应用，结合专家经验规则、数据挖掘算法等各种数据建模手段，挖掘出偏好指定视频内容的潜在目标用户，最后由市场营销部门向目标用户进行精准推荐，从而提高了推荐成功率。</div>
          <div className="content-row">该视频推荐模型通用性强，只要输入任意的视频名称，就可以很快输出潜在的目标用户。</div>
        </div>
        <div className="target-fix" id='36' >
          <h2 className="title-one">工单质检</h2>
          <div className="content-row">现有的工单质检方法为人工质检，对部分字段根据规则和经验进行判断是否符合规定，这种方法需耗费巨大的人力，并且人工审核的主观性对结果的准确性会产生很大的影响。</div>
          <div className="content-row">通过把机器学习应用在工单质检工作中，可将误检率缩小到一定范围内，大大减少质检人员工作量，并可减少因人工主观性原因造成的重复性工作</div>
        </div>
      </div>
    );
  }
}

ContentThree.propTypes = {

}


export default ContentThree


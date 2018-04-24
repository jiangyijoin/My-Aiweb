import React from 'react'
import { prefix } from 'utils/config'
import { Page } from 'firebrand-component'
import { Anchor,Table } from 'antd';
const { Link } = Anchor;

class ContentOne extends React.Component {


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
          <div className="target-fix" id='11'>
            <h2 className="title-one">机器学习定义</h2>
            <div className="content-row">机器学习是研究计算机怎样模拟或实现人类的学习行为，以获取新的知识或技能，重新组织已有的知识结构使之不断改善自身的性能。它是人工智能的核心，是使计算机具有智能的根本途径，其应用遍及人工智能的各个领域，它主要使用归纳、综合而不是演绎</div>
          </div>
          <div className="target-fix" id='12' >
            <h2 className="title-one">机器学习发展历程</h2>
            <div className="content-row">机器学习是人工智能研究较为年轻的分支，它的发展过程大体上可分为4个时期。</div>
            <div className="content-row">第一阶段是在20世纪50年代中叶到60年代中叶，属于热烈时期。</div>
            <div className="content-row">第二阶段是在20世纪60年代中叶至70年代中叶，被称为机器学习的冷静时期。</div>
            <div className="content-row">第三阶段是从20世纪70年代中叶至80年代中叶，称为复兴时期。</div>
            <div className="content-row">机器学习的最新阶段始于1986年。</div>
          </div>
          <div className="target-fix" id='13' >
            <h2 className="title-one">推荐入门书籍</h2>
            <div className="content-row">《深入浅出数据分析》</div>
            <div className="content-row">《机器学习》 周志华</div>
            <div className="content-row">《谁说菜鸟不会数据分析》</div>
            <div className="content-row">第三阶段是从20世纪70年代中叶至80年代中叶，称为复兴时期。</div>
            <div className="content-row">《统计学》</div>
          </div>
       </div>
    );
  }
}

ContentOne.propTypes = {

}


export default ContentOne


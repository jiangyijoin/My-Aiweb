import React from 'react'
import { prefix } from 'utils/config'
import { connect } from 'dva'
import { Page } from 'firebrand-component'
import {Icon} from 'antd'
import style from './teach.less'
import ContentOne from './contentOne'
import ContentTwo from './contentTwo'
import ContentThree from './contentThree'
const  aiTeach=function ({aiTeach,dispatch}) {
  const {cur,href}=aiTeach;
  const content1=[
    {key:'11',val:"机器学习定义"},
    {key:'12',val:"机器学习发展历程"},
    {key:'13',val:"推荐入门书籍"}
    ];
  const content2=[
    {key:'21',val:"评价模型性能常用指标"},
    {key:'22',val:"决策树"},
    {key:'23',val:"随机森林"},
    {key:'24',val:"逻辑回归"},
    {key:'25',val:"SVM"},
    {key:'26',val:"朴素贝叶斯"},
    {key:'27',val:"K-means"},
    {key:'28',val:"Adaboost"},
    {key:'29',val:"网络神经"}
    ];
  const content3=[
    {key:'31',val:"投诉预警"},
    {key:'32',val:"高校场景流量预测"},
    {key:'33',val:"节假日场景流量预测"},
    {key:'34',val:"网优智能分析"},
    {key:'35',val:"咪咕推荐"},
    {key:'36',val:"工单质检"}
    ];
  class Index extends React.Component{

    changeCur=(val)=>{
      dispatch({
        type:"aiTeach/setCur",
        payload:{cur:val}
      })
    }
    getContent=(val)=>{

      if(val=="机器学习简介"){
        return <ContentOne date={content1}></ContentOne>
      }
      if(val=="算法介绍"){
        return <ContentTwo date={content2}></ContentTwo>
      }
      if(val=="建模经验"){
          return <ContentThree date={content3}></ContentThree>
      }
    }
    render() {
      return (
        <div className={style['g-page-teach']}  style={{'width':'100%',height:'100%'}}>
          <div  className="top-row">
            <div className="top-left">
              <i className="anticon iconfont icon-yuanchengjiaoxue  ico" ></i>
              <span className="ico-span">AI教学</span>
            </div>
            <div style={{float:'left',lineHeight:'59px'}}>
              <span className="top-right"></span>
              <span className="ico-span">{cur}</span>
            </div>
          </div>
          <div className="bot">
            <div className="bot-t">
              <div className={cur=="机器学习简介"?"tabb":"tab"} onClick={(e) => this.changeCur("机器学习简介")}>
                <Icon type="caret-right"  className="ico" />
                <span className="ico-span-t">机器学习简介</span>
              </div>
              <div className={cur=="算法介绍"?"tabb":"tab"} onClick={(e) => this.changeCur("算法介绍")}>
                <Icon type="caret-right" className="ico"  />
                <span className="ico-span-t">算法介绍</span>
              </div>
              <div className={cur=="建模经验"?"tabb":"tab"} onClick={(e) => this.changeCur("建模经验")}>
                <Icon type="caret-right" className="ico"  />
                <span className="ico-span-t" >建模经验</span>
              </div>
            </div>
            <div  className="content fl">
              {this.getContent(cur)}
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <Index></Index>
  );
}

export default connect(({ aiTeach, loading }) => ({ aiTeach, loading }))(aiTeach)

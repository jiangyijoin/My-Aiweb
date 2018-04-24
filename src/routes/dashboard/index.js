import React from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash';
import { connect } from 'dva'
import { Row, Col, Text, List, Carousel } from 'antd'
import { color } from 'utils'
import { Page } from 'firebrand-component'
import { Layout } from 'components'
import styles from './index.less'

const { Cross } = Layout;
const img = 'images/';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource || {}
    };
  }
  renderBlocks = (data = []) => {
    return data.map((item, i) => {
      return (
        <Col span={8} key={i}>
          <div className="p-block" ref={`block${i}`}>
            <i className={`anticon iconfont icon-${item.icon}`}></i>
            <div>{item.title}</div>
            <div>{item.desc}</div>
          </div>
        </Col>);
    });
  };

  renderParts = (data = []) => {
    return data.map((item, i) => {
      return (
        <div className="p-part" key={i}>
          <i className={`anticon iconfont icon-${item.icon}`}></i>
          <div>{item.title}</div>
          <div>{item.desc}</div>
        </div>
      )
    });
  }

  render() {
    const data = this.state.dataSource;
    return (
      <div>
        <Carousel autoplay>
          <div className="p-banner"><img draggable="false" src={`${img}banner_1.jpg`} /></div>
          <div className="p-banner"><img draggable="false" src={`${img}banner_1.jpg`} /></div>
          <div className="p-banner"><img draggable="false" src={`${img}banner_1.jpg`} /></div>
        </Carousel>
        <Row>{this.renderBlocks(data.dataBlock)}</Row>
        <div className="p-block">
          <List
            dataSource={data.dataList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  description={<div><div className="p-list-title fl">{item.title}</div><div>{item.desc}</div></div>}
                />
              </List.Item>
            )}
            style={{margin: '0 10px', textAlign: 'left'}}
          />
        </div>
        <div className="p-info">
          <img draggable="false" src={`${img}info-bg.jpg`} className="p-info-bg"/>
          <img draggable="false" src={`${img}info-rb.jpg`} className="p-info-rb"/>
          <p className="p-info-title">实战场景——投诉预警</p>
          <div>
            <p>
              通过构建基于用户投诉的主动监测机制，从用户投诉感知网络问题，让网络问题无处遁形，充分暴露在阳光下，进而提升监控专业的故障发现能力和问题掌控能力。建立全量网络投诉监控预警机制，实时动态扫描全网络投诉数量“变化”，从业务、地域等维度汇聚投诉热点，建立广义网络投诉的主动预警监测机制，实时感知网络质量问题。
            </p>
            <p>
              面临的挑战：如何准确且尽可能提前定位预警，及时的定位故障点
            </p>
          </div>
        </div>
        <Cross
          title="文档与工具"
          parts={this.renderParts(data.dataDoc)}
        ></Cross>
      </div>
    )
  }
}

Index.propTypes = {
  dataBlock: PropTypes.array,
  dataList: PropTypes.array,
}

function Dashboard ({ loading, location }) {
  const dataBlock = [
    {
      title: '丰富场景',
      icon: 'changjing',
      desc: '提供基于各类应用场景的解决方案，方便用户快速实现，迅速落地'
    },
    {
      title: '通用组件',
      icon: 'zujian',
      desc: '丰富的通用组件，包含数据预处理阶段方法，特征工程算法，机器学习算法等'
    },
    {
      title: '可视化',
      icon: 'keshihua',
      desc: '可视化AI流程，可视化输出结果，并提供组件拖拽式功能'
    },
  ];
  const dataList = [
    {
      title: '文本分析场景',
      desc: '工单质检，工单信息抽取等文本类关键字提取和文本分类'
    },
    {
      title: '各类预测场景',
      desc: '流量预测，投诉预警'
    },
    {
      title: '精确营销场景',
      desc: '个人市场新产品，套餐投放用户群推荐，视频推荐，家宽客户推荐'
    },
    {
      title: '关系挖掘场景',
      desc: 'SNS社交关系挖掘，征信'
    },
    {
      title: '位置信息场景',
      desc: '人流监控，个性化选址'
    },
  ]
  const dataDoc = [
    {
      icon: 'shuoming',
      title: '平台说明文档',
      desc: '查看相关的平台使用说明文档'
    },
    {
      icon: 'anli',
      title: '案例文档',
      desc: '具体案例场景说明，包括相关代码'
    },
    {
      icon: 'jiaoxueshipin',
      title: '教学视频',
      desc: '数据上传，组件使用，完整案例演示'
    },
    {
      icon: 'xiazai',
      title: '相关下载',
      desc: '前沿相关AI信息'
    },
  ]
  let maxLength = 0;
  dataBlock.forEach(i => {
    i.desc = i.desc || '';
    maxLength = Math.max(i.desc.length, maxLength)
  });
  dataBlock.forEach(i => {
    const loop = maxLength - i.desc.length;
    let arr = [];
    for(let i = 0; i < loop; i++){arr.push(' ')}//空白占位符
    i.desc += arr.join('');
  });
  const dataSource = {dataBlock, dataList, dataDoc};
  return (
    <Page loading={loading.models.dashboard} className={styles.dashboard}>
      <Index dataSource={dataSource}/>
    </Page>
  )
}

Dashboard.propTypes = {
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Dashboard)

import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import IndexGrid from './components/IndexGrid'
import styles from "themes/index.less";
import { queryProjectServer } from 'services/myProject/projectServer'

const Prediction = function ({ dispatch, predictionData, loading, location }) {
  console.log(user)
  const { modelList, baseInfo, scenesInfo ,historyInfo, processVisible, processData, processState  } = predictionData
  const doSaveAs = () => {
    console.log('doSaveAs',processState);
  };
  const hideModel = () => { //隐藏流程模型
    console.log('hideModel')
    dispatch({
      type: 'predictionData/hideModel',
      payload: {}
    })
  };
  const gridProps = {
    dispatch,
    historyInfo,
    dataSource: {
      modelList,
      baseInfo,
      scenesInfo,
    }
  }
  return (
    <div className={styles['dep-tree']}>
      <div style={{ background:"#fefefe"}} className="content-inner">
        <IndexGrid { ... gridProps}/>
      </div>
    </div>
  )
}
export default connect(({ dispatch, predictionData }) => ({ dispatch, predictionData }))(Prediction)


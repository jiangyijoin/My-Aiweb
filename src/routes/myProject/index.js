import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import IndexGrid from './components/IndexGrid'
import styles from "themes/index.less";
import { queryProjectServer } from 'services/myProject/projectServer'

const MyProject = function ({ dispatch, projectData, loading }) {
  const { list, projectInfo, scenesInfo } = projectData
  const gridProps = {
    dispatch,
    dataSource: {
      projectInfo,
      scenesInfo,
      list
    },
  }
  return (
    <div className={styles['dep-tree']}>
      <div style={{ background:"#fefefe"}} className="content-inner">
        <IndexGrid { ... gridProps}/>
      </div>
    </div>
  )
}
export default connect(({ dispatch, projectData }) => ({ dispatch, projectData }))(MyProject)


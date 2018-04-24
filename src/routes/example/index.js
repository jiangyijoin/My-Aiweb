/**
 * Created by liang on 2017/12/19.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Table, Tabs } from './components'

function Example ({ loading }) {

  return (
    <div className="content-inner">
      <Row>
        <Col span={12}>
          <Table/>
        </Col>
        <Col span={12}>
          <Tabs/>
        </Col>
      </Row>
    </div>
  )
}

Example.propTypes = {
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Example)


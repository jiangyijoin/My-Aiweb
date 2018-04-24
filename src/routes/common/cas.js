/**
 * Created by liang on 2017/12/22.
 */
import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import { registerListener, JsonFormat } from 'utils';


const Cas = ({dispatch}) => {
  return (<div></div>)
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(Cas))

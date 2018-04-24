import React from 'react'
import { Icon } from 'antd'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import styles from './index.less'

const Error = (props) => {
  // const { app:{locationQuery:{type='default'}} } = props;
  const match = window.location.search.match("type=([^&]*)");
  const type = (match&&match[1])?match[1]:"default";
  let msg = '404 Not Found';
  switch (type){
    case '0': msg = '用户验证失败';break;
    case '1': msg = '角色信息获取失败' ;break;
  }

  return (<div className="content-inner">
    <div className={styles.error}>
      <Icon type="frown-o" />
      <h1>{msg}</h1>
    </div>
  </div>)
}

export default withRouter(connect((props) => props)(Error))

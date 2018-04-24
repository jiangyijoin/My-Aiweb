import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Form, Icon, Input } from 'antd'
import styles from './index.less'

const FormItem = Form.Item;
const Login = ({
  login,
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  return (
    <div className={styles.login}>
      <div className="login-content">
        <div className="login-logo">
          <h1>人工智能云平台</h1>
          <img draggable="false" alt="logo"  src='images/login-bn.png' />
        </div>
        <div className="login-box">
          <div className="login-from">
            <h3>账号登录</h3>
            <form>
              <FormItem hasFeedback>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input prefix={<Icon type="user" className="p-icon"/>} size="large"
                          onPressEnter={handleOk} placeholder="平台帐号" />)}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input prefix={<Icon type="lock" className="p-icon"/>} size="large"
                          onPressEnter={handleOk} placeholder="登录密码" type="password" />)}
              </FormItem>
              <Button type="primary" size="large" onClick={handleOk} loading={loading.effects.login}>登录</Button>
              <a href={'#'}>忘记帐号或密码？</a>
            </form>
          </div>
        </div>
      </div>
      <div className="login-footer">Copyright © 2018 杭州东方通信软件技术有限公司 版权所有</div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ login, loading }) => ({ login, loading }))(Form.create()(Login))

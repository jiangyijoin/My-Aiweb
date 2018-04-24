/* global window */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { Layout, Loader } from 'firebrand-component'
import { Layout as LayoutAI, MenuSpan } from 'components'
import { classnames as classNames } from 'f-utils'
import config from 'config'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd'
import { Helmet } from 'react-helmet'
import { withRouter, routerRedux } from 'dva/router'
import 'themes/index.less'
import styles from './app.less'
import Error from 'routes/common/error'

const { prefix, openPages, name, footerText } = config;
const { Footer, Sider } = Layout;
const { Header } = LayoutAI;
let lastHref;

const App = ({ children, dispatch, app, loading, location }) => {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys,
            menu, letterMenu, activeMenu, historyMenu, defConfig } = app;
  window.user = user;
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if(pathname==='/')pathname='/dashboard';
  const { iconFontJS, iconFontCSS, logo } = config;
  //const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname));
  const hasPermission = true;//current.length ? permissions.visit.includes(current[0].id) : false
  const href = window.location.href;

  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href
    }
  }
  let leftMenu = [
    {id: 'aiTeach', name: 'AI教学', route: 'aiTeach'}
  ];
  !user.username && leftMenu.push({id: 1, name: 'AI平台', click: 'login'});

  const headerProps = {
    menu,
    user,
    defConfig,
    activeMenu,
    historyMenu,
    letterMenu,
    leftMenu,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    config,
    navOpenKeys,
    selectedKeys : leftMenu.filter(i => `/${i.route}` === location.pathname).map(i => i.id),
    projectName: name,
    func: {
      login() {
        // headerProps.changeRoute({route: 'login'})
        dispatch({ type: 'app/login' })
      },
      logout () {
        dispatch({ type: 'app/logout' })
      },
      clickTitle() {
        headerProps.changeRoute({route: '/dashboard'})
      }
    },
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },

    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
    changeMenuActive (activeMenu2) {
      dispatch({ type: 'app/handleActiveMenuChange', payload: { activeMenu: activeMenu2 } })
    },
    changeRoute (item) {
      const route = routerRedux.push({pathname: item.route});
      dispatch(route)
    },
    onSelect(option){
      if(option.server && window.location.origin != option.server.match(/^((https|http|ftp|rtsp|mms)?:\/\/)[^/]+/)[0]){
        console.log(option.server+option.route);
        window.location.href = option.server+option.route;
      }else{
        dispatch(routerRedux.push({
          pathname: option.route
        }));
      }
    }
  };

  const siderProps = {
    menu,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    config,
    changeTheme () {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys (openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys));
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  };
  if (openPages && openPages.includes(pathname.split("?")[0])) {
    return (<div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }
  const layoutClsName = classNames(`${prefix}-layout`,
            { [`${prefix}-flod`]: !isNavbar ? false : siderFold }, { [`${prefix}-withnavbar`]: !isNavbar });
  const sideClsName = classNames(`${prefix}-sider`, { [`${prefix}-light`]: !darkTheme });
  const props = {
    config
  };

  const dataSourceMenu = [
    //{name:'AI教学',icon:'icon-changjing',path:'/aiTeach'},
    {name:'AI场景',icon:'icon-changjing',path:'/aiScene'},
    {name:'数据源',icon:'icon-shujuyuan',path:'/dataSource'},
    {name:'我的项目',icon:'icon-xiangmu',path:'/myProject'},
    {name:'预测模型',icon:'icon-yucemoxing',path:'/prediction'},
  ];
  const menuProps = {
    filerPages: ['/model'],
    dataSource: dataSourceMenu,
    onSelect (item) {
      dispatch({
        "type": "@@router/CALL_HISTORY_METHOD",
        "payload": {
          "method": "push",
          "args": [
            {"pathname": item.path}
          ]
        }
      })
    }
  };
  const bShow = user && user.username;
  return (
    <LocaleProvider locale={zhCN}>
      <div className={styles.app}>
        <Loader {...props} fullScreen spinning={loading.effects['app/query']} />
        <Helmet>
          <title>人工智能云平台</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href={logo} type="image/x-icon" />
          {iconFontJS && <script src={iconFontJS} />}
          {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
        </Helmet>
        <div className={layoutClsName}>
          {isNavbar ? <aside className={sideClsName}>
              {siderProps.menu.length === 0 ? null : <Sider {...siderProps} />}
            </aside> : ''}
          <div className={`${prefix}-main`}>
            <Header {...headerProps} />
            <div style={{position: 'relative',marginTop: 47, minHeight: 500}}>
              <div className="fl p-menu" style={{display: (bShow ? '' : 'none')}}>
                <MenuSpan {...menuProps} />
              </div>
              <div className={classNames(`${prefix}-container`,'p-content clear', (bShow ? 'normalScreen' : 'fullScreen'))}>
                <div className={`${prefix}-content`}>
                  {hasPermission ? children : <Error />}
                </div>
              </div>
            </div>
            {location.pathname === '/dashboard' ? <Footer {...props}/> : <p className={`${prefix}-footer-in`}>{footerText}</p>}
          </div>
        </div>
      </div>
    </LocaleProvider>
  )
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))

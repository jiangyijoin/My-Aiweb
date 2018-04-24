import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import { config as defConf } from 'utils'
import './Header.less'

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

const logo = require('public/images/logo.png')
const Header = ({ user, projectName, leftMenu, func, changeRoute, selectedKeys, config=defConf }) => {
  const handleClickMenu = e => {
    if(e.key === 'login' || e.key === 'logout'){
      func[e.key]();
    }else{
      let item = JSON.parse(e.item.props["data-item"]);
      if(item.click){
        func[item.click]();
      }
      changeRoute(item);
    }
  }
  // const leftMenuClick = e => console.log(e,e.target);
  const leftMenuClick = function(e){
    const item = JSON.parse(e.domEvent.target.attributes["data-item"].value);
    changeRoute(item);
  }
  const renderNodes = (data) => {
    let menus = data.map((item) => {
      return (
        <Item
          key={item.id}
          style={{float: 'left'}}
          data-item={JSON.stringify(item)}
        >
          <Icon type={item.icon}style={{display: (item.icon === void 0 ? 'none' : '')}} />{item.name}
        </Item>);
    });
    if(user && user.username){ //用户已登录
      menus.push(<SubMenu
        key="username"
        style={{float: 'right'}}
        title={<span><Icon type="user" />{user.username}</span>}
      >
        <Item key="logout">注销</Item>
      </SubMenu>)
    }else{
      menus.push(<Item key="login" style={{float: 'right'}}>登录</Item>)
    }
    return menus;

  };
  let MenuProps = {
    mode: "horizontal",
    onClick: handleClickMenu,
    selectedKeys
  }
  return (
    <div className={`${config.prefix}-header`}>
      <div className={`${config.prefix}-title`} onClick={func.clickTitle}>
        <div className="p-logo" style={{backgroundImage: `url(${logo})` }}></div>{projectName}
      </div>
      <div className={`${config.prefix}-right-warpper`}>
        <Menu {...MenuProps}>
          {renderNodes(leftMenu)}
        </Menu>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  changeMenuActive: PropTypes.func
}

export default Header

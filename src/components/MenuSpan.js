import React from 'react'
import PropTypes from 'prop-types'
import './MenuSpan.less'

class MenuSpan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: props.currentId
    };
    this.onClick = this.onClick.bind(this);
    // this.renderNodes = this.renderNodes.bind(this);
  }

  onClick = (item) => {
    // console.log(item, this, item.target);
    const $obj = document.querySelector('.p-icon-menu li:hover');
    if($obj){
      const currentId = $obj.attributes["data-key"].value;
      this.setState({
        currentId : currentId
      })
      this.props.onSelect(JSON.parse($obj.attributes["data-item"].value))
    }
  }
  renderNodes = (data) => {
    const currentId = this.props.filerPages.includes(location.pathname) ? this.state.currentId : location.pathname;
    return data.map((item, i) => {
      const className = 'anticon iconfont ' + (item.icon || '');
      return <li key={i} data-key={item.path} data-item={JSON.stringify(item)} className={item.path === currentId ? 'active' : ''} onClick={this.onClick}>
                <div style={{padding: '20px'}}>
                  <i className={className}></i><div>{item.name}</div>
                </div>
            </li>;
    });
  };
  render() {
    // console.log('MenuSpan.this', this);
    return (
      <div className="p-icon-menu">
        {this.renderNodes(this.props.dataSource)}
      </div>
    );
  };
}
MenuSpan.propTypes = {
  filerPages: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
};
export default MenuSpan

 import {  Input, Icon } from 'antd';
 import style from './dataSource.less';
export class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });

  }
  check = (e) => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }

  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className={style['g-page']}>
        <div className="editable-cell" style={{position: 'relative'}}>
          {
            editable ?
              <div className="editable-cell-input-wrapper">
                <Input
                  style={{textAlign:'center'}}
                  value={value}
                  onChange={this.handleChange}
                  onPressEnter={this.check}
                />
                <Icon style={{position: 'absolute',right: 0, width: '20px',cursor: 'pointer',lineHeight: '33px'}}
                  type="check"
                  className="editable-cell-icon-check"
                  onClick={this.check}
                />
              </div>
              :
              <div className="editable-cell-text-wrapper">
                {value || ' '}
                <Icon style={{position: 'absolute',right: 0, width: '20px',cursor: 'pointer',lineHeight: '27px',display: 'none'  }}
                  type="edit"
                  className="editable-cell-icon"
                  onClick={this.edit}
                />
              </div>
          }
        </div>
      </div>
    );
  }
}



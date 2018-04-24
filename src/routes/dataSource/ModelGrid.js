import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'firebrand-component'
import {EditableCell} from './EditCell'
import style  from './indexGrid.less';
const ModelGrid = ({ dataSource,onCellChange,props }) => {

  const columns = [
    {title: '#', dataIndex: '#',key: '#',width:50,render:(text, record,index) => (
        index+1)
    },
    {title: '名称', dataIndex: 'name',key: 'name',width:100,render:(text, record,index) => (
      <EditableCell value={text} onChange={(val)=>onCellChange(val,'filename',index,props)} />)

    },
    {title: '类型', dataIndex: 'type',key: 'type',width:100,render:(text, record,index) => (
        <EditableCell value={text} onChange={(val)=>onCellChange(val,'type',index,props)} />)
    },
    {title: '描述', dataIndex: 'desc',key: 'desc',width:100,render:(text, record,index) => (
        <EditableCell value={text} onChange={(val)=>onCellChange(val,'desc',index,props)} />)
    }
  ];
  let pagination_ = {
    total: dataSource.length,
    defaultCurrent:1,
    pageSize:10,
  }

  class IndexBlock extends React.Component {
    constructor(props) {
      super(props);
      this.ref = {ref_pre: null, ref_next: null};
      // 设置 initial state
      this.state = {
        data:dataSource,
        pagination: pagination_,
        loading:false
      };
      this.state.pagination.onChange= (current, pageSize) => {
        this.setState({
          loading:true
        });

        }
    }
    componentDidMount(){
      if(dataSource.total>=0){
        this.state.loading=false;
        this.setState({
          loading:false
        });
      }
    }
    render() {
      return (
        <div className={style['gg-page']}>
            <Table  dataSource={this.state.data} columns={columns} pagination={false} loading={this.state.loading} scroll={{ x: 440 }}/>
            <div className="clear"></div>
        </div>
      );
    }
  }
  return (
    <IndexBlock></IndexBlock>

  );
};
ModelGrid.propTypes = {
  dataSource: PropTypes.array,
  onCellChange:PropTypes.func
}

export default ModelGrid

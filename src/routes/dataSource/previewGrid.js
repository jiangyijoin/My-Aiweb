import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'firebrand-component'
import style from './dataSource.less';
import {previewFiles} from "services/dataSource/dataSourceService"
import {message} from "antd/lib/index";
const PreviewGrid = ({ param }) => {
  class IndexBlock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pagination: {},
        loading:true,
        dataSource:[],
        columns:[],
        x:400
      };
    }
    componentWillMount(){
      let dataSource=[];
      let loading=true;
      let columns=[];
      let pagination={};
      let x=0;
      previewFiles(param).then((list)=>{
        dataSource=list.data;
        loading=false;
        if(dataSource.length>0){
          for(let key in dataSource[0]){
            let width=100;
            if(key.length > 8){
              width = key.length * 12;
            }
            columns.push({title: key, dataIndex: key,key: key,width:width})//表头一个字符10px
            x=x+width;
          }
        }
        pagination = {
          total: dataSource.length,
          defaultCurrent:1,
          pageSize:10,
          pageSizeOptions: ['5','10','20'],
          // showSizeChanger:false
        }
        this.setState({
          pagination:pagination,
          loading:loading,
          dataSource:dataSource,
          columns:columns,
          x:x
        })
      }).catch(e=>{
        this.setState({
          loading:false
        })
        message.error("预览失败")
      })
    }
    componentWillUnmount = () => {
      this.setState = (state,callback)=>{
        return;
      };
    }
    render() {
      return (
        <div className={style['g-page']}>
          <div className="con table-div2" >
            <Table  dataSource={this.state.dataSource} columns={this.state.columns} pagination={this.state.pagination}  scroll={{ x: this.state.x,y:320}} loading={this.state.loading}/>
            <div className="clear"></div>
          </div>
        </div>
      );
    }
  }
  return (
    <IndexBlock></IndexBlock>
  );
};
export default PreviewGrid

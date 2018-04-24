import React from 'react'
import { Table } from 'firebrand-component'
import { message } from 'antd'
import { previewFiles } from 'services/dataSource/dataSourceService'

//保留小数位
const formatNum = (s, l = 6) => {
  let num = Number(s);
  return !isNaN(num) && (new RegExp(`\\.[\\d]{${l}}`)).test(num + '') ? num.toFixed(l) : s;
}
class FileGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      loading: true,
      dataSource: [],
      columns: []
    };
  }
  componentWillMount(){
    let dataSource = [];
    let loading = true;
    let columns = [];
    let pagination = {};
    let sumWidth = 0;
    const { params = {}, bCustom = false, noHeader = false } = this.props;
    const param = bCustom ? params : {
      filePath: params.txtPath||params.csvPath,
      separatorCol: ',',
      separatorRow: '\\n',
      storageId: params.storageId,
      flag: 'OTHER'
    }
    previewFiles(param).then(list => {
      dataSource = list.data;
      loading = false;
      pagination = {
        showSizeChanger: false,
        showQuickJumper: false,
        pageSize: 10,
      }
      if(dataSource.length > 0){
        const title = dataSource.splice(0,1)[0];
        for(let key in title){
          const name = noHeader ? key : title[key];
          let width = 100;
          if(name.length > 8){
            width = name.length * 12;
          }
          sumWidth += width;
          columns.push({title: name, dataIndex: key, key, width,
            render: (text, record) => {
              return formatNum(text);
            }
          })
        }
        if(dataSource.length > pagination.pageSize){
          pagination.showQuickJumper = true;
        }
        console.log('sum', sumWidth, dataSource)
      }

      this.setState({
        pagination,
        loading,
        dataSource,
        columns,
        sumWidth,
        rowKey: 'key'
      })
    }).catch(e => {
      console.log(e);
      message.error('查询失败！')
    })
  }
  render() {
    const tableProps = {...this.state, scroll: {y: 300}}
    if(this.state.sumWidth > 700){
      tableProps.scroll.x = this.state.sumWidth
    }
    return (
      <Table {...tableProps}/>
    );
  }
};

export default FileGrid

import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'firebrand-component'


const IndexGrid = ({ dataSource }) => {

  class IndexBlock extends React.Component {
    constructor(props) {
      super(props);
      this.ref = {ref_pre: null, ref_next: null};
      // 设置 initial state
      this.state = {
        data: dataSource.data,
        pagination: dataSource.pagination,
        loading:dataSource.loading
      };

      this.state.pagination.onChange= (current, pageSize) => {
        dataSource.dispatch({
          type:"dataSource/setLoading",
          payload:prams
        })
        let prams=dataSource.prams;
        prams.pageNo=current;
        dataSource.dispatch({
          type:"dataSource/dataResourceList",
          payload:prams
        })
      }
    }

    render() {
      return (
        <div className="con"  >
          <div className="table-div2" >
            <Table  dataSource={this.state.data} columns={dataSource.columns} pagination={this.state.pagination} loading={this.state.loading}  />
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
IndexGrid.propTypes = {
  dataSource: PropTypes.object,
}

export default IndexGrid

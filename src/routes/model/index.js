/**
 * Created by PanStar on 2018/2/8.
 */
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Model } from './components'

function ModelPage ({ dispatch, model, loading, location }) {
  const { modelType, footer, readOnly, processId, processVisible, processData, processDataSrc, processState, dataResource } = model;
  const doUpdate = (data) => {
    console.log('doUpdate', data);
    dispatch({
      type: 'model/updateProcess',
      payload: {...data}
    })
  };
  const doSave = (data) => {
    console.log('doSave', data);
    dispatch({
      type: 'model/saveProcess',
      payload: {...data},
      extData: {modelType, footer}
    })
  };
  const doWork = () => {
    console.log('doWork');
    dispatch({
      type: 'model/runProcess',
      payload: {processId}
    })
  };
  const doDeploy = (data) => {
    console.log('doDeploy', data);
    console.log(JSON.stringify(data));
    dispatch({
      type: 'model/publishProcess',
      payload: {...data}
    })
  };
  const getResult = () => {
    dispatch({
      type: 'model/getProcessResult',
      payload: {processId}
    })
  };
  const showModel = () => { //显示流程模型
    console.log('showModel');
    dispatch({
      type: 'model/showModel',
      payload: {}
    })
  };
  const hideModel = () => { //隐藏流程模型
    console.log('hideModel');
    dispatch({
      type: 'model/hideModel',
      payload: {}
    })
  };
  return (
    <div>
      {processVisible && <Model
        dataSource={{ processData, processDataSrc, processState, dataResource, footer }}
        visible={processVisible}
        // onClose={hideModel}
        doSave={footer.save ? doSave : null}
        doUpdate={footer.update ? doUpdate : null}
        doWork={footer.run ? doWork : null}
        doDeploy={footer.deploy ? doDeploy : null}
        getResult={getResult}
        readOnly={readOnly}
      />}
    </div>
  )
}

ModelPage.propTypes = {
  loading: PropTypes.object,
};

export default connect(({ model, loading }) => ({ model, loading }))(ModelPage)

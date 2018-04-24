/**
 * Created by GuoStar on 2018/2/01.
 */
import { connect } from 'dva'
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.less'
import Complaint from './components/complaint'
import UnitBlock from './components/unitBlock'
const  aiScene=function  ({ dispatch, aiScene }) {
  const { sceneList }=aiScene;
  const data = sceneList[0] || {};
  data.SCENE_ID = data.PROCESS_ID;
  // let data={
  //   PROCESS_ICON: scene.PROCESS_ICON || "",
  //   PROCESS_ID: scene.PROCESS_ID || "",
  //   PROCESS_NAME: scene.PROCESS_NAME || "",
  //   PROCESS_DESC: scene.PROCESS_DESC || "",
  //   SOURCE_ID: scene.SOURCE_ID || ""
  // };
  let complaintProps = {
    openModel: () => {
      dispatch({
        "type": "@@router/CALL_HISTORY_METHOD",
        "payload": {
          "method": "push",
          "args": [
            {
              pathname: '/model',
              state: { data, footer: {save: '项目保存', run: true, deploy: true}, type: 'model' }
            }
          ]
        }
      })
    },
    openProdiction: () => {
      dispatch({
        "type": "@@router/CALL_HISTORY_METHOD",
        "payload": {
          "method": "push",
          "args": [
            {"pathname": '/prediction',
              PROCESS_ID:data.PROCESS_ID
            }
          ]
        }
      })
    },
    data:data
  };
  const getContent = () => {
    let arr=[];
    for(let i=0;i<sceneList.length;i++){
      arr.push(<UnitBlock key={i} data={sceneList[i]} sceneList={sceneList} dispatch={dispatch}></UnitBlock>)
    }
    return arr
  };
  return (
    <div className={style['t-page']} style={{height:650}}>
      <div className="content-inner">
        <div className="t-head">
          <i className="anticon iconfont icon-changjing icon-sty"></i><span className="span-title">AI场景</span>
        </div>
        <div className="content">
          <Complaint complaint={complaintProps} sceneList={sceneList}></Complaint>
          <div className="bot">
            {getContent()}
          </div>
        </div>


      </div>
    </div>
  )
};

aiScene.propTypes = {
  loading: PropTypes.object,
};

export default connect(({ loading,aiScene }) => ({ loading,aiScene }))(aiScene)

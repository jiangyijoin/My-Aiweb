/**
 * Created by PanStar on 2018/2/26.
 */
import * as React from "react";
import { Icon } from 'antd';
import NodeDefault from "./NodeDefault";
import { css } from "glamor";
import { getSettings } from "../commonDAG/dag-settings";
import styles from '../commonDAG/style.less';

export const endPointStyles = css({
  "&.right": {
    top: 'calc(0px - 10px)',
    left: "88px",
  },
  "&.bottom": {
    left: 'calc(50% - 10px)',
  },
  borderRadius: "50%",
  position: "absolute",
  top: "5px",
  left: "-12px",
  width: "35px",
  height: "35px",
  zIndex: 200001,
});
export const nodeWrapperStyles = css({
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  position: "relative",
  width: "100%",
});
export const nodeStyles = css({
  background: "white",
  border: "2px solid #7EDAD4",
  height: "50px",
  width: "100px",
  zIndex: 20000,
});

export const getIcon = (icon, ) => {
  if(typeof icon === 'string'){
    icon = <Icon type={icon}></Icon>
  }
  return icon;
}
export const getConfig = () => {
  return <Icon type="setting" onClick={() => console.log('iconSetting')}></Icon>;
}
export default class NodeLink extends NodeDefault {
  constructor(props){
    super(props);
    this.state = {
      ...this.state,
      onClick: () => {},
    }
    this.state.defaultStyle.width = '200px';
    this.state.defaultStyle.height = '40px';
    // this.state.defaultStyle.lineHeight = '40px';
    this.state.defaultStyle.border = '1px solid #0085d0';
  }

  componentDidMount() {
    const { transformSource, makeTargetParams } = getSettings();
    const initConfig = {
      endPointParams: [
        {
          element: this.refs["targetPort"],
          params: {
            ...transformSource,
            isSource: true,
            uuid: `${this.props.id}-transform`,
          },
          referenceParams: {},
        },
      ],
      makeTargetParams: makeTargetParams,
      nodeId: this.props.id,
    };
    this.props.initNode(initConfig);
  }

  render() {
    const config = this.props.config || {};
    const style = {
      ...this.state.defaultStyle,
      ...config.style,
    };
    //config.state : success error loading
    return (
      <div id={this.props.id} className={`${nodeStyles} ${styles.dag}`} style={style}>
        <div className={`anticon ${nodeWrapperStyles} ${config.state}`}>
          {getIcon(config.icon)}
          {config.label || this.props.id}
          <div
            id={`${this.props.id}-target-1`}
            ref="targetPort"
            className={`${endPointStyles} bottom`}
          />
        </div>
      </div>
    );
  }
}

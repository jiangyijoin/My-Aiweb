/**
 * Created by PanStar on 2018/2/27.
 */
import * as React from "react";
import NodeLink, {endPointStyles, nodeWrapperStyles, nodeStyles, getIcon} from "./NodeLink";
import { getSettings } from "../commonDAG/dag-settings";
import styles from '../commonDAG/style.less';

export default class NodeType extends NodeLink {
  constructor(props){
    super(props);
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
        {
          element: this.refs["targetPort2"],
          params: {
            ...transformSource,
            // isSource: true,
            uuid: `${this.props.id}-transform2`,
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
    const Id = this.props.id;
    return (
      <div id={Id} className={`${nodeStyles} ${styles.dag}`} style={style} onClick={() => this.props.onClick(config)}>
        <div className={`anticon ${nodeWrapperStyles} ${config.state}`}>
          {getIcon(config.icon)}
          {config.label || this.props.id}
          <div
            id={`${Id}-target-1`}
            ref="targetPort"
            className={`${endPointStyles} bottom`}
            style={{left: 'calc(50% - 20px)',}}
          />
          <div
            id={`${Id}-target-2`}
            ref="targetPort2"
            className={`${endPointStyles} bottom`}
            style={{left: '50%'}}
          />
        </div>
      </div>
    );
  }
}

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
    const { transformSource } = getSettings();
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
      makeTargetParams: {
        allowLoopback: false,
        anchor: "ContinuousTop",
        dropOptions: { hoverClass: "drag-hover" },
        isTarget: true,
      },
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
    const { onClick = this.state.onClick } = this.props;
    return (
      <div id={Id} className={`${nodeStyles} ${styles.dag}`} style={style} onClick={() => onClick(config)}>
        <div className={`anticon ${nodeWrapperStyles} ${config.state}`}>
          {getIcon(config.icon)}
          {config.label || this.props.id}
          <div
            id={`${Id}-target-1`}
            ref="targetPort"
            className={`${endPointStyles} bottom`}
          />
        </div>
      </div>
    );
  }
}

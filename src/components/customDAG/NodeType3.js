/**
 * Created by PanStar on 2018/1/24.
 */
import * as React from "react";

import { endPointStyles, nodeWrapperStyles } from "./NodeType1";

import NodeDefault from "./NodeDefault";
import { css } from "glamor";
import { getSettings } from "../commonDAG/dag-settings";

const nodeStyles = css({
  background: "white",
  border: `2px solid #FFEC94`,
  cursor: "pointer",
  height: "50px",
  left: "200px",
  position: "absolute",
  top: "200px",
  width: "120px",
});

const modEndPointStyles = css({
  "&.bottom": {
    left: "45px",
    top: "25px",
  },
  "&.right": {
    left: "105px",
  },
});

export default class NodeType3 extends NodeDefault {
  constructor(props){
    super(props);
    this.state = {
      ...this.state,
      rightEndpointRef: null,
      bottomEndpointRef: null
    }
  }

  componentDidMount() {
    const { conditionBottomEndpoint, conditionRightEndpoint } = getSettings();
    const initConfig = {
      endPointParams: [
        {
          element: this.rightEndpointRef,
          params: {
            ...conditionRightEndpoint,
            isSource: true,
            uuid: `${this.props.id}-condition-right`,
          },
          referenceParams: {},
        },
        {
          element: this.bottomEndpointRef,
          params: {
            ...conditionBottomEndpoint,
            uuid: `${this.props.id}-condition-bottom`,
          },
          referenceParams: {},
        },
      ],
      makeTargetParams: {
        allowLoopback: false,
        anchor: "ContinuousLeft",
        dropOptions: { hoverClass: "drag-hover" },
        isTarget: true,
      },
      nodeId: this.props.id,
    };
    this.props.initNode(initConfig);
  }

  render() {
    let style = this.state.defaultStyle;
    if (this.props.config) {
      style = {
        ...style,
        ...this.props.config.style,
      };
    }
    return (
      <div
        id={this.props.id}
        className={`${nodeStyles}`}
        style={style}
      >
        <div className={`${nodeWrapperStyles}`}>
          {this.props.config.label ? this.props.config.label : this.props.id}
          <div
            id={`${this.props.id}-right`}
            ref={ref => (this.rightEndpointRef = ref)}
            className={`${endPointStyles} ${modEndPointStyles} right`}
          />
          <div
            id={`${this.props.id}-bottom`}
            ref={ref => (this.bottomEndpointRef = ref)}
            className={`${endPointStyles} ${modEndPointStyles} bottom`}
          />
        </div>
      </div>
    );
  }
}

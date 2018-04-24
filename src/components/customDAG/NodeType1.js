/**
 * Created by PanStar on 2018/1/23.
 */
import * as React from "react";

import NodeDefault from "./NodeDefault";
import { css } from "glamor";
import { getSettings } from "../commonDAG/dag-settings";

export const endPointStyles = css({
  "&.right": {
    left: "85px",
  },
  borderRadius: "100%",
  height: "25px",
  left: "-12px",
  position: "absolute",
  top: "5px",
  width: "25px",
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

export default class NodeType1 extends NodeDefault {
  constructor(props){
    super(props);
    this.state = {
      ...this.state,
      rightEndpointRef: null
    }
  }

  componentDidMount() {
    const { transformSource } = getSettings();
    const initConfig = {
      endPointParams: [
        {
          element: this.rightEndpointRef,
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
            className={`${endPointStyles} right`}
          />
        </div>
      </div>
    );
  }
}

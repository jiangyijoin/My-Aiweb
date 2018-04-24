/**
 * Created by PanStar on 2018/1/24.
 */
import * as React from "react";

import { endPointStyles, nodeStyles, nodeWrapperStyles } from "./NodeType1";

import NodeDefault from "./NodeDefault";
import { css } from "glamor";
import { getSettings } from "../commonDAG/dag-settings";

const modNodeStyle = css({
  border: `2px solid #588188`,
});

const modEndpointStyles = css({
  zIndex: 20001,
});
export default class NodeType2 extends NodeDefault {
  constructor(props){
    super(props);
    this.state = {
      ...this.state,
      rightEndpointRef: null
    }
  }
  componentDidMount() {
    const { transformSource, transformSink } = getSettings();
    const initConfig = {
      endPointParams: [
        {
          element: this.rightEndpointRef,
          params: {
            ...transformSource,
            isSource: true,
            uuid: `${this.props.id}-DottedEndpoint-right`,
          },
          referenceParams: {},
        },
      ],
      makeTargetParams: {
        allowLoopback: false,
        anchor: "ContinuousLeft",
        dropOptions: { hoverClass: "drag-hover" },
        isTarget: true,
        uuid: `${this.props.id}-DottedEndPoint`,
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
        className={`${nodeStyles} ${modNodeStyle}`}
        style={style}
      >
        <div className={`${nodeWrapperStyles}`}>
          {this.props.config.label ? this.props.config.label : this.props.id}
        </div>
        <div
          id={`${this.props.id}-right`}
          ref={ref => (this.rightEndpointRef = ref)}
          className={`${endPointStyles} ${modEndpointStyles} right`}
        />
      </div>
    );
  }
}

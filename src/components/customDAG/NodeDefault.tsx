/**
 * Created by PanStar on 2018/1/23.
 */
import "jsplumb";
import * as React from 'react';
import { extend } from 'lodash';
import DAG, { configureStore, STOREACTIONS } from 'react-dag';
import '../commonDAG/style.less'
import { IConnectionParams, IInitNodeProps,
  IConnectionRule, IEndPointArgs,
  INode, INodeConfig,} from "../commonDAG/model";

export interface INodeProps {
  id: string;
  config?: INodeConfig;
  initNode?: (initConfig: IInitNodeProps) => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export default class NodeDefault extends React.Component<INodeProps, {}> {
  public constructor(props){
    super(props);
    this.state = {
      defaultProps : {
        config: {
          style: {},
        }
      },
      defaultStyle : {
        position: "absolute",
        display: "inline-block",
        borderRadius: "5px",
        textAlign: "center",
        cursor: "pointer"
      }
    }
  }

  public componentDidMount() {
    const source = {
      endpoint: "Dot",
      isSource: true,
      maxConnections: -1, // -1 means unlimited connections
      paintStyle: {
        connectorStyle: {
          lineWidth: 2,
          outlineColor: "transparent",
          outlineWidth: 4,
          strokeStyle: "#4e5568",
          strokeWidth: 3,
        },
        fill: "black",
        lineWidth: 3,
        radius: 5,
        stroke: "black",
      },
    };
    if (this.props.initNode && typeof this.props.initNode === "function") {
      const initConfig = {
        endPointParams: [
          {
            element: this.refs.rootRef,
            params: source,
            referenceParams: {},
          },
        ],
        nodeId: this.props.id,
      };
      this.props.initNode(initConfig);
    }
  }
  public render() {
    const config = this.props.config || {};
    const style = {
      ...this.state.defaultStyle,
      ...config.style,
      width: '100px',
      height: '30px',
      border: "1px solid #0085d0"
    };
    return (
      <div id={this.props.id} ref="rootRef" style={style}>
        {config.label || this.props.id}
      </div>
    );
  }
}

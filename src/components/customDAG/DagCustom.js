/**
 * Created by PanStar on 2018/2/26.
 */

import React from 'react';
import ReactDAG from 'react-dag';
import { Icon } from 'antd'
import NodeLink from './NodeLink'
import NodeSource from './NodeSource'
import NodeTarget from './NodeTarget'
import Node1to1 from './Node1to1'
import Node1to2 from './Node1to2'
import Node2to1 from './Node2to1'
import dagre from "dagre";
import uuid from 'node-uuid';
import { cloneDeep } from 'lodash';
// import { data as defData } from "../commonDAG/data";
import styles from './DagCustom.less'
import {
  conditionConnectionDecoder,
  conditionConnectionEncoder,
  transformConnectionDecoder,
  transformConnectionEncoder,
} from "../commonDAG/connectionReducers";
import {
  onConnectionEventHandler,
  onEndPointClick
} from "../commonDAG/eventHandlers";
import {
  defaultSettings,
  dottedConnectionStyle,
  selectedConnectionStyle,
} from "../commonDAG/dag-settings";

let actionControls = [
  // {
  //   id: 'FIT-AND-CLEANUP',
  //   type: 'arrows-alt',
  //   action: 'fit'
  // },
  {
    id: 'ZOOM-IN',
    type: 'plus',
    action: 'zoomIn'
  },
  {
    id: 'ZOOM-OUT',
    type: 'minus',
    action: 'zoomOut'
  }
];

const registerTypes = {
  connections: {
    dotted: dottedConnectionStyle,
    selected: selectedConnectionStyle,
  },
  endpoints: {},
};
const eventListeners = {
  click: onEndPointClick,
  connection: onConnectionEventHandler,
  endpointClick: onEndPointClick,
};
const typeToComponentMap = {
  link: NodeLink,
  source: NodeSource,
  target: NodeTarget,
  N1to1: Node1to1,
  N1to2: Node1to2,
  N2to1: Node2to1,

  10003: NodeSource,
  10005: NodeTarget,
  10001: Node1to2,
  10002: Node1to1,
  10004: Node2to1,
  10006: Node1to1,
  10007: Node1to1,
};

const getComponent = (type) =>
  typeToComponentMap[type] ? typeToComponentMap[type] : NodeLink; //NodeDefault

const getLayout = (nodes, connections, separation = 200) => {
  const graph = new dagre.graphlib.Graph();
  graph.setGraph({
    marginx: 0,
    marginy: 0,
    nodesep: 90,
    rankdir: "TB",
    ranker: "longest-path",
    ranksep: separation, //连接线长度
  });
  graph.setDefaultEdgeLabel(() => ({}));

  nodes.forEach(node => {
    const id = node.id;
    graph.setNode(id, { label: node.config.label, width: 50, height: 50 });
  });

  connections.forEach(connection => {
    graph.setEdge(connection.sourceId, connection.targetId);
  });

  dagre.layout(graph);
  // graph.nodes().forEach(function(v) {console.log("Node " + v + ": " + JSON.stringify(graph.node(v)))});
  return graph;
};
const generateNodeConfig = (type) => ({
  config: {
    label: `Node Type: ${type} #${Math.ceil(Math.random() * 100)}`,
    type: type,
  },
  id: type + uuid.v4()
});

class DagCustom extends React.Component {
  constructor(props){
    super(props);
    const { dataSource = {}, func = {} } = props;
    let data = cloneDeep(dataSource) || {nodes:[],connections:[]};
    // data = cloneDeep(defData);
    this.initData(data, func.onClick);
    this.state = {
      timestamp: props.timestamp,
      connections: data.connections,
      nodes: data.nodes,
      zoom: 1,
    };
    // this.addNode = this.addNode.bind(this);
    this.setZoom = this.setZoom.bind(this);
  }
  componentWillReceiveProps() {
    const { timestamp, processState = [], dataSource = {}, func = {} } = this.props;
    let data = cloneDeep(dataSource) || {nodes:[],connections:[]};
    let { nodes = [], connections = [] } = data;
    let node = nodes[0] || {};
    // if(this.state.nodes.filter(i => i.id === node.id).length > 0){
    if(this.state.timestamp === timestamp){
      nodes = this.state.nodes;
      connections = this.state.connections;
    }else{
      this.initData(data, func.onClick);
    }
    //更新状态
    const stateMap = {};
    processState.forEach(i => stateMap[i.pcmptId] = i);
    nodes.forEach(i => {
      if(i.id in stateMap){
        const resultCode = stateMap[i.id]['resultCode'];
        i.config.state = ['success','loading'][resultCode] || 'error';
        i.config.stateInfo = stateMap[i.id];
      }
    });
    this.setState({
      nodes,
      connections,
    })
  }
  initData = (data, onClick = () => console.log('click node', node)) => {
    const graphNodes = getLayout(data.nodes, data.connections, 30);
    data.connections = data.connections.map(i => {
      i.sourceId = `${i.sourceId}-target-${i.sourcePort || '1'}`;
      return i;
    });
    data.nodes = data.nodes.map(node => {
      const location = graphNodes._nodes[node.id];
      const { layoutX = location.x, layoutY = location.y } = node.config;
      node.config.style = {
        left: `${layoutX}px`,
        top: `${layoutY}px`,
      };
      node.onClick = onClick;
      // node.onDelete = this.removeNode;
      return node;
    });
  };
  addNode = (type) => {
    this.setState({
      nodes: [...this.state.nodes, generateNodeConfig(type)],
    });
  };
  removeNode = (type) => {
    console.log('removeNode')
  };
  setZoom = (zoomIn) => {
    if (zoomIn) {
      this.setState({ zoom: this.state.zoom + 0.2 });
    } else {
      this.setState({ zoom: this.state.zoom - 0.2 });
    }
    // console.log('zoom', this.state.zoom)
  };
  actionFunc = (action) => {
    if('zoomIn' === action){
      this.setZoom(true);
    }else if('zoomOut' === action){
      this.setZoom(false);
    }else{
      this.addNode("10003")
    }
  };
  renderActions = (actions) => {
    return actions.map((item) => {
      return <div key={item.id} className="p-action">
        <Icon type={item.type} className="p-icon" onClick={this.actionFunc.bind(this, item.action)}></Icon>
      </div>;
    });
  };

  render() {
    // console.log('DAGCustom',this.state)
    return (
      <div className={styles.drag}>
        <ReactDAG
          nodes={cloneDeep(this.state.nodes)}
          connections={cloneDeep(this.state.connections)}
          jsPlumbSettings={defaultSettings}
          connectionDecoders={[
            transformConnectionDecoder,
            conditionConnectionDecoder,
          ]}
          connectionEncoders={[
            transformConnectionEncoder,
            conditionConnectionEncoder,
          ]}
          eventListeners={eventListeners}
          registerTypes={registerTypes}
          onChange={({ nodes, connections }) => {
            this.setState({ nodes, connections });
          }}
          zoom={this.state.zoom}
        >
          {this.state.nodes.map((node, i) => {
            const Component = getComponent(node.config ? node.config.type : "");
            return <Component key={i} {...node} />;
          })}
        </ReactDAG>
        <div className="p-actions">
          {this.renderActions(actionControls)}
        </div>
      </div>
    );
  }
}

export default DagCustom

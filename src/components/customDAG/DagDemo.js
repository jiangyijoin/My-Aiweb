/**
 * Created by PanStar on 2018/1/24.
 */
import React from 'react';
import ReactDAG from 'react-dag';
import NodeDefault from './NodeDefault'
import NodeType1 from './NodeType1'
import NodeType2 from './NodeType2'
import NodeType3 from './NodeType3'
import dagre from "dagre";
import { cloneDeep } from 'lodash';
import { data } from "../commonDAG/data";

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

// const HEIGHT_OF_HEADER = 90;
// const HEIGHT_OF_BUTTON_PANEL = 50;
// const headerStyles = css({
//     alignItems: "center",
//     display: "flex",
//     height: `${HEIGHT_OF_HEADER}px`,
//     justifyContent: "center",
//     margin: 0,
// });

// const buttonPanelStyles = css({
//     alignItems: "center",
//     background: "white",
//     display: "flex",
//     height: `${HEIGHT_OF_BUTTON_PANEL}px`,
//     justifyContent: "center",
// });
//
// const buttonStyles = css({
//     border: `1px solid ${theme.main.colors.salmonPink}`,
//     boxShadow: `${theme.main.boxShadow()}`,
//     fontSize: "inherit",
//     margin: "0 5px",
//     padding: "5px",
// });
// const nodeType1Styles = css({
//     backgroundColor: theme.main.colors.blueGreen,
// });
//
// const nodeType2Styles = css({
//     backgroundColor: theme.main.colors.teal,
// });
//
// const nodeType3Styles = css({
//     backgroundColor: theme.main.colors.yellow,
// });
//
// const dagWrapperStyles = css({
//     background: "white",
//     height: `calc(100vh - ${HEIGHT_OF_HEADER}px - ${HEIGHT_OF_BUTTON_PANEL +
//     1}px)`,
//     width: "100vw",
// });

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
    action: NodeType2,
    condition: NodeType3,
    sink: NodeType1,
    source: NodeDefault,
    transform: NodeType1,
};

const getComponent = (type) =>
    typeToComponentMap[type] ? typeToComponentMap[type] : NodeDefault;

const getLayout = (nodes, connections, separation = 200) => {
    const graph = new dagre.graphlib.Graph();
    graph.setGraph({
        marginx: 0,
        marginy: 0,
        nodesep: 90,
        rankdir: "LR",
        ranker: "longest-path",
        ranksep: separation,
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
    // graph.nodes().forEach(function(v) {console.log("Node " + v + ": " + JSON.stringify(graph.node(v)));});
    return graph;
};
const generateNodeConfig = (t) => ({
    config: {
        label: `Node Type: ${type} #${Math.ceil(Math.random() * 100)}`,
        type: t,
    },
    id: uuidv4(),
});
const graphNodes = getLayout(data.nodes, data.connections, 100);
data.nodes = data.nodes.map(node => {
    const location = graphNodes._nodes[node.id];
    node.config.style = {
                            left: `${location.x}px`,
                            top: `${location.y}px`,
                        };
    return node;
});

class DagDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            connections: data.connections,
            nodes: data.nodes,
            zoom: 1,
        }
        // this.addNode = this.addNode.bind(this);
        // this.setZoom = this.setZoom.bind(this);
    }
    addNode = (type) => {
        this.setState({
            nodes: [...this.state.nodes, generateNodeConfig(type)],
        });
    };
    setZoom = (zoomIn) => {
        if (zoomIn) {
            this.setState({ zoom: this.state.zoom + 0.2 });
        } else {
            this.setState({ zoom: this.state.zoom - 0.2 });
        }
    };
    render() {
        return (
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
                onChange={({
                               nodes: n,
                               connections: c,
                           }) => {
                    this.setState({ nodes: n, connections: c });
                }}
                eventListeners={eventListeners}
                registerTypes={registerTypes}
                zoom={this.state.zoom}
            >
                {this.state.nodes.map((node, i) => {
                    const Component = getComponent(node.config ? node.config.type : "");
                    return <Component key={i} id={node.id} />;
                })}
            </ReactDAG>
        );
    }
}

export default DagDemo

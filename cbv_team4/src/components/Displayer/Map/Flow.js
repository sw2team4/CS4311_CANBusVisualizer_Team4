import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, MiniMap, useNodesState, useEdgesState } from 'reactflow';
import { useUpdateNodeInternals } from 'reactflow';
import 'reactflow/dist/style.css'
import { useState, useCallback, useEffect } from 'react';

import CustomNode from './CustomNode';
import { ContextMenu } from './contextMenu';
import './updateNode.css';
import EditPopup from '../Popups/Edit/EditPopup';


// import Engine from 'cbv_team4/src/images/Engine.png'

const nodeTypes = {
    selectorNode: CustomNode,
};

function random(min, max) {
    return min + Math.random() * (max - min);
}

export function updateMap(id) {
    // const updateNodeInternals = useUpdateNodeInternals();
    // updateNodeInternals(id)
}

// receive node data
var index = 0

const initBgColor = '#1A192B';

// define constants
const baseNode = 'CAN-BUS-MAP'
const baseWidth = 1500
const baseHeight = 30
const maxNodes = 20

// automated initial nodes; baseNode is line
var initialNodes = [
    {
        id: baseNode, //required
        position: { x: -(baseWidth / 2), y: 0 }, //required
        data: { label: "Click To Refresh" },
        type: 'output',
        style: { border: '1px solid black', width: baseWidth, height: baseHeight, backgroundColor: 'orange', },
        dragging: false,
        // hidden: true,
        dragHandle: false,
        parentNode: '',
        hidden: false,
    }
];

// automated initial edges
var initialEdges = [];

const half = (maxNodes / 2)
const quarter = (maxNodes / 4)
const scalar = (baseWidth / maxNodes) * 2.5

//Setting a range where nodes and edges will be displayed in map
for (var i = 1; i <= maxNodes; i++) {
    if ((i / half) > 1) {
        var y = -75
    } else {
        var y = 50
    }

    var quad = (i / quarter)
    //decide to place nodes left or right of the map
    if (Math.floor(quad + 1) % 2 == 0)
        //left of can bus node origin
        var x = -((1 + i % quarter) * scalar)
    else
        //right of can bus node origin
        //TODO: Fill in the Label - automated
        var x = ((i % quarter) * scalar)
    var node = { id: 'node' + String(i), position: { x: x, y: y }, data: { label: 'undefined' }, expandParent: true, type: 'input', hidden: true }
    var edge = { id: 'edge' + String(i), source: 'node' + String(i), target: baseNode, type: 'smoothstep', style: { stroke: 'black' } }
    initialNodes.push(node)
    initialEdges.push(edge)
}

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [open,setOpen] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [position,setPosition] = useState({});
    const [elements, setElements] = useState([]);  // main data elements for save
    const [nodeData, setnodeData] = useState(null);
    const [bgColor, setBgColor] = useState(initBgColor);
    const [inputChange, setinputChange] = useState("");
    const [nodeName, setNodeName] = useState('Node 1');
    const [nodeBg, setNodeBg] = useState('#eee');
    const [nodeHidden, setNodeHidden] = useState(false);

    let [EditPopup, setEditPopup] = useState(false);
    const showNodeModal = () => setEditPopup(true)
    const hideNodeModal = () => setEditPopup(false)


    // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    // -----------------
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => 
            applyNodeChanges(changes, nds)), []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => 
        applyEdgeChanges(changes, eds)), []
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) =>
            addEdge(params, eds)), []
    );

    const deleteNode = () => {
        setElements((elements) => elements.filter((element) => element.id == nodeData.id));
        setIsOpen(false);
    };

    const onElementClick = (event, node) => {
        handleClickOpen();
        setnodeData(node);
        const findElement = elements.find(items => items.id === node.id);
        if (findElement) {
            setinputChange(findElement?.data?.label || findElement?.label);
        }
    };

    useEffect(() => {
        setElements(initialNodes);
    }, [])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setElements([...elements])
        setnodeData(null);
    };

    let id = elements.length;
    const getId = () => `node_${id + 1}`;

    const onContextMenu = (e) => {
        console.log(e.target);
        e.preventDefault();
        setIsOpen(true);
        // setPosition({x: e.clientX, y: e.clientX});
        return e
    }

    const createNew = () => {
        const newNode = {
            id: getId(),
            type: 'customnode',
            data: { label: 'An input node', type: "node" },
            position: { x: 20, y: 20 },
            sourcePosition: 'right',
        }
        setElements((es) => es.concat(newNode));
    }

    useEffect(() => {
        if (nodeData) {
            setElements((els) =>
                els.map((el) => {
                    if (el.id === nodeData.id) {
                        // it's important that you create a new object here
                        // in order to notify react flow about the change
                        el.data = {
                            ...el.data,
                            label: inputChange,
                        };
                    }
                    return el;
                })
            );
        }
    }, [inputChange]);

    const handleHidden = (event) => {
        const hiddenStatus = event.target.hidden;
        event.target.hidden = !hiddenStatus;
    }

    const UpdateNode = () => {
        useEffect(() => {
            setNodes((nds) =>
                nds.map((node) => {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    node.data = {
                        ...node.data,
                        label: nodeName,
                    };

                    return node;
                })
            );
        }, [nodeName, setNodes]);

        useEffect(() => {
            setNodes((nds) =>
                nds.map((node) => {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    node.style = { ...node.style, backgroundColor: nodeBg };

                    return node;
                })
            );
        }, [nodeBg, setNodes]);

        useEffect(() => {
            setNodes((nds) =>
                nds.map((node) => {
                    // when you update a simple type you can just update the value
                    node.hidden = nodeHidden;

                    return node;
                })
            );
            setEdges((eds) =>
                eds.map((edge) => {
                    edge.hidden = nodeHidden;

                    return edge;
                })
            );
        }, [nodeHidden, setNodes, setEdges]);

    }


    return (
        <div style={{ height: '35%', width: '98%', marginTop: '4%', marginLeft: '1%' }}>
            <ReactFlow
                elements={elements}
                nodes={nodes}
                onNodesChange={onNodesChange}// USED
                edges={edges}
                onEdgesChange={onEdgesChange} // not used
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView={true}
                onNodeContextMenu={onContextMenu}
                onElementClick={onElementClick} //not used
                onUpdate={UpdateNode} //not used
            >
                <div className="updatenode__controls">
                    <label>label:</label>
                    <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />

                    <label className="updatenode__bglabel">background:</label>
                    <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />

                    <div className="updatenode__checkboxwrapper">
                        <label>hidden:</label>
                        <input
                            type="checkbox"
                            checked={nodeHidden}
                            onChange={(evt) => setNodeHidden(evt.target.checked)}
                        />
                    </div>
                </div>
                <ContextMenu
                    isOpen={isOpen}
                    position={position}
                    // onMouseLeave={()=>setIsOpen(false)}
                    actions={[{ label: 'Delete', effect: deleteNode }, { label: 'Hidden', effect: handleHidden }, { label: 'Add Off-Limits', effect: handleHidden }, { label: 'Rename', effect: handleHidden }]}

                />
                <Background />
                <Controls />
                <MiniMap style={minimapStyle}
                    nodeStrokeColor={(n) => {
                        if (n.type === 'input') return '#0041d0';
                        if (n.type === 'selectorNode') return bgColor;
                        if (n.type === 'output') return '#ff0072';
                    }}
                    nodeColor={(n) => {
                        if (n.type === 'selectorNode') return bgColor;
                        return '#fff';
                    }}
                />
            </ReactFlow>
        </div>
    )
}

export default Flow
export { initialNodes, initialEdges }
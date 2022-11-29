import ReactFlow, {Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, MiniMap, useNodesState, useEdgesState} from 'reactflow';
import 'reactflow/dist/style.css'
import {useState, useCallback, useEffect} from 'react';

import CustomNode from './CustomNode';
import { ContextMenu } from './contextMenu';
import './updateNode.css';
import EditPopup from '../Popups/Edit/EditPopup';




// import Engine from 'cbv_team4/src/images/Engine.png'

const nodeTypes = {
    selectorNode: CustomNode,
};

function random(min, max){
    return min + Math.random() * (max - min);
}

const initBgColor = '#1A192B';


// Create nodes
const initialNodes = [
    {
        id: 'CAN-BUS-MAP', //required
        position: {x: -5000, y: 0}, //required
        data: null,
        type: 'output',
        style: { border: '1px solid black', width: 10000, height: 1, backgroundColor: 'black'},
        dragging: false,
        // hidden: true,
        dragHandle: false,
        parentNode: '',
    },
    {
        id: 'CN', //required
        position: {x: -4900, y: -200}, //required
        data: {label: 'Crash Notification'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'WAND', //required
        position: {x: -4800, y: -200}, //required
        // data: {label: 'Wand Sensor'},
        type: 'selectorNode',
    },
    {
        id: 'LDISP', //required
        position: {x: -4700, y: -200}, //required
        data: {label: 'Linear Displacement Sensor'},
        expandParent: true,
        type: 'input',

    },
    {
        id: 'MSI2', //required
        position: {x: -4500, y: -200}, //required
        data: {label: 'Magnet Status Information 2'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'ACCS', //required
        position: {x: -4300, y: -200}, //required
        data: {label: 'Acceleration Sensor'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'ETC12', //required
        position: {x: -4100, y: -200}, //required
        data: {label: 'Electronic Transmission Controller #12'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'B2', //required
        position: {x: -3900, y: -200}, //required
        data: {label: 'Brakes 2'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'HRW', //required
        position: {x: -3700, y: -200}, //required
        data: {label: 'High Resolution Wheel Speed'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'TSC1', //required
        position: {x: -3500, y: -200}, //required
        data: {label: 'Torque/Speed Control 1'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'TC1', //required tree
        position: {x: -1500, y: -600}, //required
        data: {label: 'Transmission Control 1', },
        expandParent: true,
        type: 'default',
    },
    {
        id: 'XBR', //required
        position: {x: -3100, y: -200}, //required
        data: {label: 'External Brake Request'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'AUXIO5', //required
        position: {x: -2900, y: -200}, //required
        data: {label: 'Auxiliary Input/Output Status 5'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'SRASI', //required
        position: {x: -2700, y: -200}, //required
        data: {label: 'Transmission Control 1'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'CCVS2', //required
        position: {x: -2500, y: -200}, //required
        data: {label: 'Cruise Control / Vehicle Speed 2'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'AEBS2', //required
        position: {x: -2300, y: -200}, //required
        data: {label: 'Advanced Emergency Braking System 2'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'TC2', //required
        position: {x: -1500, y: -400}, //required
        data: {label: 'Transmission Control 2'},
        expandParent: true,
        type: 'default',
    },
    {
        id: 'CCVS2', //required
        position: {x: -1900, y: -200}, //required
        data: {label: 'Cruise Control / Vehicle Speed 2'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'HVES1C1', //required
        position: {x: -1700, y: -200}, //required
        data: {label: 'High Voltage Energy Storage 1 Control 1'},
        expandParent: true,
        type: 'input',
    },
    {
        id: 'TC3', //required
        position: {x: -1500, y: -200}, //required
        data: {label: 'Transmission Control 3'},
        expandParent: true,
        type: 'default',
        
    },
]

console.log(typeof initialNodes[1].id)

// Create Edges - hard coded
const initialEdges = [
    { id: 'CN-CAN-BUS-MAP', source: 'CN', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'},},
    { id: '', source: '', target: '', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'LDISP-CAN-BUS-MAP', source: 'LDISP', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'MSI2-CAN-BUS-MAP', source: 'MSI2', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'ACCS-CAN-BUS-MAP', source: 'ACCS', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'ETC12-CAN-BUS-MAP', source: 'ETC12', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'B2-CAN-BUS-MAP', source: 'B2', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'HRW-CAN-BUS-MAP', source: 'HRW', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'TSC1-CAN-BUS-MAP', source: 'TSC1', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    // { id: 'TC1-CAN-BUS-MAP', source: 'TC1', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'XBR-CAN-BUS-MAP', source: 'XBR', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'AUXIO5-CAN-BUS-MAP', source: 'AUXIO5', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'SRASI-CAN-BUS-MAP', source: 'SRASI', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'AEBS2-CAN-BUS-MAP', source: 'AEBS2', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    // { id: 'TC2-CAN-BUS-MAP', source: 'TC2', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'HVES1C1-CAN-BUS-MAP', source: 'HVES1C1', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    // { id: 'TC3-CAN-BUS-MAP', source: 'TC3', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'CCVS2-CAN-BUS-MAP', source: 'CCVS2', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},
    // tree
    { id: 'TC1-TC2', source: 'TC1', target: 'TC2', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'TC2-TC3', source: 'TC2', target: 'TC3', type: 'smoothstep', style: {stroke: 'black'}},
    { id: 'TC3-CAN-BUS-MAP', source: 'TC3', target: 'CAN-BUS-MAP', type: 'smoothstep', style: {stroke: 'black'}},




];
// const initialEdges = [];


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
        const findElement = elements.find(items=>items.id===node.id);
        if(findElement){
          setinputChange(findElement?.data?.label||findElement?.label);
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
    const getId = () => `node_${id+1}`;
    
    const onContextMenu = (e) => {
        console.log(e.target);
        e.preventDefault();
        setIsOpen(true);
        // setPosition({x: e.clientX, y: e.clientX});
        return e
    }

    

    const handleHidden = (event) => {
        const hiddenStatus = event.target.hidden;
        event.target.hidden = !hiddenStatus;
    }

    const UpdateNode = () => {
        useEffect(() => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === 'HVES1C1') {
                  // it's important that you create a new object here
                  // in order to notify react flow about the change
                  node.data = {
                    ...node.data,
                    label: nodeName,
                  };
                }
        
                return node;
              })
            );
          }, [nodeName, setNodes]);
        
          useEffect(() => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === '1') {
                  // it's important that you create a new object here
                  // in order to notify react flow about the change
                  node.style = { ...node.style, backgroundColor: nodeBg };
                }
        
                return node;
              })
            );
          }, [nodeBg, setNodes]);
        
          useEffect(() => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === '1') {
                  // when you update a simple type you can just update the value
                  node.hidden = nodeHidden;
                }
        
                return node;
              })
            );
            setEdges((eds) =>
              eds.map((edge) => {
                if (edge.id === 'e1-2') {
                  edge.hidden = nodeHidden;
                }
        
                return edge;
              })
            );
          }, [nodeHidden, setNodes, setEdges]);
      
    }

    // ----------Minimap------------------------------------
    const minimapStyle = {
        height: 120,
        width: 150,
    };
      

  return (
    <div style={{height: '45%', width: '98%', marginTop: '4%', marginLeft: '1%'}}>
        <ReactFlow
            elements={elements}
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeContextMenu={onContextMenu}
            nodeTypes={nodeTypes}
            fitView
            //remove this maybe
            onElementClick={onElementClick}
            onUpdate={UpdateNode}
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
                onMouseLeave={()=>setIsOpen(false)}
                actions={[{label:'Delete', effect:deleteNode}, 
                {label:'Hidden', effect:handleHidden}, 
                {label:'Add Off-Limits', effect:handleHidden}, 
                {label:'Rename', effect:handleHidden}]}

            />
            <Background/>
            <Controls/>
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


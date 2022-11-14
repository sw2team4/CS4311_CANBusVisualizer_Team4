import ReactFlow, {Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, MiniMap} from 'reactflow';
import 'reactflow/dist/style.css'
import {useState, useCallback} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {FaRegCopy, FaList,FaEllipsisV, FaShareAlt} from 'react-icons/fa'
import {RiSendPlaneFill, RiDeleteBin6Line} from 'react-icons/ri'

const copyCoupon = (e, data) => {
    var coupon = data.copy
    navigator.clipboard.writeText(coupon)
    alert(`Coupon code ${coupon} copied to your clipboard`)
  }
  
// Create nodes
const initialNodes = [
    {
        id: '1', //required
        position: {x: 0, y: 250}, //required
        // data: {label: 'Engine'},
        type: 'input',
        style: { border: '1px solid red', width: 1000, height: 1, },
        dragging: false,
    },
    {
        id: '2', //required
        position: {x: 100, y: 100}, //required
        data: {label: 'Lights'},
    },
    {
        id: '3', //required
        position: {x: Math.random() * 100, y: Math.random() * 100}, //required
        data: {label: 'Im 3'},
        type: 'input',
    },
    {
        id: '4', //required
        position: {x: Math.random() * 100, y: Math.random() * 100}, //required
        data: {label: 'Im 4'},
        type: 'input',
    },
    {
        id: '5', //required
        position: {x: Math.random() * 100, y: Math.random() * 100}, //required
        data: {label: 'Im 5'},
        type: 'input',
    },
    {
        id: '6', //required
        position: {x: Math.random() * 100, y: Math.random() * 100}, //required
        data: {label: 'Im 6'},
        type: 'input',
    },
]

// Create Edges - hard coded
// const initialEdges = [{ id: '1-2', source: '1', target: '2'}];
const initialEdges = [];


function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

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

    const minimapStyle = {
        height: 120,
        width: 150,
    }; 

  return (
    <div style={{height: '45%', width: '98%', marginTop: '4%', marginLeft: '1%'}}>
        <ReactFlow
            // elements={elements}
            nodes={nodes} 
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            >

            <Background/>
            <Controls/>
            <MiniMap style={minimapStyle}/>
        </ReactFlow>
    </div>
  )
}

export default Flow
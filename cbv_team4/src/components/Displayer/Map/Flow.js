import ReactFlow, {Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, MiniMap} from 'reactflow';
import 'reactflow/dist/style.css'
import {useState, useCallback} from 'react';


// Create nodes
const initialNodes = [
    {
        id: '1', //required
        position: {x: 0, y: 0}, //required
        data: {label: 'Engine'},
        type: 'input',
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

    // const [elements, setElements] = useState(initialNodes);
    // const [name, setName] = useState("");

    // const addNode = () => {
    //     setElements(e => e.concat({
    //         id: (e.length+1).toString(),
    //         data: {label: ''.concat(name)},
    //         position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
    //     }));
    // };


    // const onAdd = useCallback(() => {
    //     const newNode = {
    //         id: addNode(),
    //         data: { label: 'Added node' },
    //         position: {
    //             x: Math.random() * 500,
    //             y: Math.random() * 500,
    //         },
    //     };
    //     setNodes((nds) => nds.concat(newNode));
    // }, [setNodes]);


  return (
    <div style={{height: '680px', width: '50vw'}}>
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
import React, { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Controls, MiniMap, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { initialNodes, initialEdges } from 'Flow';

import './updateNode.css';

// const initialNodes = [
//   { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
//   { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
// ];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const UpdateNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [nodeName, setNodeName] = useState('Example Node');
  const [nodeBg, setNodeBg] = useState('#fff');
  const [nodeHidden, setNodeHidden] = useState(false);

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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultZoom={1.5}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition="bottom-left"
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
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default UpdateNode;
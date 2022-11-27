import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import '../Visualizer/Visualizer.css'
import EditPopup from '../Popups/Edit/EditPopup';

export default memo(({ data, isConnectable }) => {
    const handleStyle = { left: 10 };



  return (
    <>
    {/* Add dot to connect to */}
    <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} />
    <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} />
    <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} />
 
    

    <div className='nodeContainer'>
        <div>
            <label>Wand Sensor</label>
        </div>
        <div>
            <img className='node-icon' alt='node-icon' src='Engine.png'></img>
        </div>
    </div>
    </>
  );
});

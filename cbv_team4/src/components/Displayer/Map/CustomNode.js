import React, { memo } from 'react';
import { Handle } from 'reactflow';

import EditPopup from '../Popups/EditPopup';

export default memo(({ data, isConnectable }) => {
  return (
    <>
    {/* Add dot to connect to */}
    <Handle
        type="target"
        position="top"
        isConnectable={isConnectable}
    />
    <Handle
        type="source"
        position="bottom"
        id="2"//idk what this is yet
        isConnectable={isConnectable}
    />

    <div className='nodeContainer'>
        <label>Wand Sensor</label>
        <span>
            {/* <EditPopup></EditPopup> */}
        </span>
        <footer>
            <EditPopup></EditPopup>
        </footer>
    </div>
    </>
  );
});

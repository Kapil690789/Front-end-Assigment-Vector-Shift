// frontend/src/nodes/textNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode'; // Import BaseNode

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Pass 'Text' as the label
  const nodeData = { ...data, label: 'Text' };

  return (
    // Use BaseNode as the wrapper
    <BaseNode data={nodeData}>
      
      {/* Node Content */}
      <label style={{ display: 'block' }}>
        Text:
        <input 
          type="text" 
          value={currText} 
          onChange={handleTextChange} 
          style={{ width: '100%' }}
        />
      </label>

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </BaseNode>
  );
}
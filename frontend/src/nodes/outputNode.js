// frontend/src/nodes/outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode'; // Import BaseNode

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  // Pass 'Output' as the label
  const nodeData = { ...data, label: 'Output' };

  return (
    // Use BaseNode as the wrapper
    <BaseNode data={nodeData}>
      
      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
      />

      {/* Node Content */}
      <label style={{ display: 'block', marginBottom: '5px' }}>
        Name:
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
          style={{ width: '100%' }}
        />
      </label>
      <label style={{ display: 'block' }}>
        Type:
        <select value={outputType} onChange={handleTypeChange} style={{ width: '100%' }}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}
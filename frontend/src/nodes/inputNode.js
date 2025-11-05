
import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode'; // <-- This is correct

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  // Pass the title 'Input' to the BaseNode's data prop
  const nodeData = { ...data, label: 'Input' };

  return (
    // ---- START OF CHANGES ----
    // Use BaseNode as the wrapper
    <BaseNode data={nodeData}>
      
      {/* This is the 'children' part for BaseNode */}
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
        <select value={inputType} onChange={handleTypeChange} style={{ width: '100%' }}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
      
      {/* The Handle is now inside BaseNode's children */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
      />
    </BaseNode>
    // ---- END OF CHANGES ----
  );
}
// frontend/src/nodes/textNode.js

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode'; 
import TextareaAutosize from 'react-textarea-autosize'; 

// Helper function to find variables
const getVariables = (text) => {
  const matches = text.match(/\{\{([a-zA-Z0-9_]+)\}\}/g);
  if (!matches) {
    return [];
  }
  // Get unique variable names
  return [...new Set(matches.map(match => match.slice(2, -2)))];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  // This effect runs whenever the text changes
  useEffect(() => {
    const newVars = getVariables(currText);
    setVariables(newVars);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const nodeData = { ...data, label: 'Text' };
  
  const formElementClass = "nodrag nopan nowheel block w-full rounded-md border-0 p-1.5 bg-neutral-700 text-white shadow-sm ring-1 ring-inset ring-neutral-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6";

  return (
    <BaseNode data={nodeData}>
      
      {/* --- DYNAMIC HANDLES --- */}
      {/* Map over the found variables and create a Handle for each one */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={variable} // The id should be the variable name
          style={{ top: `${(index + 1) * 30 + 50}px` }} // Space them out
        >
          <span className="text-xs text-gray-400 absolute right-full mr-2 -mt-2">
            {variable}
          </span>
        </Handle>
      ))}
      
      {/* --- AUTO-SIZING TEXT AREA --- */}
      <label className="text-sm font-medium leading-6 text-gray-300">
        Text:
        {/* Replace <input> with <TextareaAutosize> */}
        <TextareaAutosize
          minRows={2} // Start with a minimum of 2 rows
          value={currText} 
          onChange={handleTextChange} 
          className={formElementClass}
          style={{ resize: 'none' }} // Hide the manual resize handle
        />
      </label>

      {/* --- SOURCE HANDLE --- */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </BaseNode>
  );
}
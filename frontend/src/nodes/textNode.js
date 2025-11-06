import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode'; 
import TextareaAutosize from 'react-textarea-autosize'; 
import { FiType } from 'react-icons/fi';

const getVariables = (text) => {
  const matches = text.match(/\{\{([a-zA-Z0-9_]+)\}\}/g);
  if (!matches) {
    return [];
  }
  return [...new Set(matches.map(match => match.slice(2, -2)))];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

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
    <BaseNode data={nodeData} icon={FiType}>
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={variable}
          style={{ top: `${(index + 1) * 30 + 50}px` }}
        >
          <span className="text-xs text-gray-400 absolute right-full mr-2 -mt-2">
            {variable}
          </span>
        </Handle>
      ))}
      <label className="text-sm font-medium leading-6 text-gray-300">
        Text:
        <TextareaAutosize
          minRows={2} 
          value={currText} 
          onChange={handleTextChange} 
          className={formElementClass}
          style={{ resize: 'none' }} 
        />
      </label>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </BaseNode>
  );
} 
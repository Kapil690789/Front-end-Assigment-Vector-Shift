import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode'; 
import { FiLogOut } from 'react-icons/fi';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const nodeData = { ...data, label: 'Output' };
  const formElementClass = "nodrag nopan nowheel block w-full rounded-md border-0 p-1.5 bg-neutral-700 text-white shadow-sm ring-1 ring-inset ring-neutral-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6";

  return (
    <BaseNode data={nodeData} icon={FiLogOut}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
      />
      <label className="text-sm font-medium leading-6 text-gray-300">
        Name:
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
          className={formElementClass}
        />
      </label>
      <label className="mt-2 block text-sm font-medium leading-6 text-gray-300">
        Type:
        <select 
          value={outputType} 
          onChange={handleTypeChange} 
          className={formElementClass}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}
// frontend/src/FlowControls.js
import React from 'react';
import { useStore } from './store';
import { FiSave, FiRefreshCw } from 'react-icons/fi'; // Icons for our buttons

// Re-usable button style
const buttonClass = `
  flex items-center space-x-2 
  px-4 py-2 
  bg-neutral-700 
  text-white 
  font-medium 
  rounded-lg 
  shadow-md 
  hover:bg-neutral-600 
  focus:outline-none 
  focus:ring-2 
  focus:ring-indigo-400 
  transition-colors
`;

export const FlowControls = () => {
  // Get functions from the store
  const saveFlow = useStore((s) => s.saveFlow);
  const restoreFlow = useStore((s) => s.restoreFlow);

  return (
    <div className="absolute top-4 left-4 z-10 flex space-x-2">
      <button onClick={saveFlow} className={buttonClass}>
        <FiSave size={16} />
        <span>Save</span>
      </button>
      <button onClick={restoreFlow} className={buttonClass}>
        <FiRefreshCw size={16} />
        <span>Restore</span>
      </button> 
    </div>
  );
};
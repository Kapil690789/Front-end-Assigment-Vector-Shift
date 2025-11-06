import React, { useState } from 'react';
import { useStore } from './store';

// (New) Import toast
import toast from 'react-hot-toast';

export const SubmitButton = () => {
  // (New) Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async () => {
    // (New) Start loading
    setIsLoading(true);
    
    // (New) Show a loading toast...
    const toastId = toast.loading('Analyzing pipeline...');

    const { nodes, edges } = useStore.getState();
    const pipeline = { nodes, edges };

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pipeline),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // (Change is Here) - Replace alert() with toast.success or toast.error
      if (data.is_dag) {
        toast.success(
          `Pipeline is a valid DAG! (${data.num_nodes} nodes, ${data.num_edges} edges)`, 
          { id: toastId } // Replaces the loading toast
        );
        console.log('Execution Order:', data.execution_order);
      } else {
        toast.error(
          'Pipeline is NOT a valid DAG. A cycle was detected.', 
          { id: toastId } // Replaces the loading toast
        );
      }

    } catch (error) {
      console.error('Failed to submit pipeline:', error);
      // (Change is Here)
      toast.error('Error: Could not connect to backend.', { id: toastId });
    } finally {
      // (New) Stop loading
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center p-4 bg-neutral-900 border-t border-neutral-700">
      <button 
        type="submit"
        onClick={handleSubmit}
        // (New) Disable button and change text on load
        disabled={isLoading}
        className="
          px-5 py-2 
          bg-indigo-600 
          text-white 
          font-semibold 
          rounded-lg 
          shadow-md 
          hover:bg-indigo-500 
          focus:outline-none 
          focus:ring-2 
          focus:ring-indigo-400 
          focus:ring-opacity-75
          transition-colors
          disabled:bg-gray-500 disabled:cursor-not-allowed
        "
      >
        {isLoading ? 'Analyzing...' : 'Submit'}
      </button>
    </div>
  );
}

export default SubmitButton;
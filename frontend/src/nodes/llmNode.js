// frontend/src/nodes/llmNode.js

import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode'; // Import BaseNode

export const LLMNode = ({ id, data }) => {

  // Pass 'LLM' as the label
  const nodeData = { ...data, label: 'LLM' };

  return (
    // Use BaseNode as the wrapper
    <BaseNode data={nodeData}>
      
      {/* Target Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{top: '45%'}} // Adjusted position
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{top: '65%'}} // Adjusted position
      />
      
      {/* Node Content */}
      <div style={{ padding: '5px 0' }}>
        <span>This is a LLM.</span>
      </div>

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </BaseNode>
  );
}
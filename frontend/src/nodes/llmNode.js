import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { FiCpu } from 'react-icons/fi';

export const LLMNode = ({ id, data }) => {
  const nodeData = { ...data, label: 'LLM' };

  return (
    <BaseNode data={nodeData} icon={FiCpu}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{top: '45%'}}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{top: '65%'}}
      />
      <div style={{ padding: '5px 0' }}>
        <span>This is a LLM.</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </BaseNode>
  );
}
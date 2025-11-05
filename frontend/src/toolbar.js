// frontend/src/toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        // Main container: dark background, padding, shadow
        <div 
          className="bg-neutral-900 p-3 shadow-md border-b border-neutral-700"
        >
            {/* Flex container for the nodes */}
            <div className="flex flex-wrap gap-3">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
        </div>
    );
};
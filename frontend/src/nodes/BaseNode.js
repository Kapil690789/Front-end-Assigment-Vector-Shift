// frontend/src/nodes/BaseNode.js

import React from 'react';

export const BaseNode = ({ data, children }) => {
  return (
    // Main container with dark theme, border, rounded corners, and shadow
    <div 
      className="bg-neutral-800 border-2 border-neutral-700 rounded-lg shadow-md"
      style={{ width: 250 }} // Keeping a fixed width is good for consistency
    >
      
      {/* Node Title Bar */}
      <div className="bg-neutral-900 p-2 rounded-t-lg">
        <strong className="text-white text-sm font-medium">{data.label}</strong>
      </div>
      
      {/* Node Content (the 'children') */}
      <div className="p-3 text-white">
        {children}
      </div>

    </div>
  );
};
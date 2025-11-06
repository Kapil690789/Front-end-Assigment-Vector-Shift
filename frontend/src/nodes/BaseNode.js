import React from 'react';

export const BaseNode = ({ data, children, icon: IconComponent }) => {
  return (
    <div 
      className="bg-neutral-800 border-2 border-neutral-700 rounded-lg shadow-md"
      style={{ minWidth: 200, maxWidth: 400 }} 
    >
      <div className="bg-neutral-900 p-2 rounded-t-lg flex items-center space-x-2">
        {IconComponent && <IconComponent className="text-white" size={14} />}
        <strong className="text-white text-sm font-medium">{data.label}</strong>
      </div>
      <div className="p-3 text-white">
        {children}
      </div>
    </div>
  );
};
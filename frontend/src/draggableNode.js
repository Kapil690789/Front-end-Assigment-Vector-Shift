// frontend/src/draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      // ---- START OF FIX ----
      // Combine 'type' and Tailwind classes into one className
      className={`
        ${type} 
        flex flex-col items-center justify-center 
        h-16 w-24 
        bg-neutral-800 
        border-2 border-neutral-700 
        rounded-lg 
        shadow 
        text-white text-sm font-medium
        hover:bg-neutral-700 
        transition-colors
      `}
      // ---- END OF FIX ----
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{ cursor: 'grab' }} // Keep this
      draggable
    >
        <span>{label}</span>
    </div>
  );
};
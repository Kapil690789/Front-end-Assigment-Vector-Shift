// frontend/src/submit.js

export const SubmitButton = () => {
    return (
      // Center the button and add padding
      <div className="flex items-center justify-center p-4 bg-neutral-900 border-t border-neutral-700">
        <button 
          type="submit"
          // Add Tailwind classes for a modern button
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
          "
        >
          Submit
        </button>
      </div>
    );
  }
// frontend/src/App.js

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    // Add dark background and set full height
    <div className="bg-neutral-900 min-h-screen flex flex-col">
      <PipelineToolbar />
      {/* Make the UI component grow to fill the space */}
      <div className="flex-grow">
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
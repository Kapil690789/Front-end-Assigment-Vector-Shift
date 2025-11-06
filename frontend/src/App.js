// frontend/src/App.js

// (New) Import Toaster
import { Toaster } from 'react-hot-toast';

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import SubmitButton from './submit';

import 'reactflow/dist/style.css';
import './index.css';

function App() {
  return (
      <div className="bg-neutral-900 min-h-screen flex flex-col">
        {/* (New) Add Toaster for popups */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />

        <PipelineToolbar />
        
        {/* We are keeping the layout simple. No provider. */}
        <div className="flex-grow relative"> 
          <PipelineUI />
        </div>
        
        <SubmitButton />
      </div>
  );
}

export default App;
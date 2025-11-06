
import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';
// (New) Import toast for feedback
import toast from 'react-hot-toast';

// (New) Define our local storage key
const FLOW_STORAGE_KEY = 'vectorshift-flow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newID = `${type}-${Date.now()}`;
        return newID;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    
    // --- (New) Save & Restore Functions ---
    
    saveFlow: () => {
      const { nodes, edges } = get();
      const flow = { nodes, edges };
      
      // Don't save an empty flow
      if (nodes.length === 0) {
        toast.error("Cannot save an empty flow!");
        return;
      }
      
      localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flow));
      toast.success('Flow saved to browser!');
    },

    restoreFlow: () => {
      const flowJSON = localStorage.getItem(FLOW_STORAGE_KEY);
      if (flowJSON) {
        const flow = JSON.parse(flowJSON);
        
        // Make sure data is valid
        if (flow && flow.nodes && flow.edges) {
          set({ nodes: flow.nodes, edges: flow.edges });
          toast.success('Flow restored from browser!');
        } else {
          toast.error('No valid flow found.');
        }
      } else {
        toast.error('No saved flow found.');
      }
    },
  }));
import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from 'reactflow';

export const useWorkflowStore = create((set, get) => ({
  nodes: [
    {
      id: '1',
      position: { x: 100, y: 200 },
      data: { label: 'Your Agent', category: 'AutoFlow', type: 'trigger' },
      type: 'custom'
    }
  ],
  edges: [],
  currentWorkflow: null, // Holds id, name, description, etc.
  isActive: false,
  explanation: null,
  selectedNode: null,

  // Accept both a plain array AND an updater function: (prev) => newArray
  setNodes: (nodesOrUpdater) => set((state) => ({
    nodes: typeof nodesOrUpdater === 'function'
      ? nodesOrUpdater(state.nodes)
      : nodesOrUpdater,
  })),
  setEdges: (edgesOrUpdater) => set((state) => ({
    edges: typeof edgesOrUpdater === 'function'
      ? edgesOrUpdater(state.edges)
      : edgesOrUpdater,
  })),
  
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

  setCurrentWorkflow: (workflow) => set({ currentWorkflow: workflow }),
  setIsActive: (isActive) => set({ isActive }),
  setExplanation: (explanation) => set({ explanation }),
  setSelectedNode: (node) => set({ selectedNode: node }),

  updateNodeData: (id, newData) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
           return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      }),
    });
  },
}));

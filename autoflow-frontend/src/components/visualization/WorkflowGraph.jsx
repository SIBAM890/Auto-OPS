import { useCallback, useEffect, useMemo, useRef, Component } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './CustomNode';
import TriggerNode from '../nodes/TriggerNode';
import ActionNode from '../nodes/ActionNode';
import ConditionNode from '../nodes/ConditionNode';
import WhatsAppNode from '../nodes/WhatsAppNode';
import InventoryNode from '../nodes/InventoryNode';
import DelayNode from '../nodes/DelayNode';

// Simple ID generator
const generateId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const initialNodes = [
    {
        id: '1',
        position: { x: 100, y: 200 },
        data: { label: 'Your Agent', category: 'AutoFlow', type: 'trigger' },
        type: 'custom'
    },
];

const initialEdges = [];

// Custom Auto-Layout Function (Horizontal Directed Graph)
const getLayoutedElements = (nodes, edges) => {
    const nodeWidth = 350; // Horizontal spacing between columns
    const nodeHeight = 150; // Vertical spacing between nodes

    // 1. Calculate Depths (Longest Path) for Columns
    const depths = {};
    nodes.forEach(n => depths[n.id] = 0);

    // Run relaxation N times to handle DAGs
    for (let i = 0; i < nodes.length; i++) {
        let changed = false;
        edges.forEach(e => {
            const sourceDepth = depths[e.source] || 0; // Use source depth
            // If we have edges, verify structure
            const targetDepth = depths[e.target] || 0;
            if (sourceDepth + 1 > targetDepth) {
                depths[e.target] = sourceDepth + 1;
                changed = true;
            }
        });
        if (!changed) break; // Optimization
    }

    // 2. Group by Depth (Columns)
    const levels = {};
    Object.entries(depths).forEach(([id, depth]) => {
        if (!levels[depth]) levels[depth] = [];
        levels[depth].push(id);
    });

    // 3. Assign Positions
    return nodes.map(node => {
        const depth = depths[node.id] || 0; // Column Index
        const levelNodes = levels[depth];
        const indexInLevel = levelNodes.indexOf(node.id);

        // Calculate center offset for Y-axis (Vertical spread within column)
        const columnHeight = levelNodes.length * nodeHeight;
        const yOffset = indexInLevel * nodeHeight - (columnHeight / 2);

        return {
            ...node,
            position: {
                x: depth * nodeWidth + 100, // Moves Right (Column)
                y: yOffset + 300            // Moves Down (Row) + Center Buffer
            },
            targetPosition: 'left',
            sourcePosition: 'right'
        };
    });
};

const defaultEdgeOptions = { type: 'smoothstep', animated: true, style: { stroke: '#555', strokeWidth: 2 } };

export const WorkflowGraph = ({ workflowData }) => {
    const nodes = useWorkflowStore(state => state.nodes);
    const edges = useWorkflowStore(state => state.edges);
    const setNodes = useWorkflowStore(state => state.setNodes);
    const setEdges = useWorkflowStore(state => state.setEdges);
    const onNodesChange = useWorkflowStore(state => state.onNodesChange);
    const onEdgesChange = useWorkflowStore(state => state.onEdgesChange);
    const setSelectedNode = useWorkflowStore(state => state.setSelectedNode);

    const reactFlowInstance = useReactFlow();
    const reactFlowWrapper = useRef(null);

    // Register custom node types
    const nodeTypes = useMemo(() => ({ 
        trigger: TriggerNode,
        action: ActionNode,
        condition: ConditionNode,
        whatsapp: WhatsAppNode,
        inventory: InventoryNode,
        delay: DelayNode,
        custom: CustomNode 
    }), []);

    // Handle initial workflow data from AI
    useEffect(() => {
        const incomingNodes = workflowData?.nodes || workflowData?.steps;

        if (incomingNodes && Array.isArray(incomingNodes) && incomingNodes.length > 0) {

            // 1. RAW NODES & EDGES GENERATION
            let rawNodes = incomingNodes.map((node, index) => ({
                id: node.id || generateId(),
                type: 'custom',
                data: {
                    label: node.data?.label || node.label || "Step",
                    type: node.type || node.data?.type || (node.label?.includes('?') ? 'condition' : 'action'),
                    category: index === 0 ? 'AutoFlow' : 'AI'
                },
                position: { x: 0, y: 0 } // Will be calculated
            }));

            let rawEdges = [];
            const aiIds = rawNodes.map(n => n.id);

            incomingNodes.forEach((node, i) => {
                const sourceId = node.id || aiIds[i];

                // Helper to add edge
                const addEdgeToGraph = (targetId, label = '', color = '#555') => {
                    rawEdges.push({
                        id: `e${sourceId}-${targetId}-${Math.random()}`,
                        source: sourceId,
                        target: targetId,
                        type: 'smoothstep', // Better looking edges
                        animated: true,
                        label: label,
                        style: { stroke: color, strokeWidth: 2 },
                        markerEnd: { type: MarkerType.ArrowClosed, color: color },
                    });
                };

                // Parsing Logic
                if (node.next && Array.isArray(node.next)) {
                    node.next.forEach(tid => addEdgeToGraph(tid));
                }
                if (node.data?.true_id) addEdgeToGraph(node.data.true_id, 'Yes', 'green');
                if (node.data?.false_id) addEdgeToGraph(node.data.false_id, 'No', 'red');
                if (node.data?.outputs) {
                    Object.entries(node.data.outputs).forEach(([k, tid]) => addEdgeToGraph(tid, k));
                }
            });

            // Fallback: Linear
            if (rawEdges.length === 0 && rawNodes.length > 1) {
                for (let i = 0; i < rawNodes.length - 1; i++) {
                    rawEdges.push({
                        id: `e-fallback-${rawNodes[i].id}-${rawNodes[i + 1].id}`,
                        source: rawNodes[i].id,
                        target: rawNodes[i + 1].id,
                        type: 'smoothstep',
                        animated: true,
                        style: { stroke: '#999', strokeDasharray: '5,5' }
                    });
                }
            }

            // 2. APPLY AUTO-LAYOUT
            const layoutedNodes = getLayoutedElements(rawNodes, rawEdges);

            setNodes(layoutedNodes);
            setEdges(rawEdges);
        }
    }, [workflowData, setNodes, setEdges]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)), [setEdges]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const toolId = event.dataTransfer.getData('application/reactflow');
            if (!toolId) return;

            // Try to get richer tool data if available
            let toolData = null;
            try {
                const raw = event.dataTransfer.getData('application/toolData');
                if (raw) toolData = JSON.parse(raw);
            } catch (_) {}

            // screenToFlowPosition replaces the deprecated .project() in ReactFlow v11
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const label = toolData?.label
                || toolData?.name
                || (toolId.charAt(0).toUpperCase() + toolId.slice(1));

            const newNode = {
                id: generateId(),
                type: 'custom',
                position,
                data: {
                    label,
                    type: toolData?.type || toolId,
                    icon: toolData?.icon || undefined,
                },
            };

            // setNodes is a plain Zustand setter — pass the full new array, NOT a function
            setNodes([...reactFlowInstance.getNodes(), newNode]);
        },
        [reactFlowInstance, setNodes]
    );

    const handleSelectionChange = useCallback((params) => {
        const selected = params.nodes[0] || null;
        setSelectedNode(selected);
    }, [setSelectedNode]);

    return (
        <GraphErrorBoundary>
            <div
                className="w-full h-full bg-[#0a0a0a]"
                ref={reactFlowWrapper}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onSelectionChange={handleSelectionChange}
                    nodeTypes={nodeTypes}
                    fitView
                    defaultEdgeOptions={defaultEdgeOptions}
                >
                    <Background color="#333" gap={24} size={1.5} variant="dots" />
                    <Controls className="!bg-[#1e1e1e] !border-[#333] !fill-white [&>button]:!fill-gray-400 [&>button:hover]:!fill-white" />
                </ReactFlow>
            </div>
        </GraphErrorBoundary>
    );
};

// ── Error Boundary: prevents the whole page going blank on canvas errors ───────
class GraphErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error('WorkflowGraph crashed:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
                    <div className="text-red-400 text-4xl">⚠️</div>
                    <p className="text-white font-bold text-sm">Canvas Error</p>
                    <p className="text-gray-500 text-xs max-w-xs text-center">{this.state.error?.message}</p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="px-4 py-2 bg-amber-500 text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors"
                    >
                        Reload Canvas
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

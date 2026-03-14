import { useCallback, useEffect, useMemo, useRef } from 'react';
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

export const WorkflowGraph = ({ workflowData }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const reactFlowInstance = useReactFlow();
    const reactFlowWrapper = useRef(null);

    // Register custom node types
    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

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
            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) return;

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const newNode = {
                id: generateId(),
                type: 'custom',
                position,
                data: {
                    label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
                    type: type
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );

    return (
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
                nodeTypes={nodeTypes}
                fitView
                defaultEdgeOptions={{ type: 'smoothstep', animated: true, style: { stroke: '#555', strokeWidth: 2 } }}
            >
                <Background color="#333" gap={24} size={1.5} variant="dots" />
                <Controls className="!bg-[#1e1e1e] !border-[#333] !fill-white [&>button]:!fill-gray-400 [&>button:hover]:!fill-white" />
            </ReactFlow>
        </div>
    );
};

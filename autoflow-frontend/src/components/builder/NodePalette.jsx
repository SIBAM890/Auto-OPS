import { useState, useMemo } from 'react';
import { Search, MessageSquare, Zap, Divide, MousePointerClick, ChevronRight, ChevronDown, CheckCircle, Link, Mail, Smartphone, Database, ShoppingCart, Globe, CreditCard, Users, Code, Cloud, Clock, Bot, Facebook, Twitter, Instagram, Linkedin, Slack, Github, Trello, Calendar, Activity, AlertTriangle, Shield, Key, HardDrive, FileText, BarChart, Layout, GitBranch, Video, DollarSign, Send, MessageCircle, Headphones, Flame, Box } from 'lucide-react';
import { TOOL_CATEGORIES } from '../../constants/tools';
import toolsData from '../../data/tools.json'; // Import the 500+ tools
import clsx from 'clsx';

// Extended Icon Map
const IconMap = {
    MessageSquare, Zap, Divide, Link, Mail, Smartphone, Database, ShoppingCart,
    Globe, CreditCard, Users, Code, Cloud, Clock, Bot, Facebook, Twitter,
    Instagram, Linkedin, Slack, Github, Trello, Calendar, Activity, AlertTriangle,
    Shield, Key, HardDrive, FileText, BarChart, Layout, GitBranch, Video,
    DollarSign, Send, MessageCircle, Headphones, Flame, Box
};

export const NodePalette = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState(['core']);

    // Merge Core Logic with 500+ Tools dynamically
    const allCategories = useMemo(() => {
        // 1. Get Core Logic (Triggers, Conditions, etc.)
        const coreLogic = TOOL_CATEGORIES[0];

        // 2. Group toolsData by category
        const groupedTools = {};
        toolsData.forEach(tool => {
            if (!groupedTools[tool.category]) {
                groupedTools[tool.category] = [];
            }
            // Normalize tool object to match palette expectations
            groupedTools[tool.category].push({
                id: tool.id,
                label: tool.name,
                type: 'tool', // All library items are 'tool' type nodes
                icon: tool.icon
            });
        });

        // 3. Convert groups to array format
        const dynamicCategories = Object.keys(groupedTools).sort().map(catName => ({
            id: catName.toLowerCase().replace(/\s+/g, '_'),
            name: catName,
            tools: groupedTools[catName]
        }));

        // 4. Return combined list
        return [coreLogic, ...dynamicCategories];
    }, []);

    const onDragStart = (event, tool) => {
        // Pass tool data. For generic tools, we might need to pass more than just ID if the node needs label/icon.
        // We'll pass the whole object as JSON string for sophisticated drops, or just ID.
        // ReactFlow standard DND uses 'application/reactflow' with a type string.
        // But our Drop handler likely needs to know *which* tool.
        // Let's pass a JSON string so the drop handler (if updated) can read it, 
        // OR we stick to the existing ID logic. 
        // The existing logic probably uses exact ID matches? 
        // Actually the Drop logic in WorkflowGraph likely creates a node based on this type.
        // We'll trust the ID flow for now, but prefixing might be safer logic-wise later.
        event.dataTransfer.setData('application/reactflow', tool.id);
        event.dataTransfer.setData('application/toolData', JSON.stringify(tool)); // Extra data if needed
        event.dataTransfer.effectAllowed = 'move';
    };

    const toggleCategory = (id) => {
        setExpandedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    // Filter categories based on search
    const filteredCategories = allCategories.map(cat => ({
        ...cat,
        tools: cat.tools.filter(tool =>
            tool.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.tools.length > 0);

    return (
        <div className="bg-white border-l border-gray-200 w-full h-full flex flex-col shadow-xl z-20">

            {/* Search Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                    Toolbox
                    <span className="bg-purple-100 text-purple-600 text-[10px] py-0.5 px-2 rounded-full">500+</span>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search tools..."
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {filteredCategories.length === 0 ? (
                    <div className="text-center text-gray-400 py-8 text-sm">
                        No tools found matching "{searchQuery}"
                    </div>
                ) : (
                    filteredCategories.map(category => (
                        <div key={category.id} className="border border-gray-100 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="w-full px-3 py-2 bg-gray-50 flex items-center justify-between text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                {category.name}
                                {expandedCategories.includes(category.id) || searchQuery ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>

                            {(expandedCategories.includes(category.id) || searchQuery) && (
                                <div className="p-2 grid grid-cols-1 gap-2 bg-white">
                                    {category.tools.map(tool => {
                                        const IconComponent = IconMap[tool.icon] || Zap;
                                        return (
                                            <div
                                                key={tool.id}
                                                className={clsx(
                                                    "flex items-center gap-3 p-2 rounded-md border cursor-grab hover:shadow-md transition-all active:cursor-grabbing",
                                                    tool.type === 'trigger' ? "bg-green-50 border-green-100 hover:border-green-300" :
                                                        tool.type === 'condition' ? "bg-yellow-50 border-yellow-100 hover:border-yellow-300" :
                                                            "bg-white border-gray-200 hover:border-purple-300 hover:bg-blue-50"
                                                )}
                                                onDragStart={(event) => onDragStart(event, tool)}
                                                draggable
                                                title={`Drag to add ${tool.label}`}
                                            >
                                                <div className={clsx(
                                                    "p-1.5 rounded-md text-white shrink-0",
                                                    tool.type === 'trigger' ? "bg-green-500" :
                                                        tool.type === 'condition' ? "bg-yellow-500" :
                                                            "bg-blue-500"
                                                )}>
                                                    <IconComponent size={14} />
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 truncate">{tool.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="p-3 bg-gray-50 text-[10px] text-gray-400 text-center border-t border-gray-100">
                Drag & Drop to build
            </div>
        </div>
    );
};

import { Handle, Position } from 'reactflow';
import { MessageSquare, Zap, Divide, Link, Mail, Smartphone, Database, ShoppingCart, Globe, CreditCard, Users, Code, Cloud, Clock, Bot, Facebook, Twitter, Instagram, Linkedin, Slack, Github, Trello, Calendar, Sliders } from 'lucide-react';
import clsx from 'clsx';

// Icon Map
const IconMap = {
    MessageSquare, Zap, Divide, Link, Mail, Smartphone, Database, ShoppingCart,
    Globe, CreditCard, Users, Code, Cloud, Clock, Bot, Facebook, Twitter,
    Instagram, Linkedin, Slack, Github, Trello, Calendar, Sliders
};

const getCategoryStyle = (type, label, category) => {
    // Check category first for specific overrides
    const lowerCategory = category?.toLowerCase() || '';
    if (lowerCategory === 'autoflow') {
        return { color: 'green', icon: Bot, label: 'AutoFlow' };
    }

    const lowerType = type?.toLowerCase() || '';
    const lowerLabel = label?.toLowerCase() || '';

    if (lowerType === 'trigger' || lowerLabel.includes('trigger') || lowerLabel.includes('received')) {
        return { color: 'green', icon: MessageSquare, label: 'Trigger' };
    }
    if (lowerType === 'condition' || lowerLabel.includes('if') || lowerLabel.includes('condition')) {
        return { color: 'orange', icon: Divide, label: 'Condition' };
    }
    // Default Action
    return { color: 'blue', icon: Zap, label: 'Action' };
};

export const CustomNode = ({ data }) => {
    const nodeType = data.type || 'default';
    const { color, icon: DefaultIcon, label: typeLabel } = getCategoryStyle(nodeType, data.label, data.category);
    const SpecificIcon = IconMap[data.icon] || IconMap[nodeType] || DefaultIcon;

    // Check if it's the AutoFlow node to show extra handles
    const isAutoFlow = data.category === 'AutoFlow';

    return (
        <div className="relative group">
            {/* Input Handle (Left) - ALWAYS VISIBLE for ALL nodes now */}
            <Handle
                type="target"
                position={Position.Left}
                id="left"
                className="!bg-[#777] !border-2 !border-[#000] !w-3 !h-3 !-left-1.5 transition-colors group-hover:!bg-white"
            />

            <div className={clsx(
                "flex flex-col min-w-[200px] max-w-[240px] bg-[#1e1e1e] rounded-lg border border-[#333] shadow-lg overflow-hidden transition-all duration-200 group-hover:border-[#666] group-hover:shadow-xl group-hover:-translate-y-0.5",
            )}>
                {/* Header Strip */}
                <div className={clsx(
                    "h-0.5 w-full",
                    color === 'green' ? "bg-green-500" :
                        color === 'orange' ? "bg-orange-500" :
                            "bg-blue-500"
                )} />

                <div className="p-3 flex items-center gap-3">
                    {/* Icon Box */}
                    <div className={clsx(
                        "p-1.5 rounded-md shrink-0 flex items-center justify-center",
                        color === 'green' ? "bg-green-500/10 text-green-400" :
                            color === 'orange' ? "bg-orange-500/10 text-orange-400" :
                                "bg-blue-500/10 text-blue-400"
                    )}>
                        <SpecificIcon size={16} strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                            <span className={clsx(
                                "text-[9px] font-bold uppercase tracking-wider",
                                color === 'green' ? "text-green-500" :
                                    color === 'orange' ? "text-orange-500" :
                                        "text-blue-500"
                            )}>
                                {typeLabel}
                            </span>
                        </div>
                        <h3 className="text-xs font-bold text-gray-200 leading-snug truncate" title={data.label}>
                            {data.label}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Output Handle (Right) - ALWAYS VISIBLE */}
            <Handle
                type="source"
                position={Position.Right}
                id="right"
                className="!bg-[#777] !border-2 !border-[#000] !w-3 !h-3 !-right-1.5 transition-colors group-hover:!bg-white"
            />

            {/* 3 Bottom Handles for AutoFlow Node ONLY */}
            {isAutoFlow && (
                <>
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="bottom-1"
                        style={{ left: '25%' }}
                        className="!bg-[#777] !border-2 !border-[#000] !w-3 !h-3 !-bottom-1.5 transition-colors group-hover:!bg-white"
                    />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="bottom-2"
                        style={{ left: '50%' }}
                        className="!bg-[#777] !border-2 !border-[#000] !w-3 !h-3 !-bottom-1.5 transition-colors group-hover:!bg-white"
                    />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="bottom-3"
                        style={{ left: '75%' }}
                        className="!bg-[#777] !border-2 !border-[#000] !w-3 !h-3 !-bottom-1.5 transition-colors group-hover:!bg-white"
                    />
                </>
            )}
        </div>
    );
};

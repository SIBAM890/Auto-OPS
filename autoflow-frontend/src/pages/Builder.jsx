import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { ChatInterface } from '../components/builder/ChatInterface';
import { WorkflowGraph } from '../components/visualization/WorkflowGraph';
import { AIExplanation } from '../components/builder/AIExplanation';
import { Modal } from '../components/ui/Modal';
import { TestMode } from '../components/simulation/TestMode';
import { NodePalette } from '../components/builder/NodePalette';
import { Play, ToggleLeft, ToggleRight, PenTool, Rocket } from 'lucide-react';
import clsx from 'clsx';

const Builder = () => {
    const [workflow, setWorkflow] = useState(null);
    const [isTestOpen, setIsTestOpen] = useState(false);
    const [isCustomMode, setIsCustomMode] = useState(false);

    // Deployment State
    const [isDeployOpen, setIsDeployOpen] = useState(false);
    const [isDeployed, setIsDeployed] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [tempName, setTempName] = useState("");

    const handleWorkflowGenerated = (data) => {
        console.log("Workflow generated:", data);
        setWorkflow(data);
    };

    const navigate = useNavigate();

    const handleDeploy = () => {
        // Navigate to the full deployment page
        navigate('/deploy-agent');
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10 transition-colors duration-500">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{isDeployed ? "🏢" : "⚡"}</span>
                    <h1 className={clsx("text-xl font-bold", isDeployed ? "text-indigo-700" : "text-gray-900")}>
                        {isDeployed ? businessName : "AutoFlow Builder"}
                    </h1>
                </div>
                <div className="flex items-center gap-4">

                    {/* Mode Toggle - Hide if Deployed */}
                    {!isDeployed && (
                        <button
                            onClick={() => setIsCustomMode(!isCustomMode)}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300",
                                isCustomMode
                                    ? "bg-purple-50 text-purple-700 border-purple-200 shadow-md ring-2 ring-purple-100"
                                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                            )}
                        >
                            {isCustomMode ? (
                                <>
                                    <span className="relative flex h-2 w-2 mr-1">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                    </span>
                                    <PenTool size={16} />
                                    Customization Mode: ON
                                </>
                            ) : (
                                <>
                                    <span className="h-2 w-2 rounded-full bg-gray-400 mr-1"></span>
                                    Customization Mode: OFF
                                </>
                            )}
                        </button>
                    )}

                    {!isDeployed ? (
                        <>
                            <button
                                onClick={() => setIsTestOpen(true)}
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium"
                            >
                                <Play size={16} fill="currentColor" />
                                Test Logic
                            </button>

                            <button
                                onClick={handleDeploy}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium animate-pulse"
                            >
                                <Rocket size={16} />
                                Deploy
                            </button>
                        </>
                    ) : (
                        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            Live
                        </div>
                    )}
                </div>
            </header>
            <main className="flex-1 flex overflow-hidden">
                {/* Chat / Sidebar - Hide title if deployed */}
                <div className="w-1/3 min-w-[350px] border-r border-gray-200 bg-white flex flex-col shadow-lg z-10">
                    <div className="p-4 border-b border-gray-100 font-medium bg-gray-50 text-gray-700">
                        {isDeployed ? "Automation Assistant" : "AI Assistant"}
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                        <ChatInterface onWorkflowGenerated={handleWorkflowGenerated} />
                    </div>
                </div>

                {/* Visual Canvas with Provider */}
                <ReactFlowProvider>
                    <div className="flex-1 bg-gray-50 relative flex transition-all duration-300">
                        <div className="flex-1 relative h-full">
                            <WorkflowGraph workflowData={workflow} />
                            {/* Floating Overlay for AI Explanation */}
                            <AIExplanation workflow={workflow} />
                        </div>

                        {/* Manual Builder Palette - Only visible in Custom Mode */}
                        <div className={clsx(
                            "transition-all duration-300 transform",
                            isCustomMode ? "w-64 translate-x-0 opacity-100" : "w-0 translate-x-full opacity-0 overflow-hidden"
                        )}>
                            <NodePalette />
                        </div>
                    </div>
                </ReactFlowProvider>
            </main>

            {/* Test Mode Modal */}
            <Modal
                isOpen={isTestOpen}
                onClose={() => setIsTestOpen(false)}
                title="Test & Simulation"
            >
                <TestMode />
            </Modal>

            {/* Deployment Modal */}
            <Modal
                isOpen={isDeployOpen}
                onClose={() => setIsDeployOpen(false)}
                title="Deploy Automation"
            >
                <div className="p-4 space-y-4">
                    <p className="text-gray-600">
                        Ready to go live? Enter your business name to white-label this automation.
                    </p>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="e.g. Acme Corp"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleDeploy}
                            disabled={!tempName.trim()}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Rocket size={16} />
                            Launch Live
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Builder;

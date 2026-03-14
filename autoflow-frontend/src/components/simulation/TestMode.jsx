import { useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';
import { workflowApi } from '../../services/workflowApi';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const TestMode = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isSimulating, setIsSimulating] = useState(false);
    const [executionSteps, setExecutionSteps] = useState([]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        const userMsg = { role: 'user', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = inputText;
        setInputText("");
        setIsSimulating(true);
        setExecutionSteps([]); // Clear previous steps logic

        // Simulate "Processing" steps visual
        addStep("Message Received", 200);

        try {
            addStep("Detecting Intent...", 500);

            // Actual API Call
            const response = await workflowApi.simulate(currentInput);

            addStep("Intent: " + (response.intent || "Processed"), 800);
            addStep("Executing Workflow...", 1200);

            setTimeout(() => {
                const botMsg = {
                    role: 'bot',
                    text: response.reply || "No reply generated.",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, botMsg]);
                addStep("Reply Sent Successfully", 1500);
                setIsSimulating(false);
            }, 1500);

        } catch (error) {
            setMessages(prev => [...prev, { role: 'error', text: "Simulation Failed: " + error.message }]);
            setIsSimulating(false);
        }
    };

    const addStep = (label, delay) => {
        setTimeout(() => {
            setExecutionSteps(prev => [...prev, { label, completed: true }]);
        }, delay);
    };

    return (
        <div className="flex h-full bg-gray-100 border-l border-gray-200">
            {/* Phone Simulator */}
            <div className="w-1/2 p-6 flex flex-col items-center justify-center">
                <div className="w-[300px] h-[600px] bg-black rounded-[40px] p-3 shadow-2xl relative border-4 border-gray-800">
                    {/* Notch/Island using CSS */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20"></div>

                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#E5DDD5] rounded-[32px] overflow-hidden flex flex-col relative">
                        {/* Header */}
                        <div className="bg-[#075E54] p-3 pt-8 flex items-center gap-2 text-white shadow-md">
                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                            <div className="text-sm font-semibold">AutoFlow Bot</div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-2">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={clsx(
                                        "max-w-[80%] p-2 rounded-lg text-sm shadow-sm relative pb-5 whitespace-pre-wrap",
                                        msg.role === 'user' ? "ml-auto bg-[#D9FDD3] text-black rounded-tr-none" : "mr-auto bg-white text-black rounded-tl-none",
                                        msg.role === 'error' && "bg-red-100 text-red-600"
                                    )}
                                >
                                    {msg.text}
                                    <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">{msg.time}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-2 bg-gray-100 flex gap-2 items-center">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 rounded-full border-none py-1.5 px-3 text-sm focus:ring-0"
                            />
                            <button type="submit" className="bg-[#075E54] text-white p-2 rounded-full">
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Execution Log */}
            <div className="w-1/2 bg-white border-l border-gray-200 p-6 overflow-y-auto">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock size={18} />
                    Execution Log
                </h3>
                <div className="space-y-4 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-gray-100"></div>

                    {executionSteps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 relative z-10"
                        >
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center ring-4 ring-white">
                                <CheckCircle size={14} />
                            </div>
                            <span className="text-sm text-gray-700">{step.label}</span>
                        </motion.div>
                    ))}

                    {executionSteps.length === 0 && !isSimulating && (
                        <div className="text-gray-400 text-sm italic">
                            Send a simulated message to see the execution logic here.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
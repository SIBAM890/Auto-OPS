import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, CheckCircle, Info } from 'lucide-react';
import { workflowApi } from '../../services/workflowApi';

export const AIExplanation = ({ workflow }) => {
    const [explanation, setExplanation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (workflow) {
            fetchExplanation();
        }
    }, [workflow]);

    const fetchExplanation = async () => {
        setIsLoading(true);
        try {
            const data = await workflowApi.explain(workflow);
            // Handle structured response
            let explanationText = "No explanation available.";

            if (typeof data === 'string') {
                explanationText = data;
            } else if (typeof data === 'object') {
                if (data.summary) {
                    const stepsText = data.steps?.map(s => `• ${s.title}: ${s.description}`).join('\n') || '';
                    explanationText = `${data.summary}\n\n${stepsText}`;
                } else if (data.explanation) {
                    explanationText = typeof data.explanation === 'string'
                        ? data.explanation
                        : JSON.stringify(data.explanation);
                } else {
                    explanationText = JSON.stringify(data, null, 2);
                }
            }

            setExplanation(explanationText);
        } catch (error) {
            console.error(error);
            setExplanation("Failed to generate explanation.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!workflow) return null;

    return (
        <div className="absolute top-4 right-4 w-80 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden z-20">
            <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2 text-white font-medium">
                    <Info size={18} />
                    <span>AI Logic Explanation</span>
                </div>
                {isOpen ? <ChevronDown size={18} className="text-white" /> : <ChevronRight size={18} className="text-white" />}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white"
                    >
                        <div className="p-4 text-sm text-gray-700 leading-relaxed max-h-[300px] overflow-y-auto">
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-gray-500">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                    Analyzing workflow logic...
                                </div>
                            ) : (
                                <div className="whitespace-pre-line">
                                    {typeof explanation === 'object' ? JSON.stringify(explanation) : explanation}
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-50 p-2 text-xs text-center text-gray-400 border-t border-gray-100">
                            AI Generated Logic
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

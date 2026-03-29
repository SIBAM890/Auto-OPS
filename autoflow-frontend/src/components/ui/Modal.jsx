import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-4xl" }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className={`bg-[#1e1e1e] rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] w-full ${maxWidth} max-h-[95vh] flex flex-col overflow-hidden border border-white/10`}
                        >
                            <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-[#252526]">
                                <h3 className="font-black text-xs text-gray-400 uppercase tracking-[0.2em]">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full transition-all text-gray-500 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-hidden min-h-[500px] bg-[#121212]">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

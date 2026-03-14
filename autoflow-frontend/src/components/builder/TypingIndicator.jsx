import { motion } from 'framer-motion';

export const TypingIndicator = () => {
    return (
        <div className="flex items-center space-x-1 p-3 bg-gray-100 rounded-2xl rounded-tl-none w-fit">
            <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
        </div>
    );
};

import React from 'react';
import { Bot, Workflow, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
    return (
        <section className="relative py-32 bg-dark-900 overflow-hidden" id="features">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                        Everything you need to automate support
                    </h2>
                    <p className="text-xl text-gray-400">
                        Replace your support ticket queue with an intelligent, 24/7 AI workforce.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Feature 1: Intelligent Response (Large - Spans 2 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-2 group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors duration-500"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Bot size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                                <Bot size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Human-like Understanding</h3>
                            <p className="text-gray-400 mb-8 max-w-md">
                                Powered by Gemini Pro, our agents understand context, intent, and nuance—not just keywords. They handle complex queries like refunds, tracking, and product recommendations with ease.
                            </p>

                            {/* Chat Simulation */}
                            <div className="bg-dark-800/80 backdrop-blur-md rounded-xl p-4 border border-white/5 max-w-sm">
                                <div className="flex gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0"></div>
                                    <div className="bg-gray-700 rounded-lg rounded-tl-none p-2 text-xs text-gray-300">
                                        I want to change my shipping address order #9988
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">AI</div>
                                    <div className="bg-primary/20 text-primary rounded-lg rounded-tr-none p-2 text-xs border border-primary/20">
                                        Checking order #9988... Provide new address. 🏠
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 2: Workflow Builder (Tall) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:row-span-2 group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors duration-500"
                    >
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                            <Workflow size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Visual Builder</h3>
                        <p className="text-gray-400 mb-8">
                            Drag, drop, and connect nodes to create complex conversational flows. No coding required.
                        </p>

                        {/* Mini Node Visual */}
                        <div className="relative mt-8 h-64 w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="absolute top-0 left-4 px-4 py-2 bg-dark-800 border border-white/10 rounded-lg text-xs text-white shadow-lg"
                            >
                                Start
                            </motion.div>
                            <svg className="absolute top-8 left-12 w-1 h-12 border-l border-dashed border-gray-600"></svg>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="absolute top-16 left-8 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-xs text-purple-300 shadow-lg"
                            >
                                AI Intent
                            </motion.div>
                            <div className="absolute top-28 left-4 flex gap-8">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="px-3 py-1 bg-dark-800 border border-white/10 rounded text-[10px] text-gray-400"
                                >
                                    Order
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="px-3 py-1 bg-dark-800 border border-white/10 rounded text-[10px] text-gray-400"
                                >
                                    Support
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 3: Real-time Analytics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors duration-500"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                            <BarChart3 size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Real-time Analytics</h3>
                        <p className="text-gray-400 text-sm">
                            Track engagement, resolution rates, and ROI instantly.
                        </p>
                    </motion.div>

                    {/* Feature 4: Instant Deploy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors duration-500"
                    >
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-6">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Instant Deploy</h3>
                        <p className="text-gray-400 text-sm">
                            Go live on WhatsApp in seconds with QR code auth.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Features;
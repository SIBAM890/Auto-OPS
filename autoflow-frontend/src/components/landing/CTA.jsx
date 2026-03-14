import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => {
    const navigate = useNavigate();

    return (
        <section className="py-32 bg-dark-900 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary/10 to-purple-500/10 border border-white/10 overflow-hidden text-center group hover:border-white/20 transition-all duration-500"
                >

                    {/* Animated Background Mesh */}
                    <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none"
                    ></motion.div>

                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-1/2 -right-1/2 w-[800px] h-[800px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"
                    ></motion.div>

                    <div className="relative z-20">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-8 animate-pulse"
                        >
                            <Sparkles size={16} />
                            <span>Limited time offer</span>
                        </motion.div>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
                        >
                            Ready to automate <br />
                            your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-300">entire support?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
                        >
                            Join 1,000+ businesses saving hours every day. Set up your AI agent in 60 seconds.
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col md:flex-row items-center justify-center gap-6"
                        >
                            <button
                                onClick={() => navigate('/deploy-agent')}
                                className="group relative px-10 py-5 bg-white text-dark-900 rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Deploy Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <span className="text-gray-500 text-sm">
                                No credit card required • Cancel anytime
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
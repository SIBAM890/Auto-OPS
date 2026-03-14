import React from 'react';
import { XCircle, CheckCircle, Clock, DollarSign, Frown, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

const Comparison = () => {
    return (
        <section className="py-24 bg-dark-900 relative overflow-hidden" id="comparison">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Stop drowning in support tickets</h2>
                    <p className="text-gray-400">See the difference 24/7 automation makes.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* VS Badge */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-16 h-16 bg-dark-900 rounded-full border border-white/10 shadow-xl"
                    >
                        <span className="font-bold text-white">VS</span>
                    </motion.div>

                    {/* Left: The Old Way */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="p-8 rounded-3xl bg-[#0F0F0F] border border-red-500/10 relative overflow-hidden group hover:border-red-500/20 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none"></div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
                                <XCircle size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Manual Support</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Clock, title: "Slow Responses", desc: "Customers wait 2-4 hours for a reply." },
                                { icon: DollarSign, title: "High Costs", desc: "Scaling requires hiring more agents." },
                                { icon: Frown, title: "Inconsistent", desc: "Human errors and missed details." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                                >
                                    <item.icon className="text-red-400 mt-1 shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-white">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: With AutoFlow */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="p-8 rounded-3xl bg-[#0F1C15] border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-colors shadow-2xl shadow-emerald-900/10"
                    >
                        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">With AutoFlow</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Clock, title: "Instant (< 3s)", desc: "Zero wait time, 24/7 availability." },
                                { icon: DollarSign, title: "Flat Pricing", desc: "Handle 10,000+ chats for one fixed cost." },
                                { icon: Smile, title: "Delightful UX", desc: "Consistent, polite, and accurate." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                                >
                                    <item.icon className="text-emerald-400 mt-1 shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-white">{item.title}</h4>
                                        <p className="text-sm text-emerald-100/70">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
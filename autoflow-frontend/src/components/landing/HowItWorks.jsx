import React from 'react';
import { MessageSquare, Database, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
    const steps = [
        {
            id: '01',
            title: 'Describe',
            description: "Simply tell the AI what you need. 'I need an agent to handle refund requests and check order status.'",
            icon: <MessageSquare size={32} />,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20'
        },
        {
            id: '02',
            title: 'Connect',
            description: "Upload your inventory, FAQs, or connect your Google Sheets database for real-time data access.",
            icon: <Database size={32} />,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20'
        },
        {
            id: '03',
            title: 'Deploy',
            description: "Scan the QR code to link your WhatsApp number. Your agent goes live instantly.",
            icon: <Rocket size={32} />,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20'
        }
    ];

    return (
        <section className="relative py-32 bg-[#050505]" id="how-it-works">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-emerald-500 font-semibold tracking-wider text-sm uppercase mb-4 block">Workflow</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        From idea to agent in <span className="text-emerald-400">60 seconds</span>
                    </h2>
                </motion.div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-0 w-full h-0.5 bg-white/5 z-0">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50"
                        ></motion.div>
                    </div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 group">
                            {/* Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className={`h-full p-8 rounded-2xl bg-[#0A0A0A] border ${step.border} backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl`}
                            >
                                {/* Icon & Number */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center ${step.color} shadow-lg ring-1 ring-white/5`}>
                                        {step.icon}
                                    </div>
                                    <span className="text-4xl font-black text-white/5 font-sans">{step.id}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>

                            {/* Mobile Connector */}
                            {index < steps.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 + 0.1 }}
                                    className="md:hidden flex justify-center py-4 text-gray-700"
                                >
                                    <ArrowRight className="rotate-90" />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
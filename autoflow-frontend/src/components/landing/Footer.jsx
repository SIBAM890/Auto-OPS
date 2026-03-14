import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark-900 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                    <div className="max-w-xs">
                        <div className="flex items-center gap-3 mb-6">
                            {/* Ensure logo is in public folder */}
                            <img src="/logo.png" alt="AutoFlow" className="w-8 h-8 opacity-90" />
                            <span className="font-bold text-xl tracking-tight text-white">AutoFlow</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Automating the future of business communications with AI-driven workflows and real-time data sync.
                        </p>
                    </div>
                    <div className="flex gap-16">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-white mb-2">Product</h4>
                            <a href="#features" className="text-sm text-gray-400 hover:text-primary transition-colors">Features</a>
                            <a href="#comparison" className="text-sm text-gray-400 hover:text-primary transition-colors">Pricing</a>
                            <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Integrations</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-white mb-2">Company</h4>
                            <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">About</a>
                            <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Blog</a>
                            <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 text-center">
                    <p className="text-gray-600 text-xs">
                        &copy; 2026 AutoFlow Inc. All rights reserved. Built for the future.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
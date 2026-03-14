import React from 'react';
// Tailwind styles are used instead of custom CSS
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Comparison from '../components/landing/Comparison';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    return (
        // We add 'text-white' and 'font-sans' here to force the elegant look
        <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-primary/30 relative w-full overflow-hidden">

            {/* --- BACKGROUND EFFECTS --- */}

            {/* 1. Deep Base */}
            <div className="fixed top-0 left-0 w-full h-full bg-[#050505] -z-50"></div>

            {/* 2. Top-Center Spotlight (Creates the "Stage" effect) */}
            <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-40"></div>

            {/* 3. Subtle Noise Texture (Adds the "expensive" grainy feel) */}
            <div className="fixed top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none z-0 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* --- CONTENT --- */}
            <div className="relative z-10">
                <Navbar />
                <Hero />
                <Comparison />
                <HowItWorks />
                <Features />
                <CTA />
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
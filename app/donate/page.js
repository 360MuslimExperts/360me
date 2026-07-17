"use client";

// Force client-side execution to resolve the static prerendering error
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaHandHoldingHeart, FaLeaf, FaGlobe } from "react-icons/fa6";

export default function DonatePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCause, setSelectedCause] = useState(null);
    const [copiedText, setCopiedText] = useState("");

    const causes = [
        {
            id: "education",
            title: "Education & Skills",
            icon: <FaHandHoldingHeart className="text-3xl text-golden group-hover:text-white transition-colors" />,
            description: "Sponsor books, school supplies, and digital literacy training aligned with Islamic values."
        },
        {
            id: "global",
            title: "Global Initiatives",
            icon: <FaGlobe className="text-3xl text-golden group-hover:text-white transition-colors" />,
            description: "Supporting community projects and humanitarian relief where it's needed most."
        },
        {
            id: "growth",
            title: "Sustainable Growth",
            icon: <FaLeaf className="text-3xl text-golden group-hover:text-white transition-colors" />,
            description: "Building permanent infrastructure for technical education and community development."
        }
    ];

    const handleOpenModal = (cause = null) => {
        setSelectedCause(cause);
        setIsModalOpen(true);
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopiedText(type);
        setTimeout(() => setCopiedText(""), 2000);
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 selection:bg-golden/30">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Hero Section */}
                <section className="relative rounded-[3rem] overflow-hidden bg-primary p-12 md:p-24 text-white mb-24 shadow-2xl">
                    <Image
                        src="/api/assets/graphics/donate_hero.png"
                        alt="Support 360ME"
                        fill
                        className="object-cover opacity-20 pointer-events-none"
                        priority
                    />
                    <div className="relative z-10 max-w-2xl">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight"
                        >
                            Invest in the <span className="text-golden italic underline decoration-wavy decoration-golden">Future</span> of the Ummah
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl opacity-90 mb-12 font-light leading-relaxed"
                        >
                            Your contribution fuels our mission to bridge the gap between tradition and innovation. Every seed you sow today builds a brighter tomorrow.
                        </motion.p>
                        <div className="flex flex-wrap gap-6">
                            <button 
                                onClick={() => handleOpenModal(null)}
                                className="px-10 py-5 bg-golden text-primary font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-black/20"
                            >
                                Donate Now
                            </button>
                            <Link href="#causes" className="px-10 py-5 border-2 border-white/30 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Causes Grid */}
                <div id="causes" className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    {causes.map((cause, idx) => (
                        <motion.div 
                            key={cause.id} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => handleOpenModal({ title: cause.title, desc: cause.description })}
                            className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-50 group cursor-pointer hover:-translate-y-2 duration-300"
                        >
                            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                                <div className="group-hover:scale-110 transition-transform duration-300">
                                    {cause.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-primary mb-6 group-hover:text-golden transition-colors">{cause.title}</h3>
                            <p className="text-text-light/80 leading-relaxed font-light mb-8">
                                {cause.description}
                            </p>
                            <span className="text-xs font-bold uppercase text-golden tracking-wider group-hover:underline flex items-center gap-1">
                                Select Cause &rarr;
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Selection Donation Section */}
                <section className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-gray-50 text-center relative overflow-hidden">
                    <h2 className="text-4xl md:text-6xl font-black text-primary mb-12 tracking-tight">Support Our <span className="text-golden">Vision</span></h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
                        {["$10", "$50", "$100", "Custom Support"].map((amount) => (
                            <button 
                                key={amount} 
                                onClick={() => handleOpenModal(amount !== "Custom Support" ? { title: `${amount} Contribution`, desc: `Generous prompt ${amount} asset matching.` } : null)}
                                className="py-6 border-2 border-gray-100 rounded-2xl font-black text-xl text-primary hover:border-golden hover:text-golden hover:bg-golden/5 transition-all shadow-sm active:scale-95"
                            >
                                {amount}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-2xl mx-auto p-12 bg-background rounded-[3rem] border border-gray-100 italic text-text-light/60">
                        <FaHeart className="text-golden mx-auto mb-6 text-2xl animate-pulse" />
                        &quot;The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills.&quot; (2:261)
                    </div>
                </section>
            </div>

            {/* Shared Interactive Modal Wrapper */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-primary border border-white/10 rounded-3xl p-6 md:p-8 text-white shadow-2xl z-10 overflow-hidden font-[Outfit]"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-3xl font-light"
                            >
                                &times;
                            </button>

                            <div className="text-center mb-6">
                                <span className="text-xs uppercase tracking-widest text-golden font-bold">
                                    {selectedCause ? `Supporting: ${selectedCause.title}` : "Direct Support"}
                                </span>
                                <h3 className="text-2xl font-bold mt-1">Make a Contribution</h3>
                                {selectedCause?.desc && (
                                    <p className="text-sm text-white/70 mt-2 italic px-2">
                                        &ldquo;{selectedCause.desc}&rdquo;
                                    </p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-golden uppercase tracking-wider">Meezan Bank</span>
                                        <span className="text-xs text-white/40">Savings</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <div>
                                            <span className="block text-xs text-white/50">Account Number</span>
                                            <span className="text-sm font-mono font-bold tracking-wide">1201-0103038919</span>
                                        </div>
                                        <button 
                                            onClick={() => copyToClipboard("12010103038919", "ac")}
                                            className="text-xs bg-golden/10 hover:bg-golden/20 text-golden px-3 py-1.5 rounded-lg transition-all font-medium min-w-[65px]"
                                        >
                                            {copiedText === "ac" ? "Copied!" : "Copy"}
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center pt-2">
                                        <div>
                                            <span className="block text-xs text-white/50">IBAN</span>
                                            <span className="text-xs font-mono font-bold tracking-tight">PK63MEZN0012010103038919</span>
                                        </div>
                                        <button 
                                            onClick={() => copyToClipboard("PK63MEZN0012010103038919", "iban")}
                                            className="text-xs bg-golden/10 hover:bg-golden/20 text-golden px-3 py-1.5 rounded-lg transition-all font-medium min-w-[65px]"
                                        >
                                            {copiedText === "iban" ? "Copied!" : "Copy"}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                                    <div>
                                        <span className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Easypaisa Account</span>
                                        <span className="block text-xs text-white/50">Mobile Number</span>
                                        <span className="text-sm font-mono font-bold">0335-6222019</span>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard("03356222019", "ep")}
                                        className="text-xs bg-green-400/10 hover:bg-green-400/20 text-green-400 px-3 py-1.5 rounded-lg transition-all font-medium min-w-[65px]"
                                    >
                                        {copiedText === "ep" ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                            </div>

                            <p className="text-[11px] text-center text-white/40 mt-6 leading-relaxed">
                                Please mention your intent or selected cause in the transfer description box if your banking app supports it. JazakAllah Khair for supporting 360 Muslim Experts!
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";

// Force client-side execution to resolve the static prerendering error
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHeart, FaHandHoldingHeart, FaLeaf, FaGlobe } from "react-icons/fa6";
import DonationModal from "@/components/DonationModal";

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
            <DonationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              selectedCause={selectedCause}
              copiedText={copiedText}
              onCopy={copyToClipboard}
            />
        </div>
    );
}

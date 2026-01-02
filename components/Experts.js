"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const experts = [
    {
        name: "Dr. Muhammad Zain Abbas",
        role: "Founding Scholar",
        specialty: "Islamic Jurisprudence & Education",
        image: "/logo-512.png", // Using logo as fallback
    },
    {
        name: "Aisha Rahman",
        role: "Senior Consultant",
        specialty: "Digital Media & Strategy",
        image: "/logo-512.png",
    },
    {
        name: "Usman Khan",
        role: "Innovation Lead",
        specialty: "Tech for Good & Social Impact",
        image: "/logo-512.png",
    }
];

const Experts = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#4A1D12 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-golden font-bold tracking-widest uppercase text-sm mb-3 block"
                    >
                        Our Intellectual Core
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-primary"
                    >
                        Meet Our <span className="text-secondary-color">Experts</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {experts.map((expert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="bg-gray-50 rounded-[2.5rem] p-8 transition-all duration-500 border border-transparent hover:border-golden/30 hover:bg-white hover:shadow-2xl">
                                <div className="relative w-24 h-24 mb-6 mx-auto md:mx-0">
                                    <div className="absolute inset-0 bg-golden/20 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform" />
                                    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-3">
                                        <Image
                                            src={expert.image}
                                            alt={expert.name}
                                            width={80}
                                            height={80}
                                            className="object-contain opacity-80"
                                        />
                                    </div>
                                </div>

                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-primary mb-1">{expert.name}</h3>
                                    <p className="text-golden font-semibold text-sm uppercase tracking-wider mb-4">{expert.role}</p>
                                    <div className="h-[1px] w-12 bg-gray-200 mb-4 mx-auto md:mx-0 group-hover:w-full transition-all duration-500" />
                                    <p className="text-text-light text-sm leading-relaxed">
                                        Specializing in <span className="text-primary font-medium">{expert.specialty}</span>, driving innovation and excellence within the 360ME community.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experts;

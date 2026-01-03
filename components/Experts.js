"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const experts = [
    {
        name: "Dr. Zain Abbas",
        role: "Founding Scholar",
        specialty: "Islamic Jurisprudence & Education",
        image: "/experts/zain-abbas.jpeg",
    },
    {
        name: "Zain Salim",
        role: "Content Director",
        specialty: "Digital Media & Strategy",
        image: "/experts/zain-salim.jpg",
    },
    {
        name: "Syed Hammad",
        role: "Technical Director",
        specialty: "Making Things Work (Eventually)",
        image: "/team/syed-hammad.png",
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-8 px-4 md:px-0">
                    {experts.map((expert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative h-full bg-white rounded-[2rem] p-8 pt-16 md:pt-16 mt-12 md:mt-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(74,29,18,0.1)] hover:-translate-y-2 overflow-visible">
                                {/* Floating Avatar */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 md:w-28 md:h-28">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-golden to-secondary rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
                                    <div className="relative w-full h-full rounded-full border-[6px] border-white shadow-xl overflow-hidden bg-gray-100">
                                        <Image
                                            src={expert.image}
                                            alt={expert.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                <div className="text-center mt-6 md:mt-10">
                                    <h3 className="text-2xl md:text-2xl font-black text-primary mb-2 line-clamp-1 group-hover:text-golden transition-colors">{expert.name}</h3>
                                    <p className="text-sm font-bold text-text-light/60 uppercase tracking-widest mb-4 line-clamp-1">{expert.role}</p>

                                    <div className="block h-[1px] w-12 bg-gray-100 mb-4 mx-auto group-hover:w-1/2 group-hover:bg-golden transition-all duration-500" />

                                    <p className="text-base text-text-light leading-relaxed">
                                        <span className="inline">Specializing in </span>
                                        <span className="font-bold text-primary">{expert.specialty}</span>
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

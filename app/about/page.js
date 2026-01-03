"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <main className="bg-background min-h-screen overflow-hidden">
            {/* Header Section */}
            <section className="relative pt-32 pb-20 px-4 text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute top-20 right-0 w-96 h-96 bg-golden/10 rounded-full blur-3xl -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="text-golden font-bold tracking-wider uppercase text-sm mb-4 block">Who Are We?</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-6 tracking-tight">
                        About <span className="text-golden">360 ME</span>
                    </h1>
                    <p className="text-xl text-text-light max-w-2xl mx-auto leading-relaxed">
                        A professional organization embodying Islamic values, welcoming Muslims and non-Muslims alike to explore the true essence of our faith.
                    </p>
                </motion.div>
            </section>

            {/* Quran Verse (Theme) */}
            <section className="py-16 px-4 bg-white relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-primary/5 p-8 md:p-12 rounded-3xl border border-primary/10"
                    >
                        <h3 className="text-golden font-serif text-2xl md:text-3xl mb-6">&quot;سَنُرِيهِمْ ءَايَـٰتِنَا فِى ٱلْـَٔافَاقِ وَفِىٓ أَنفُسِهِمْ&quot;</h3>
                        <p className="text-lg md:text-xl text-primary font-medium italic mb-4">
                            &quot;We will show them Our signs in the universe and within themselves until it becomes clear to them that this ˹Quran˺ is the truth.&quot;
                        </p>
                        <p className="text-sm text-text-light uppercase tracking-widest font-bold">Surah Fussilat (41:53)</p>
                    </motion.div>
                </div>
            </section>

            {/* Foundation & History */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-primary mb-6">
                            Foundation <span className="text-golden block text-xl mt-2 font-normal">By the will of Allah</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-text-light text-lg leading-relaxed mb-6">
                            360 Muslim Experts was phenomenally founded on <strong className="text-primary">27th of Ramadan 1440 Hijri</strong> (21st May, 2019) by <strong className="text-primary">Dr. Muhammad Zain Abbas</strong>.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-text-light text-lg leading-relaxed">
                            Starting as a medical student with a divinely inspired vision, Dr. Zain initiated this organization to serve Allah SWT, believing deeply in His signs and guidance.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Abstract image representation since we might not have a photo */}
                        <div className="aspect-square bg-gradient-to-br from-primary via-secondary to-golden rounded-3xl opacity-10 rotate-3 absolute inset-0" />
                        <div className="aspect-square bg-white rounded-3xl shadow-xl border border-gray-100 relative z-10 flex items-center justify-center p-8">
                            <Image src="/logo-512.png" alt="360ME Foundation" width={300} height={300} className="w-2/3 h-2/3 object-contain opacity-90" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Deep Dive */}
            <section className="py-20 px-4 bg-secondary/5 relative overflow-hidden">
                {/* Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-golden/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/40"
                        >
                            <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="w-2 h-8 bg-golden rounded-full" /> Our Vision
                            </h3>
                            <p className="text-text-light leading-relaxed">
                                To establish functional institutions that enable the intentional practice of Islam while aligning with contemporary life. We aim to highlight Islam&apos;s transformative potential as the ultimate solution to humanity&apos;s challenges, serving as an exemplary framework for the world.
                            </p>
                        </motion.div>

                        {/* Deep Dive Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/40"
                        >
                            <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="w-2 h-8 bg-secondary rounded-full" /> A Deeper Dive
                            </h3>
                            <p className="text-text-light leading-relaxed">
                                Primarily based in Pakistan but welcoming globally. The name <strong>&quot;360&quot;</strong> signifies inclusivity—inviting everyone from baby boomers to Gen Z, and individuals from all backgrounds, to understand the true essence of Muslim life.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Mission Pills */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-3xl font-bold text-primary mb-12"
                    >
                        Our Core Mission
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Quran", image: "/about/quran.png" },
                            { title: "Education", image: "/about/education.png" },
                            { title: "Creativity", image: "/about/creativity.png" },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.15, type: "spring", stiffness: 200 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="flex flex-col items-center justify-center gap-6 group"
                            >
                                <div className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center relative">
                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-golden/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75" />

                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={250}
                                        height={250}
                                        className="w-full h-full object-contain drop-shadow-2xl z-10 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-primary group-hover:text-golden transition-colors">{item.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Logo & Diversity */}
            <section className="py-20 px-4 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5" /> {/* Fallback pattern if exists, else just subtle texture */}
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Creative Identity</h2>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                            Our logo features metaphors representing community aspects, inspired by reflections on the world and ourselves. We encourage creative thinkers to join—experts from business, arts, engineering, and more—enriching our community under the <span className="text-golden font-bold">360 umbrella</span>.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-primary mb-8">Inspired?</h2>
                    <Link href="/contact" className="btn text-xl px-12 py-5 shadow-2xl shadow-golden/30 bg-golden text-primary hover:bg-white hover:text-golden border-2 border-transparent hover:border-golden">
                        Become a Part Now!
                    </Link>
                </motion.div>
            </section>
        </main>
    );
};

export default AboutPage;

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaPhone, FaLocationDot, FaEnvelope, FaFacebookF, FaWhatsapp } from "react-icons/fa6";

const ContactPage = () => {
    const [formState, setFormState] = useState({
        name: "",
        whatsapp: "",
        email: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormState({ name: "", whatsapp: "", email: "", message: "" });
        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <main className="bg-background min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-golden font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-primary mb-6"
                    >
                        Want to <span className="text-secondary-color">Connect or Meet Us?</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-text-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Feel free to reach out for any queries you may have. We&apos;re here to help you 24/7/365. Connect with us today through your favorite platform!
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-5 space-y-8"
                    >
                        <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 flex items-start gap-6 group hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <FaEnvelope size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-1">Email</h3>
                                <a href="mailto:360me.info@gmail.com" className="text-secondary-color font-semibold hover:underline">360me.info@gmail.com</a>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 flex items-start gap-6 group hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 rounded-2xl bg-secondary-color/5 flex items-center justify-center text-secondary-color group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <FaPhone size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-1">Phone & WhatsApp</h3>
                                <div className="flex flex-col gap-1">
                                    <a href="tel:+923356222019" className="text-primary font-semibold hover:underline">
                                        +92 335 622 2019
                                    </a>
                                    <a href="https://wa.me/923356222019" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 font-bold hover:underline text-sm mt-1">
                                        <FaWhatsapp size={18} />
                                        Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 flex items-start gap-6 group hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 rounded-2xl bg-golden/5 flex items-center justify-center text-golden group-hover:bg-golden group-hover:text-white transition-all duration-300">
                                <FaLocationDot size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-1">Address</h3>
                                <a
                                    href="https://maps.app.goo.gl/wqUiLjRAjmwpAJETA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-light leading-relaxed hover:text-golden transition-colors"
                                >
                                    House No. 74, Phase 2, Wapda Town, Lahore 54770, Pakistan
                                </a>
                            </div>
                        </motion.div>

                        {/* Community Groups */}
                        <motion.div variants={itemVariants} className="pt-6">
                            <h3 className="text-xl font-bold text-primary mb-4">Join Our Communities</h3>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://www.facebook.com/groups/360muslimexpert"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-blue-50 text-[#1877F2] font-bold transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
                                >
                                    <FaFacebookF size={20} />
                                    Facebook Group
                                </a>
                                <a
                                    href="#"
                                    className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-green-50 text-[#25D366] font-bold transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-green-500/20"
                                >
                                    <FaWhatsapp size={20} />
                                    WhatsApp Group
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-50 relative overflow-hidden">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20"
                                >
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FaPaperPlane size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-primary mb-4">Message Sent!</h2>
                                    <p className="text-text-light mb-8 text-lg">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="btn px-8"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-primary mb-6">Fill The Form To Get Responded Soon</h2>

                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
                                            id="name" name="name" placeholder="Your Name"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="whatsapp" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">WhatsApp Contact</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
                                                id="whatsapp" name="whatsapp" placeholder="Your WhatsApp Number"
                                                value={formState.whatsapp}
                                                onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Email</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
                                                id="email" name="email" placeholder="Your Email"
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Your Message</label>
                                        <textarea
                                            required
                                            rows="5"
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all resize-none"
                                            id="message" name="message" placeholder="Your Message"
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn py-5 text-lg rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 group"
                                    >
                                        {isSubmitting ? (
                                            "Sending..."
                                        ) : (
                                            <>
                                                Send Message
                                                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;

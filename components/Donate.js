"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import DonationModal from "./DonationModal";

const donateItems = [
  { 
    id: "education", 
    title: "Education", 
    img: "/api/assets/graphics/education.webp", 
    desc: "Sponsor books, school supplies, and digital literacy training for underprivileged youth." 
  },
  { 
    id: "food", 
    title: "Food", 
    img: "/api/assets/graphics/food.webp", 
    desc: "Provide raw rations and cooked hot meals to families facing extreme financial hardship." 
  },
  { 
    id: "health", 
    title: "Health", 
    img: "/api/assets/graphics/health.webp", 
    desc: "Fund medical camps, basic medicines, and healthcare access managed by Medico 360 experts." 
  },
];

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [copiedText, setCopiedText] = useState("");

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
    <section className="py-20 px-4 bg-background overflow-hidden relative">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-golden/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-primary mb-6"
          >
            Support Our Cause
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto italic font-medium"
          >
            &quot;The believer&apos;s shade on the Day of Resurrection will be his charity.&quot;
          </motion.p>
          <p className="text-sm text-golden mt-2 uppercase tracking-widest font-semibold">- Al-Tirmidhi, Hadith 604</p>
        </div>

        {/* Donation categories */}
        <div className="flex flex-row justify-center gap-6 md:gap-10">
          {donateItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.1 }}
              onClick={() => handleOpenModal(item)}
              className="flex flex-col items-center gap-4 cursor-pointer group flex-1"
            >
              <div className="w-24 h-24 md:w-44 md:h-44 flex items-center justify-center relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-golden/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75" />

                <Image
                  src={item.img}
                  alt={item.title}
                  width={176}
                  height={176}
                  className="w-full h-full object-contain drop-shadow-xl z-10 transition-all duration-500 group-hover:rotate-2"
                />
              </div>
              <h3 className="text-base md:text-2xl font-bold text-primary group-hover:text-golden transition-colors text-center">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Donate Now button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <button 
            onClick={() => handleOpenModal(null)}
            className="btn px-10 py-4 text-lg rounded-full shadow-xl shadow-golden/20 hover:shadow-golden/40 bg-golden text-primary hover:bg-white hover:text-golden transition-all duration-300 transform hover:-translate-y-1 font-semibold"
          >
            Donate Now
          </button>
        </motion.div>
      </div>

      {/* Interactive Modal (Zero Server-side dependencies - Perfect for Cloudflare Pages) */}
      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCause={selectedCause}
        copiedText={copiedText}
        onCopy={copyToClipboard}
      />
    </section>
  );
};

export default Donate;
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const donateItems = [
  { 
    id: "education", 
    title: "Education", 
    img: "/donate/education.png", 
    desc: "Sponsor books, school supplies, and digital literacy training for underprivileged youth." 
  },
  { 
    id: "food", 
    title: "Food", 
    img: "/donate/food.png", 
    desc: "Provide raw rations and cooked hot meals to families facing extreme financial hardship." 
  },
  { 
    id: "health", 
    title: "Health", 
    img: "/donate/health.png", 
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
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-primary border border-white/10 rounded-3xl p-6 md:p-8 text-white shadow-2xl z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-2xl"
              >
                &times;
              </button>

              {/* Header inside modal */}
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-golden font-bold">
                  {selectedCause ? `Supporting ${selectedCause.title}` : "Direct Support"}
                </span>
                <h3 className="text-2xl font-bold mt-1">Make a Contribution</h3>
                {selectedCause && (
                  <p className="text-sm text-white/70 mt-2 italic px-2">
                    &ldquo;{selectedCause.desc}&rdquo;
                  </p>
                )}
              </div>

              {/* Payment Info */}
              <div className="space-y-4">
                {/* Bank Details */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-golden uppercase tracking-wider">Meezan Bank</span>
                    <span className="text-xs text-white/40">Savings / Current</span>
                  </div>
                  
                  {/* Account Number Row */}
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <div>
                      <span className="block text-xs text-white/50">Account Number</span>
                      <span className="text-sm font-mono font-bold tracking-wide">1201-0103038919</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard("12010103038919", "ac")}
                      className="text-xs bg-golden/10 hover:bg-golden/20 text-golden px-3 py-1.5 rounded-lg transition-all font-medium"
                    >
                      {copiedText === "ac" ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* IBAN Row */}
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="block text-xs text-white/50">IBAN</span>
                      <span className="text-xs font-mono font-bold tracking-tight">PK63MEZN0012010103038919</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard("PK63MEZN0012010103038919", "iban")}
                      className="text-xs bg-golden/10 hover:bg-golden/20 text-golden px-3 py-1.5 rounded-lg transition-all font-medium"
                    >
                      {copiedText === "iban" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Easypaisa Details */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Easypaisa Mobile Account</span>
                    <span className="block text-xs text-white/50">Number</span>
                    <span className="text-sm font-mono font-bold">0335-6222019</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard("03356222019", "ep")}
                    className="text-xs bg-green-400/10 hover:bg-green-400/20 text-green-400 px-3 py-1.5 rounded-lg transition-all font-medium"
                  >
                    {copiedText === "ep" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Note / Instruction */}
              <p className="text-[11px] text-center text-white/40 mt-6 leading-relaxed">
                Please mention the cause (e.g., &quot;Education&quot; or &quot;Health&quot;) in the transfer description if possible. JazakAllah Khair for your generous support!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Donate;
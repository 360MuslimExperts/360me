"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DonationModal = ({ isOpen, onClose, selectedCause, copiedText, onCopy }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-primary border border-white/10 rounded-3xl p-6 md:p-8 text-white shadow-2xl z-10 overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-2xl"
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-golden font-bold">
                {selectedCause ? `Supporting ${selectedCause.title}` : "Direct Support"}
              </span>
              <h3 className="text-2xl font-bold mt-1">Make a Contribution</h3>
              {selectedCause?.desc && (
                <p className="text-sm text-white/70 mt-2 italic px-2">
                  &ldquo;{selectedCause.desc}&rdquo;
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-golden uppercase tracking-wider">Meezan Bank</span>
                  <span className="text-xs text-white/40">Savings / Current</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <div>
                    <span className="block text-xs text-white/50">Account Number</span>
                    <span className="text-sm font-mono font-bold tracking-wide">1201-0103038919</span>
                  </div>
                  <button
                    onClick={() => onCopy("12010103038919", "ac")}
                    className="text-xs bg-golden/10 hover:bg-golden/20 text-golden px-3 py-1.5 rounded-lg transition-all font-medium"
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
                    onClick={() => onCopy("PK63MEZN0012010103038919", "iban")}
                    className="text-xs bg-golden/10 hover:bg-golden/20 text-golden px-3 py-1.5 rounded-lg transition-all font-medium"
                  >
                    {copiedText === "iban" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <span className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Easypaisa Mobile Account</span>
                  <span className="block text-xs text-white/50">Number</span>
                  <span className="text-sm font-mono font-bold">0335-6222019</span>
                </div>
                <button
                  onClick={() => onCopy("03356222019", "ep")}
                  className="text-xs bg-green-400/10 hover:bg-green-400/20 text-green-400 px-3 py-1.5 rounded-lg transition-all font-medium"
                >
                  {copiedText === "ep" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-center text-white/40 mt-6 leading-relaxed">
              Please mention the cause (e.g., &quot;Education&quot; or &quot;Health&quot;) in the transfer description if possible. JazakAllah Khair for your generous support!
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;

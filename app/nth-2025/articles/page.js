"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBookOpen, FaArrowRight, FaCalendarDays, FaUserPen } from "react-icons/fa6";
import articles from "@/data/nth-2025/articles.json";

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6"
          >
            <FaBookOpen size={30} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-primary mb-6"
          >
            NTH 2025 <span className="text-secondary-color">Knowledge Base</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-light max-w-2xl mx-auto"
          >
            Dive into the insightful articles and research contributions from our National Talent Hunt 2025 participants.
          </motion.p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/nth-2025/articles/${article.id}`}
                className="group block h-full bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-secondary-color/10 text-secondary-color text-[10px] font-bold uppercase tracking-wider rounded-full">
                      Article
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-widest gap-1">
                      <FaCalendarDays /> 2025 Edition
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-primary mb-4 line-clamp-2 group-hover:text-secondary-color transition-colors leading-tight">
                    {article.title}
                  </h2>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                      <FaUserPen size={14} />
                    </div>
                    <span className="text-sm font-semibold text-text-light">by {article.author}</span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-secondary-color font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read Full Story
                      <FaArrowRight size={12} />
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <FaArrowRight className="-rotate-45" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

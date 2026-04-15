"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const activities = [
  {
    id: "dora",
    title: "Dora e Quran",
    speaker: "Sir Jareer Hussain",
    img: "/activities/dora-e-quran.png",
  },
  {
    id: "graphics",
    title: "Graphics Course",
    speaker: "Dr Zain Abbas",
    img: "/activities/graphics-zain.png",
  },
  {
    id: "amr",
    title: "Amr bil Maroof",
    speaker: "Al Noor Teachers",
    img: "/activities/amr-bil-maroof.png",
  },
];

const Activities = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-golden font-semibold tracking-wider text-sm uppercase">Our Programs</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2">
            Recent Activities
          </h2>
          <p className="text-text-light mt-4 max-w-2xl mx-auto text-lg">
            Explore our impactful activities that bring knowledge, skills, and
            values to life.
          </p>
        </motion.div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group w-full max-w-[350px] bg-white rounded-3xl overflow-hidden shadow-lg border border-black/5 hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative overflow-hidden bg-gray-50 aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
              <Image
                src={activity.img}
                alt={activity.title}
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-8 text-center bg-white relative z-20">
              <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-golden transition-colors duration-300">
                {activity.title}
              </h3>
              <p className="text-text-light font-medium">{activity.speaker}</p>
              <div className="mt-4 w-12 h-1 bg-primary/10 mx-auto rounded-full group-hover:bg-golden transition-colors duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explore Button */}
      <div className="flex justify-center mt-12">
        <Link href="/activities" className="btn-outline px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all">
          Explore All Activities
        </Link>
      </div>
    </section>
  );
};

export default Activities;

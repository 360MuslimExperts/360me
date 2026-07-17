"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TeamCard = ({ member }) => {
    // 1. Logic for Role Formatting
    // Handles 'Head' -> "Head of [Category] Department"
    // Handles 'Member' -> "[Category] Member" (or whatever you prefer)
    let displayRole = member.role;
    
    if (member.role === "Head" && member.category) {
        displayRole = `Head of ${member.category.charAt(0).toUpperCase() + member.category.slice(1)} Department`;
    } else if (member.role === "Member" && member.category) {
        displayRole = `${member.category.charAt(0).toUpperCase() + member.category.slice(1)} Member`;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 to-transparent z-0" />

            <div className="relative w-32 h-32 mb-4 z-10">
                <div className="absolute inset-0 bg-golden/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
                    <Image
                        // 2. Updated path here
                        src={member.image || "/api/assets/logo/logo-512.png"} 
                        alt={member.name}
                        width={128}
                        height={128}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${!member.image ? 'p-4 bg-gray-50' : ''}`}
                    />
                </div>
            </div>

            <div className="z-10 w-full">
                <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-golden transition-colors duration-300">
                    {member.name}
                </h3>
                <p className="text-sm font-medium text-secondary mb-2 uppercase tracking-wide">
                    {displayRole}
                </p>

                {member.regNo && (
                    <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-500 font-mono">
                        {member.regNo}
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-golden to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </motion.div>
    );
};

export default TeamCard;

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TeamCard = ({ member }) => {
    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

    let displayRole = member.role;
    const deptName = capitalize(member.category || member.dept || "");

    if (member.role?.toLowerCase() === "head" && deptName) {
        displayRole = `Head of ${deptName} Department`;
    } else if (member.role?.toLowerCase() === "member" && deptName) {
        displayRole = `${deptName} Member`;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} // Triggers quickly on scroll
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }} // Snappy animation speed
            className="group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 to-transparent z-0" />

            <div className="relative w-32 h-32 mb-4 z-10">
                <div className="absolute inset-0 bg-golden/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
                    <Image
                        // Uses tiny 128px fallback instead of massive 512px asset
                        src={member.image || "/api/assets/logo/logo-256.webp"} 
                        alt={member.name}
                        width={256} // Optimized delivery size target
                        height={256}
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${!member.image ? 'p-4 bg-gray-50' : ''}`}
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

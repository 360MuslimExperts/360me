"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
    FaGithub, 
    FaInstagram, 
    FaFacebook, 
    FaYoutube, 
    FaGlobe, 
    FaXTwitter, 
    FaLinkedinIn 
} from "react-icons/fa6";

const TeamCard = ({ member }) => {
    let displayRole = member.role || "";
    const deptName = member.category || member.dept || "";
    const lowerRole = displayRole.toLowerCase();

    // Smart formatting logic for clean designation badges
    if ((lowerRole === "head" || lowerRole === "deputy head") && deptName) {
        const titlePrefix = lowerRole === "head" ? "Head" : "Deputy Head";
        
        // Prevent doubling words like "Department Department" or "Forum Department"
        if (deptName.toLowerCase().includes("forum") || deptName.toLowerCase().includes("department") || deptName.includes("&")) {
            displayRole = `${titlePrefix} of ${deptName}`;
        } else {
            displayRole = `${titlePrefix} of ${deptName} Department`;
        }
    } else if (lowerRole === "member" && deptName) {
        if (deptName.toLowerCase().includes("forum") || deptName.toLowerCase().includes("department") || deptName.includes("&")) {
            displayRole = `${deptName} Member`;
        } else {
            displayRole = `${deptName} Team Member`;
        }
    }

    const formatSocialUrl = (input, baseUrl) => {
        if (!input) return null;
        const cleanInput = input.trim();
        if (cleanInput.startsWith("http://") || cleanInput.startsWith("https://")) {
            return cleanInput;
        }
        const handle = cleanInput.startsWith("@") ? cleanInput.slice(1) : cleanInput;
        return `${baseUrl}/${handle}`;
    };

    const socialLinks = [
        { url: formatSocialUrl(member.github, "https://github.com"), icon: <FaGithub />, label: "GitHub", color: "hover:text-black" },
        { url: formatSocialUrl(member.instagram, "https://instagram.com"), icon: <FaInstagram />, label: "Instagram", color: "hover:text-pink-600" },
        { url: formatSocialUrl(member.facebook, "https://facebook.com"), icon: <FaFacebook />, label: "Facebook", color: "hover:text-blue-600" },
        { url: formatSocialUrl(member.twitter || member.x, "https://x.com"), icon: <FaXTwitter />, label: "X / Twitter", color: "hover:text-black" },
        { url: formatSocialUrl(member.linkedin, "https://linkedin.com/in"), icon: <FaLinkedinIn />, label: "LinkedIn", color: "hover:text-blue-700" },
        { url: formatSocialUrl(member.youtube, "https://youtube.com"), icon: <FaYoutube />, label: "YouTube", color: "hover:text-red-600" },
        { url: member.website ? (member.website.startsWith("http") ? member.website : `https://${member.website}`) : null, icon: <FaGlobe />, label: "Website", color: "hover:text-golden" },
    ].filter(link => link.url);

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="group relative bg-white rounded-xl p-3.5 shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-100 flex flex-col items-center text-center overflow-hidden h-full"
        >
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-br from-primary/5 to-transparent z-0" />

            <div className="flex flex-col items-center w-full flex-grow">
                <div className="relative w-28 h-28 mb-2.5 z-10 mt-2">
                    <div className="absolute inset-0 bg-golden/10 rounded-full blur-md group-hover:blur-lg transition-all duration-200" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                            src={member.image || "/api/assets/logo/logo-128.webp"} 
                            alt={member.name}
                            width={256}
                            height={256}
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                    </div>
                </div>

                <div className="z-10 w-full px-1">
                    <h3 className="text-lg font-bold text-primary mb-0.5 group-hover:text-golden transition-colors duration-200 line-clamp-1">
                        {member.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-secondary/80 mb-1.5 uppercase tracking-wide">
                        {displayRole}
                    </p>

                    {member.regNo && (
                        <div className="inline-block bg-gray-50 px-2 py-0.5 rounded-full text-[10px] text-gray-400 font-mono mb-1">
                            {member.regNo}
                        </div>
                    )}
                </div>
            </div>

            {socialLinks.length > 0 && (
                <div className="z-10 w-full pt-2.5 mt-1 border-t border-gray-50 flex items-center justify-center gap-3 text-gray-400 text-base">
                    {socialLinks.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s ${social.label}`}
                            className={`transition-colors duration-150 text-gray-400 ${social.color} p-0.5`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            )}

            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-golden to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
        </motion.div>
    );
};

export default TeamCard;

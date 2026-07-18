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
    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

    let displayRole = member.role;
    const deptName = capitalize(member.category || member.dept || "");

    if (member.role?.toLowerCase() === "head" && deptName) {
        displayRole = `Head of ${deptName} Department`;
    } else if (member.role?.toLowerCase() === "member" && deptName) {
        displayRole = `${deptName} Member`;
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
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center overflow-hidden h-full"
        >
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 to-transparent z-0" />

            <div className="flex flex-col items-center w-full flex-grow">
                {/* Avatar */}
                <div className="relative w-32 h-32 mb-4 z-10">
                    <div className="absolute inset-0 bg-golden/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
                        <Image
                            src={member.image || "/api/assets/logo/logo-128.webp"} 
                            alt={member.name}
                            width={256}
                            height={256}
                            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${!member.image ? 'p-4 bg-gray-50' : ''}`}
                        />
                    </div>
                </div>

                {/* Member Info */}
                <div className="z-10 w-full px-2">
                    <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-golden transition-colors duration-300 line-clamp-1">
                        {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">
                        {displayRole}
                    </p>

                    {member.regNo && (
                        <div className="inline-block bg-gray-100 px-3 py-0.5 rounded-full text-[11px] text-gray-500 font-mono mb-2">
                            {member.regNo}
                        </div>
                    )}
                </div>
            </div>

            {/* Social Icons row - Clean conditional render with zero height impact if empty */}
            {socialLinks.length > 0 && (
                <div className="z-10 w-full pt-3 mt-1 border-t border-gray-50 flex items-center justify-center gap-3.5 text-gray-400 text-lg">
                    {socialLinks.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s ${social.label}`}
                            className={`transition-all duration-200 text-gray-500 ${social.color} p-0.5 hover:scale-110 transform`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            )}

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-golden to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </motion.div>
    );
};

export default TeamCard;

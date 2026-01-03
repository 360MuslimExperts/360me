"use client";

import { motion } from "framer-motion";

export default function TypewriterText({ text, className }) {
    // Split text into array of characters
    const characters = text.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Typing speed
                delayChildren: 0.2
            }
        }
    };

    const charVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.h1>
    );
}

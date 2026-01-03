"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaArrowsLeftRight } from "react-icons/fa6";

export default function LogoComparison() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);

    const handleMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            // Calculate position from standard mouse event
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-lg aspect-square mx-auto cursor-ew-resize select-none overflow-hidden rounded-3xl shadow-2xl bg-white"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
        >
            {/* Background Image (Right / "After" / Creative) */}
            <div className="absolute inset-0 flex items-center justify-center bg-white">
                <Image
                    src="/logo-creative.png"
                    alt="Creative Logo"
                    fill
                    className="object-contain"
                    priority
                />
                <span className="absolute top-6 right-6 text-sm font-bold text-primary uppercase tracking-widest bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm">Creative</span>
            </div>

            {/* Foreground Image (Left / "Before" / Standard) - Clipped */}
            <div
                className="absolute inset-0 flex items-center justify-center bg-white border-r border-golden/30"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                {/* Fixed width container to keep image centered relative to full view */}
                <div className="relative w-full h-full">
                    <Image
                        src="/logo-512.png"
                        alt="Standard Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <span className="absolute top-6 left-6 text-sm font-bold text-primary uppercase tracking-widest bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm">Standard</span>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-golden z-10"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-golden text-xl border border-gray-100">
                    <FaArrowsLeftRight />
                </div>
            </div>
        </div>
    );
}

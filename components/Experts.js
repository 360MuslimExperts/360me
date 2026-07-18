import React from "react";
import Image from "next/image";
import Link from "next/link";

const Experts = ({ featuredHeads = [] }) => {
    // Fallback indicator mapping to give clean labels to the landing page cards
    const departmentLabels = {
        governing: "Governing Lead",
        national: "National Director",
        medico: "Medico 360 Chief",
        nursing: "Nursing Care Lead",
        religious: "Religious Chair",
        events: "Events Director",
        technical: "Technical Lead"
    };

    return (
        /* Reduced padding tracking from py-24 down to balanced py-14 line */
        <section className="py-14 bg-white relative overflow-hidden reveal">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#4A1D12 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container-wide relative z-10">
                <div className="text-center mb-12">
                    <span className="text-golden font-bold tracking-widest uppercase text-[11px] mb-2 block">
                        Our Operational Core
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-primary">
                        Meet Our <span className="text-golden">Department Leads</span>
                    </h2>
                </div>

                {/* Grid cleanly auto-scales depending on how many heads are in D1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-0">
                    {featuredHeads.map((head, idx) => {
                        const label = departmentLabels[head.category?.toLowerCase()] || head.role;
                        
                        return (
                            <div key={idx} className="group relative mt-10 md:mt-8">
                                <div className="relative h-full bg-white rounded-2xl p-5 pt-12 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-150 overflow-visible flex flex-col justify-between">
                                    
                                    {/* Floating Avatar - Squeezed from w-32 to a sleek w-24 */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24">
                                        <div className="absolute inset-0 bg-golden/10 rounded-full blur-md group-hover:blur-lg transition-all duration-150" />
                                        <div className="relative w-full h-full rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-50">
                                            <Image
                                                src={head.image || "/api/assets/logo/logo-128.webp"}
                                                alt={head.name}
                                                fill
                                                className="object-cover transition-transform duration-150 group-hover:scale-105"
                                                sizes="96px"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center mt-3">
                                        <h3 className="text-base font-bold text-primary mb-0.5 line-clamp-1 group-hover:text-golden transition-colors duration-150">
                                            {head.name}
                                        </h3>
                                        <p className="text-[10px] font-bold text-secondary/80 uppercase tracking-wider mb-3">
                                            {label}
                                        </p>
                                        <div className="h-[1px] w-8 bg-gray-100 mb-3 mx-auto group-hover:w-1/2 group-hover:bg-golden transition-all duration-150" />
                                        <p className="text-xs text-text-light/90 leading-relaxed">
                                            Managing the specialized deployment vectors for the <span className="font-semibold text-primary">{head.category}</span> division.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ⚡ Full Team Hand-off Button */}
                <div className="text-center mt-12">
                    <Link href="/team" className="btn text-xs">
                        View Full Team Network →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Experts;

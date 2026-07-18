import React from "react";
import Image from "next/image";
import Link from "next/link";

const Experts = ({ featuredHeads = [] }) => {
    // ⚡ Normalized mapping to turn DB slugs into clean, dynamic department titles
    const departmentNames = {
        governing: "Governing Council",
        national: "National Operations",
        medico: "Medico 360",
        nursing: "Nursing Care Network",
        religious: "Religious Affairs",
        events: "Events & Management",
        technical: "Technical Engineering"
    };

    return (
        <section className="py-14 bg-white relative overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#4A1D12 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-golden font-bold tracking-widest uppercase text-[11px] mb-2 block">
                        Our Operational Core
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-primary font-[Outfit]">
                        Meet Our <span className="text-golden">Department Leads</span>
                    </h2>
                </div>

                {/* Grid cleanly auto-scales depending on how many heads are in D1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {featuredHeads.map((head, idx) => {
                        const cleanCategory = head.category?.toLowerCase() || "";
                        const deptName = departmentNames[cleanCategory] || head.category;
                        
                        // ⚡ Smart formatting: Converts a bare "Head" role into "Head of Technical Engineering" 
                        const displayRole = head.role?.toLowerCase() === "head" 
                            ? `Head of ${deptName}` 
                            : head.role;
                        
                        return (
                            <div key={idx} className="group relative">
                                <div className="relative h-full bg-white rounded-2xl p-5 pt-12 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
                                    
                                    {/* Floating Avatar */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24">
                                        <div className="absolute inset-0 bg-golden/10 rounded-full blur-md group-hover:blur-lg transition-all duration-200" />
                                        <div className="relative w-full h-full rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-50">
                                            <Image
                                                src={head.image || "/api/assets/logo/logo-128.webp"}
                                                alt={head.name}
                                                fill
                                                className="object-cover transition-transform duration-200 group-hover:scale-105"
                                                sizes="96px"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center mt-3 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-base font-bold text-primary mb-1 line-clamp-1 group-hover:text-golden transition-colors duration-150 font-[Outfit]">
                                                {head.name}
                                            </h3>
                                            <p className="text-[10px] font-extrabold text-golden uppercase tracking-wider mb-4">
                                                {displayRole}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <div className="h-[1px] w-8 bg-gray-100 mb-4 mx-auto group-hover:w-1/3 group-hover:bg-golden transition-all duration-200" />
                                            <p className="text-xs text-text-light/80 leading-relaxed font-light">
                                                Directing operational strategy, architecture, and core execution tracks within the <span className="font-medium text-primary">{deptName}</span> division.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Full Team Hand-off Button */}
                <div className="text-center mt-14">
                    <Link href="/team" className="btn text-xs px-8 py-3.5 inline-block">
                        View Full Team Network →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Experts;

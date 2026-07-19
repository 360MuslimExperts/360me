import React from "react";
import Image from "next/image";
import Link from "next/link";

const Experts = ({ featuredHeads = [] }) => {
    // Synchronized mapping aligning with your core structural pillars
    const departmentNames = {
        governing: "Governing Body",
        national: "National Team",
        medico: "360 Medico Forum",
        nursing: "360 Nurse Forum",
        religious: "360 Religious Forum",
        research: "360 Research Forum",
        technical: "Technical Department",
        media: "Media Department",
        hr: "Human Resources",
        finance: "Financial Department",
        growth: "Strategic Growth & PR"
    };

    // Sort weight engine ensuring strict hierarchical order: President -> Vice President -> Head -> Others
    const getRoleWeight = (roleStr) => {
        const role = (roleStr || "").toLowerCase();
        if (role.includes("president") && !role.includes("vice")) return 1;
        if (role.includes("vice president")) return 2;
        if (role.includes("deputy president")) return 2;
        if (role.includes("head") && !role.includes("deputy")) return 3;
        if (role.includes("deputy head")) return 4;
        return 5;
    };

    // Process, normalize roles, and sort data arrays safely inline
    const sortedLeads = [...featuredHeads]
        .map(lead => {
            const cleanCategory = lead.category?.toLowerCase() || "";
            const deptName = departmentNames[cleanCategory] || lead.category || "";
            let displayRole = lead.role || "";
            const lowerRole = displayRole.toLowerCase();

            // Smart formatting logic to clean role badges without word duplication
            if ((lowerRole === "head" || lowerRole === "deputy head") && deptName) {
                const titlePrefix = lowerRole === "head" ? "Head" : "Deputy Head";
                if (deptName.toLowerCase().includes("forum") || deptName.toLowerCase().includes("department") || deptName.includes("&")) {
                    displayRole = `${titlePrefix} of ${deptName}`;
                } else {
                    displayRole = `${titlePrefix} of ${deptName} Department`;
                }
            }

            return {
                ...lead,
                deptName,
                displayRole
            };
        })
        .sort((a, b) => getRoleWeight(a.role) - getRoleWeight(b.role));

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
                        Meet Our <span className="text-golden">Executive Leadership</span>
                    </h2>
                </div>

                {/* Grid cleanly auto-scales depending on how many leads are in data arrays */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {sortedLeads.map((lead, idx) => {
                        return (
                            <div key={lead.id || idx} className="group relative">
                                <div className="relative h-full bg-white rounded-2xl p-5 pt-12 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
                                    
                                    {/* Floating Avatar Container */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24">
                                        <div className="absolute inset-0 bg-golden/10 rounded-full blur-md group-hover:blur-lg transition-all duration-200" />
                                        <div className="relative w-full h-full rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-50">
                                            <Image
                                                src={lead.image || "/api/assets/logo/logo-256.webp"}
                                                alt={lead.name}
                                                fill
                                                unoptimized
                                                className="object-cover transition-transform duration-200 group-hover:scale-105"
                                                sizes="96px"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center mt-3 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-base font-bold text-primary mb-1 line-clamp-1 group-hover:text-golden transition-colors duration-150 font-[Outfit]">
                                                {lead.name}
                                            </h3>
                                            <p className="text-[10px] font-extrabold text-golden uppercase tracking-wider mb-4">
                                                {lead.displayRole}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <div className="h-[1px] w-8 bg-gray-100 mb-4 mx-auto group-hover:w-1/3 group-hover:bg-golden transition-all duration-200" />
                                            <p className="text-xs text-text-light/80 leading-relaxed font-light">
                                                Directing organizational strategy, architecture, and core execution tracks within the <span className="font-medium text-primary">{lead.deptName}</span> division.
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

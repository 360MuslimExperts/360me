import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaHandHoldingHeart, FaLeaf, FaGlobe } from "react-icons/fa6";

export default function DonatePage() {
    const causes = [
        {
            title: "Education & Skills",
            icon: <FaHandHoldingHeart className="text-3xl text-golden" />,
            description: "Empowering the next generation with modern skills aligned with Islamic values."
        },
        {
            title: "Global Initiatives",
            icon: <FaGlobe className="text-3xl text-golden" />,
            description: "Supporting community projects and humanitarian aid where it's needed most."
        },
        {
            title: "Sustainable Growth",
            icon: <FaLeaf className="text-3xl text-golden" />,
            description: "Building permanent infrastructure for education and community development."
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 selection:bg-golden/30">
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <section className="relative rounded-[3rem] overflow-hidden bg-primary p-12 md:p-24 text-white mb-24 shadow-2xl">
                    <Image
                        src="/donate_hero.png"
                        alt="Support 360ME"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                            Invest in the <span className="text-golden italic underline decoration-Wavy decoration-golden">Future</span> of the Ummah
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 mb-12 font-light leading-relaxed">
                            Your contribution fuels our mission to bridge the gap between tradition and innovation. Every seed you sow today builds a brighter tomorrow.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <button className="px-10 py-5 bg-golden text-primary font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-black/20">
                                Donate Now
                            </button>
                            <Link href="#causes" className="px-10 py-5 border-2 border-white/30 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Causes Grid */}
                <div id="causes" className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    {causes.map((cause, idx) => (
                        <div key={idx} className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-50 group">
                            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                                <div className="group-hover:scale-110 transition-transform">
                                    {cause.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-primary mb-6">{cause.title}</h3>
                            <p className="text-text-light/80 leading-relaxed font-light mb-8">
                                {cause.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Donation Options */}
                <section className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-gray-50 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-primary mb-12 tracking-tight">Support Our <span className="text-golden">Vision</span></h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
                        {["$10", "$50", "$100", "Custom"].map((amount) => (
                            <button key={amount} className="py-6 border-2 border-gray-100 rounded-2xl font-black text-xl text-primary hover:border-golden hover:text-golden hover:bg-golden/5 transition-all">
                                {amount}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-2xl mx-auto p-12 bg-background rounded-[3rem] border border-gray-100 italic text-text-light/60">
                        <FaHeart className="text-golden mx-auto mb-6 text-2xl" />
                        "The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills." (2:261)
                    </div>
                </section>
            </div>
        </div>
    );
}

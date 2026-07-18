import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Award, GraduationCap, ArrowUpRight } from 'lucide-react';
import { MotionDiv, MotionSection } from '@/components/MotionElements'; // Custom wrappers for client-side framer motion

export const runtime = 'edge';

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-background text-foreground">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 md:px-8 max-w-7xl mx-auto text-center pt-24 pb-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--color-primary-light)/0.15,transparent_70%)]" />
        
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-golden/10 text-golden border border-golden/20 mb-6">
          Global Academic & Spiritual Directory
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl text-balance leading-tight">
          Connecting the Ummah with Verified <span className="text-primary font-serif">Muslim Experts</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
          A premium, edge-optimized platform bridging classical Islamic scholarship with modern research, professional consulting, and academic excellence.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/directory" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            Explore Directory
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link 
            href="/journal" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-border bg-card/50 text-foreground font-medium hover:bg-card hover:border-foreground/20 transition-all duration-200 flex items-center justify-center"
          >
            Read Our Journal
          </Link>
        </div>
      </section>

      <hr className="border-border max-w-7xl mx-auto opacity-50" />

      {/* 2. CORE VALUE PILLARS */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose 360ME?</h2>
          <p className="mt-4 text-muted-foreground">Rigorous validation meets modern dynamic delivery at the edge.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
            <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="mt-6 text-xl font-bold">Background Verified</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Every expert undergoes a comprehensive cross-verification process regarding credentials, academic standing, and certifications.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-golden/40 transition-all duration-300 group">
            <div className="p-3 rounded-xl bg-golden/10 text-golden w-fit group-hover:scale-110 transition-transform duration-300">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="mt-6 text-xl font-bold">Multi-Disciplinary</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              From classical Shariah sciences and Islamic finance to modern bioethics, psychology, and academic research.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
            <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="mt-6 text-xl font-bold">Global Knowledge Base</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Access localized resources, multi-language publications (including Nastaleeq typography support), and research insights.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CALL TO ACTION FOR EXPERTS */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-[#063d27] text-white p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--color-golden),transparent)]" />
          
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Are you an expert in your field?</h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              Join a distinguished network of global scholars, industry leaders, and researchers. Provide authentic mentorship, review peer documents, and expand your digital footprint.
            </p>
            <div className="mt-8">
              <Link 
                href="/join" 
                className="inline-flex items-center px-6 py-3 rounded-xl bg-golden text-background font-semibold hover:bg-yellow-400 transition-colors duration-200 shadow-md"
              >
                Apply as an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

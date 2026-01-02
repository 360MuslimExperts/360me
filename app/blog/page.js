import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong, FaRegCalendar, FaChevronRight } from "react-icons/fa6";

export const revalidate = 60;

export default async function BlogPage() {
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    "excerpt": body[0...1],
    "author": author->name
  }`);

    return (
        <div className="min-h-screen bg-background pt-36 pb-24 selection:bg-golden/30">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="relative mb-24 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-golden/10 text-golden rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8">
                        <span className="w-2 h-2 bg-golden rounded-full animate-pulse"></span>
                        Latest Insights
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-primary mb-8 tracking-tight leading-[0.9]">
                        The <span className="text-golden italic">Expert</span> Journal
                    </h1>
                    <p className="text-text-light/80 text-xl max-w-3xl leading-relaxed font-light">
                        Deep dives into the intersection of technology, tradition, and the future of the Muslim Ummah.
                    </p>

                    {/* Breadcrumb-ish indicator */}
                    <div className="mt-12 flex items-center gap-3 text-xs font-bold text-text-light/40 uppercase tracking-widest">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <FaChevronRight className="scale-75" />
                        <span className="text-primary/60">Journal</span>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {posts.map((post, idx) => (
                        <article
                            key={post._id}
                            className={`group flex flex-col bg-white rounded-[3rem] overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(74,29,18,0.15)] ${idx === 0 ? 'md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-2 lg:gap-12 lg:h-[500px]' : ''}`}
                        >
                            {/* Media Container */}
                            <div className={`relative overflow-hidden bg-gray-100 ${idx === 0 ? 'h-[350px] lg:h-full' : 'h-80'}`}>
                                {post.mainImage ? (
                                    <Image
                                        src={urlFor(post.mainImage).url()}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                        <span className="text-primary/10 text-8xl font-black italic">360</span>
                                    </div>
                                )}

                                {/* Floating Date Tag */}
                                <div className="absolute top-8 right-8">
                                    <div className="w-16 h-16 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col items-center justify-center border border-white/20">
                                        <span className="text-primary font-black text-xl leading-none">
                                            {new Date(post.publishedAt).getDate()}
                                        </span>
                                        <span className="text-[10px] text-text-light font-black uppercase tracking-tighter">
                                            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short' })}
                                        </span>
                                    </div>
                                </div>

                                {/* Categories/Types */}
                                <div className="absolute bottom-8 left-8">
                                    <div className="px-5 py-2 bg-primary/95 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-full shadow-lg">
                                        Community
                                    </div>
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className={`p-10 flex flex-col justify-center ${idx === 0 ? 'lg:pr-16' : ''}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-[2px] bg-golden/50"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-golden">
                                        {post.author || "Muslim Expert"}
                                    </span>
                                </div>

                                <h2 className={`font-black text-primary group-hover:text-golden transition-colors leading-[1.1] mb-6 ${idx === 0 ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl'}`}>
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-text-light/70 text-lg leading-relaxed mb-10 line-clamp-3 font-light">
                                    Transforming the narrative of Islamic innovation through expertise and professional excellence.
                                </p>

                                <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-primary font-black text-xs tracking-[0.3em] flex items-center group/link uppercase overflow-hidden"
                                    >
                                        <span className="relative inline-block transition-transform duration-500 group-hover/link:-translate-y-full">
                                            Expand Story
                                            <span className="absolute top-full left-0 text-golden">Open Article</span>
                                        </span>
                                        <FaArrowRightLong className="ml-3 group-hover/link:translate-x-2 transition-transform duration-500 text-golden" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

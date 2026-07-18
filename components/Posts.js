"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { client, urlFor } from "@/lib/sanity";
import { SmartText } from "@/components/SmartText";

const Posts = () => {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPosts = async () => {
            const query = `*[_type == "post"] | order(publishedAt desc) [0..2] {
                _id,
                title,
                "slug": slug.current,
                publishedAt,
                mainImage,
            }`;
            const data = await client.fetch(query);
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) return (
        <div className="py-24 text-center text-primary font-bold">Loading insights...</div>
    );

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-golden font-bold tracking-widest uppercase text-sm mb-3 block"
                        >
                            Stay Informed
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-extrabold text-primary"
                        >
                            Recent <span className="text-golden">Articles</span> & Insights
                        </motion.h2>
                    </div>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                        <Link href="/blog" className="btn-outline group">
                            View All News
                            <FaArrowRightLong className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <motion.article
                            key={post._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                                {post.mainImage ? (
                                    <Image
                                        src={urlFor(post.mainImage).url()}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-all duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="text-primary/10 text-4xl font-bold italic">360ME</div>
                                )}
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-primary font-bold text-xs uppercase tracking-widest rounded-full shadow-sm">
                                        Article
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <span className="text-text-light text-xs font-semibold mb-3 uppercase tracking-wider">
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </span>
                                
                                <SmartText 
                                    as="h3" 
                                    className="text-2xl font-bold text-primary mb-4 line-clamp-2 group-hover:text-golden transition-colors"
                                >
                                    {post.title}
                                </SmartText>

                                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <Link href={`/blog/${post.slug}`} className="text-primary font-bold text-sm tracking-wide flex items-center group/link">
                                        Read More
                                        <FaArrowRightLong className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </Link>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                        <FaArrowRightLong className="rotate-[-45deg]" />
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Posts;

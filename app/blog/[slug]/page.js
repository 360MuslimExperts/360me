import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { SmartText } from '@/components/SmartText';
import { FaArrowLeftLong, FaRegCalendar, FaRegClock, FaShareNodes } from "react-icons/fa6";

export const runtime = 'edge';
export const revalidate = 60;

const isUrdu = (text) => /[\u0600-\u06FF]/.test(text);

const components = {
    types: {
        image: ({ value }) => (
            <figure className="my-12">
                <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200/50">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || "Article visualization"}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
                {value.caption && (
                    <figcaption className="mt-4 text-center text-sm text-text-light/60 italic font-medium">
                        {value.caption}
                    </figcaption>
                )}
            </figure>
        ),
    },
    block: {
        /**
         * Heading 1: Large display heading
         * SmartText handles font selection and RTL/LTR direction
         */
        h1: ({ children }) => (
            <SmartText 
    as="h1" 
    className="text-4xl md:text-6xl font-black text-primary leading-[1.3] mb-9 tracking-tight text-center"
>
    {post.title}
</SmartText>
        ),
        /**
         * Heading 2: Section heading with decorative underline
         * Increased line-height for Urdu/Arabic readability
         */
        h2: ({ children }) => (
            <SmartText as="h2" className="text-3xl md:text-4xl font-bold mt-12 mb-6 tracking-tight relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-golden after:rounded-full">
                {children}
            </SmartText>
        ),
        /**
         * Heading 3: Subsection heading
         */
        h3: ({ children }) => (
            <SmartText as="h3" className="text-2xl md:text-3xl font-bold mt-10 mb-5 tracking-tight">
                {children}
            </SmartText>
        ),
        /**
         * Normal paragraph: Body text with optimized line-height
         * Line-height is handled by SmartText based on language detection
         */
        normal: ({ children }) => (
            <SmartText as="p" className="text-xl md:text-2xl mb-8 font-light">
                {children}
            </SmartText>
        ),
        /**
         * Blockquote: Featured quote with golden accent bar
         * Extra spacing and larger text for emphasis
         */
        blockquote: ({ children }) => (
            <div className="my-12 relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-golden rounded-full opacity-50"></div>
                <SmartText as="blockquote" className="pl-10 pr-6 py-4 text-2xl not-italic md:text-3xl text-primary/80 font-medium">
                    &quot;{children}&quot;
                </SmartText>
            </div>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc list-outside ml-8 mb-10 space-y-4 text-text-light/90 text-lg md:text-xl font-light">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-outside ml-8 mb-10 space-y-4 text-text-light/90 text-lg md:text-xl font-light">{children}</ol>,
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
            return (
                <a href={value.href} rel={rel} className="text-golden font-bold underline decoration-2 underline-offset-4 hover:text-primary transition-colors">
                    {children}
                </a>
            );
        },
        strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
    }
};

/**
 * Generate dynamic metadata for SEO and social sharing
 * Compatible with edge runtime and Cloudflare Pages
 */
export async function generateMetadata({ params }) {
    const { slug } = await params;
    
    // Fetch post data for metadata
    const post = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0] {
            title,
            excerpt,
            mainImage,
            publishedAt
        }`,
        { slug }
    );

    // Fallback metadata if post not found
    if (!post) {
        return {
            title: 'Post Not Found | 360 Muslim Experts',
            description: 'The requested blog post could not be found.',
        };
    }

    // Extract metadata with fallbacks
    const title = post.title || 'Blog Post';
    const description = post.excerpt || `Read ${title} on 360 Muslim Experts - Insights on technology, ethics, and Islamic innovation.`;
    
    // Generate absolute URL for OG image
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://360me.pages.dev';
    const ogImage = post.mainImage 
        ? urlFor(post.mainImage).width(1200).height(630).url()
        : `${baseUrl}/logo-512.png`;

    return {
        title: `${title} | 360 Muslim Experts`,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: post.publishedAt,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function BlogPost({ params }) {

    const { slug } = await params;

    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    mainImage,
    body,
    "author": author->name,
    "authorImage": author->image,
    "relatedPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0..1] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      mainImage
    }
  }`, { slug });

    if (!post) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-primary mb-4">Post Not Found</h1>
                <Link href="/blog" className="btn-outline">Return to Insights</Link>
            </div>
        </div>
    );

    // Simple reading time estimate
    const wordCount = post.body ? JSON.stringify(post.body).split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / 200) || 1;

    return (
        <article className="min-h-screen bg-background pt-32 pb-24 selection:bg-golden/30">
            {/* Scroll Progress Bar - Optional enhancement */}

            <div className="max-w-4xl mx-auto px-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-primary font-bold mb-12 hover:text-secondary-color transition-all duration-300 group"
                >
                    <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center mr-4 group-hover:border-primary transition-colors">
                        <FaArrowLeftLong className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    Back to Insights
                </Link>

                <header className="mb-16">
                    <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-bold text-text-light/60 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <FaRegCalendar className="text-golden" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2 border-l border-gray-200 pl-6">
                            <FaRegClock className="text-golden" />
                            {readingTime} min read
                        </span>
                        <span className="px-5 py-2 bg-primary/5 text-primary text-[10px] font-black rounded-full ring-1 ring-primary/10">
                            Community Insight
                        </span>
                    </div>

                    <h1 className={`text-4xl md:text-6xl font-black text-primary leading-[1.05] mb-9 tracking-tight text-center ${isUrdu(post.title) ? 'rtl urdu text-3xl md:text-5xl' : ''}`}>
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between py-8 border-y border-gray-100 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center overflow-hidden">
                                {post.authorImage ? (
                                    <Image src={urlFor(post.authorImage).url()} alt={post.author} width={48} height={48} className="object-cover" />
                                ) : (
                                    <span className="text-primary font-black">360</span>
                                )}
                            </div>
                            <div>
                                <p className="text-xs text-text-light uppercase tracking-widest font-black">Written by</p>
                                <p className="text-primary font-bold">{post.author || "360ME Team"}</p>
                            </div>
                        </div>
                        <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                            <FaShareNodes />
                        </button>
                    </div>

                    {post.mainImage && (
                        <div className="relative w-full h-[450px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl mb-16 ring-1 ring-gray-100">
                            <Image
                                src={urlFor(post.mainImage).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    )}
                </header>

                <div className="prose prose-lg md:prose-xl max-w-none text-text-light/90 font-light">
                    <PortableText value={post.body} components={components} />
                </div>

                <section className="mt-24 p-10 md:p-16 bg-primary rounded-[3rem] text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-golden/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-golden/20 transition-colors"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-black mb-6">Enjoyed this article?</h3>
                        <p className="text-lg opacity-80 mb-10 max-w-xl">Join 360 Muslim Experts to stay updated with the latest in technology, ethics, and Islamic innovation.</p>
                        <Link href="/contact" className="px-10 py-5 bg-golden text-primary font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:scale-105 transition-all inline-block shadow-xl shadow-black/10">
                            Get in Touch
                        </Link>
                    </div>
                </section>

                {/* Related Posts */}
                {post.relatedPosts && post.relatedPosts.length > 0 && (
                    <section className="mt-24">
                        <h3 className="text-4xl font-black text-primary mb-12">More to Read</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {post.relatedPosts.map((related) => (
                                <Link key={related._id} href={`/blog/${related.slug}`} className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="flex flex-col h-full">
                                        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-100 mb-6">
                                            {related.mainImage ? (
                                                <Image
                                                    src={urlFor(related.mainImage).url()}
                                                    alt={related.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-primary/20 font-black text-2xl">360ME</div>
                                            )}
                                        </div>
                                        <h4 className={`text-xl font-bold text-primary mb-3 group-hover:text-golden transition-colors ${isUrdu(related.title) ? 'urdu' : ''}`}>
                                            {related.title}
                                        </h4>
                                        <span className="text-sm text-text-light/60 mt-auto font-bold uppercase tracking-widest">{new Date(related.publishedAt).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}

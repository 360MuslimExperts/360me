import Link from 'next/link';

export const runtime = "edge";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-golden/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <span className="text-4xl font-bold text-golden">!</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-black text-primary mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">Page Not Found</h2>
      <p className="text-text-light max-w-md mx-auto mb-10 text-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="btn">
        Return Home
      </Link>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an analytics service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl font-bold text-primary mb-4">Something went wrong!</h2>
            <p className="text-text-light mb-8 max-w-md">
                We apologize for the inconvenience. Our team has been notified.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="btn"
                >
                    Try again
                </button>
                <Link href="/" className="btn-outline">
                    Return Home
                </Link>
            </div>
        </div>
    );
}

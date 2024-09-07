'use client';

import Link from 'next/link';
import React from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-white px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">Error</h1>
      <p className="text-2xl mb-8 text-primary">Something went wrong!</p>
      <Link
        className="flex items-center space-x-2 p-3 bg-primary hover:bg-primary/90 text-white font-semibold transition-colors duration-200"
        href="/"
      >
        <span>Go back home</span>
      </Link>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-white px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p className="text-2xl mb-8 text-primary">Oops! The page you're looking for doesn't exist.</p>
      <Link
        className="flex items-center space-x-2 p-3 bg-primary hover:bg-primary/90 text-white font-semibold transition-colors duration-200"
        href="/"
      >
        <span>Go back home</span>
      </Link>
    </div>
  );
}

import Link from 'next/link';

export default function EmailVerifySuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 dark:bg-gray-800 w-full px-4">
      <div className="border-none rounded-full bg-gradient-to-r from-gray-700 to-indigo-900 p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-white text-2xl font-semibold mb-4">Email Verified Successfully!</h1>
          <p className="text-gray-300 mb-4">
            Your email has been verified. You can now log in to the app using your email and
            password.
          </p>
          <Link
            className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            href="/login"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

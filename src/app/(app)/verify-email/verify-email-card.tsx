'use client';

import SignOutButton from '@/components/signout-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function VerifyEmailCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">Please verify your email to access your account.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              Go to Home
            </Link>
            <SignOutButton className="text-sm text-gray-500 hover:text-gray-700" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import SignOutButton from '@/components/signout-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EmailVerifiedCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>You're verified</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">You're account is already verified.</p>
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

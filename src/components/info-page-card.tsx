'use client';

import SignOutButton from '@/components/signout-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

type InfoPageCardProps = {
  title: string;
  message: string;
};

export default function InfoPageCard({ title, message }: InfoPageCardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="flex flex-col items-center w-full max-w-md p-4">
        <CardHeader className="">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">{message}</p>
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

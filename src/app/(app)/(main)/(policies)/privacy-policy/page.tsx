import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <main className="flex flex-col items-center bg-slate-900 dark:bg-gray-800 min-h-screen p-6">
      <Card className="w-full max-w-4xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-3xl text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>
            Thank you for using our link shortener. Your privacy is important to us. This policy
            explains how we collect, use, and protect your information.
          </p>

          <h2 className="text-white text-2xl mt-4">Information We Collect</h2>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-semibold">Personal Information:</span> We may collect your name,
              email, and IP address when using our service.
            </li>
            <li>
              <span className="font-semibold">Link Data</span>: Links that you create, including
              short and original URLs.
            </li>
            <li>
              <span className="font-semibold">Usage Data</span>: Information about how you use our
              service, including clicks and statistics.
            </li>
          </ul>

          <h2 className="text-white text-2xl mt-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6">
            <li>To provide and maintain our service.</li>
            <li>To monitor usage and improve user experience.</li>
            <li>To contact you with updates or notifications, if necessary.</li>
          </ul>

          <h2 className="text-white text-2xl mt-4">Sharing Your Information</h2>
          <p>
            We do not share your personal information with third parties unless required by law or
            to protect our rights.
          </p>

          <h2 className="text-white text-2xl mt-4">Data Retention</h2>
          <p>
            We will retain your information only as long as necessary for the purposes set out in
            this Privacy Policy.
          </p>

          <h2 className="text-white text-2xl mt-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            <a href="mailto:support@klikr.app" className="text-gray-400 hover:underline">
              support@klikr.app
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

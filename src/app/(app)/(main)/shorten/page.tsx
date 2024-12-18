import ShortenUrlForm from './url-form';

export default async function ShortenPage() {
  return (
    <main className="flex items-center justify-center bg-slate-900 dark:bg-gray-800">
      <ShortenUrlForm />
    </main>
  );
}

import QrGeneratorForm from './generator-form';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="flex items-center justify-center bg-slate-900 dark:bg-gray-800">
      <QrGeneratorForm />
    </main>
  );
}

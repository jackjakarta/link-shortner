import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { getMaybeUserSession } from '@/utils/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getMaybeUserSession();

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <div className="sticky top-0 z-50">
        <Navbar user={session?.user} />
      </div>

      <div className="flex-grow" />
      {children}
      <div className="flex-grow" />

      <Footer />
    </div>
  );
}

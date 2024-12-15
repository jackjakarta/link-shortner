import Link from 'next/link';

export default function Footer() {
  const footerItems = [
    {
      title: 'API Docs',
      href: '/docs/api',
    },
    {
      title: 'Terms of Service',
      href: '/terms',
    },
    {
      title: 'Privacy Policy',
      href: '/privacy',
    },
  ];

  return (
    <footer className="bg-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto p-2 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {footerItems.map((item) => (
            <div key={item.title} className="px-5 py-2">
              <Link href={item.href} className="text-sm text-gray-200 hover:text-gray-400">
                {item.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}

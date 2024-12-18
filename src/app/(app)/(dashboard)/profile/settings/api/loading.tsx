import Spinner from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Spinner className="border-indigo-800 h-48 w-48" />
    </div>
  );
}

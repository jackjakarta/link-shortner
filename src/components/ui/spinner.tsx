import { cw } from '@/utils/tailwind';

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
  return <div className={cw('animate-spin rounded-full border-t-2 border-b-2', className)} />;
}

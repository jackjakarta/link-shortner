import { cw } from '@/utils/tailwind';
import Image from 'next/image';

type AvatarProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function Avatar({ src, alt, width, height, className }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={height ?? 40}
      height={width ?? 40}
      className={cw('rounded-full', className)}
    />
  );
}

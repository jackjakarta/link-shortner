'use client';

type InfoBarProps = {
  children: React.ReactNode;
  className?: string;
};

export default function InfoBar({ children, className }: InfoBarProps) {
  return <div className={className}>{children}</div>;
}

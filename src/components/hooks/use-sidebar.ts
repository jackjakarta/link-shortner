import React from 'react';

export function useSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  function handleLinkClick() {
    setIsOpen(false);
  }

  function handleClickOutside(event: MouseEvent) {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, sidebarRef, handleLinkClick };
}

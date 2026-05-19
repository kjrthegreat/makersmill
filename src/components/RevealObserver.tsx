'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('on');
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.rev, .rev-l, .rev-r').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

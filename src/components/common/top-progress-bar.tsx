'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function TopProgressBarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // When route (pathname or query params) changes, complete the progress bar
  useEffect(() => {
    setProgress(100);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 300);

    return () => clearTimeout(hideTimer);
  }, [pathname, searchParams]);

  // Intercept link clicks to trigger progress bar start
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    const clearAllTimers = () => {
      timers.forEach((t) => clearTimeout(t));
      timers = [];
    };

    const handleDocumentClick = (e: MouseEvent) => {
      // Defer check to next tick so event handler can call e.preventDefault()
      setTimeout(() => {
        if (e.defaultPrevented) {
          clearAllTimers();
          setIsVisible(false);
          setProgress(0);
          return;
        }

        const target = (e.target as HTMLElement).closest('a');
        if (!target) return;

        const href = target.getAttribute('href');
        if (!href) return;

        // Ignore external links, hash anchors, mailto, tel, target="_blank", or download links
        if (
          href.startsWith('http') ||
          href.startsWith('//') ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          target.target === '_blank' ||
          target.hasAttribute('download')
        ) {
          return;
        }

        // If clicking the current path with identical query params, ignore
        const currentUrl = window.location.pathname + window.location.search;
        if (href === currentUrl) return;

        clearAllTimers();
        setIsVisible(true);
        setProgress(25);

        timers.push(setTimeout(() => setProgress(50), 100));
        timers.push(setTimeout(() => setProgress(75), 300));
        timers.push(setTimeout(() => setProgress(90), 600));

        // Auto-cancel if stuck after 6 seconds
        timers.push(
          setTimeout(() => {
            setIsVisible(false);
            setProgress(0);
          }, 6000)
        );
      }, 0);
    };

    const handlePopState = () => {
      clearAllTimers();
      setIsVisible(true);
      setProgress(40);
    };

    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('popstate', handlePopState);

    return () => {
      clearAllTimers();
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[999999] pointer-events-none transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="h-full bg-gradient-to-r from-[#F36922] via-[#FF8A48] to-[#0A0A6E] shadow-[0_0_10px_rgba(243,105,34,0.7),0_0_5px_rgba(243,105,34,0.5)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          transitionProperty: 'width',
        }}
      />
    </div>
  );
}

export function TopProgressBar() {
  return (
    <Suspense fallback={null}>
      <TopProgressBarContent />
    </Suspense>
  );
}

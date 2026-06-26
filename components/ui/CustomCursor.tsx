'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only on devices with a fine pointer (skip touch)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    setEnabled(true);

    const ring = ringRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Reveal only once the pointer actually moves (avoids a stray ring
      // parked in the corner on load / when the cursor is off-window).
      ring.style.opacity = '1';

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [data-cursor="hover"], input, textarea, select, [role="button"]'
      );
      ring.dataset.hover = interactive ? 'true' : 'false';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      ring.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  // The native system cursor stays visible for orientation; this gold ring
  // trails it as a decorative accent and reacts to interactive elements.
  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-gold/70 opacity-0 transition-[width,height,background-color,border-color] duration-200"
        style={{ willChange: 'transform' }}
      />
      <style jsx global>{`
        .custom-cursor-ring[data-hover='true'] {
          width: 3rem;
          height: 3rem;
          background-color: rgba(196, 168, 130, 0.12);
          border-color: rgba(196, 168, 130, 0.95);
        }
      `}</style>
    </>
  );
}

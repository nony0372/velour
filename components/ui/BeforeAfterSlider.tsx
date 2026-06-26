'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider({
  before,
  after,
  alt = '',
  className = '',
}: {
  before: string;
  after: string;
  alt?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const stop = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div
      ref={containerRef}
      data-cursor="hover"
      className={`group relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-border ${className}`}
      onMouseDown={(e) => {
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        updateFromClientX(e.touches[0].clientX);
      }}
    >
      {/* After (base layer) */}
      <Image
        src={after}
        alt={`${alt} — после ремонта`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        draggable={false}
      />
      <span className="absolute right-4 top-4 z-10 rounded-full border border-gold/40 bg-bg/60 px-3 py-1 text-xs tracking-wide text-gold backdrop-blur">
        После
      </span>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full" style={{ width: containerRef.current?.offsetWidth ?? '100%' }}>
          <Image
            src={before}
            alt={`${alt} — до ремонта`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            draggable={false}
          />
        </div>
        <span className="absolute left-4 top-4 z-10 rounded-full border border-border bg-bg/60 px-3 py-1 text-xs tracking-wide text-text/80 backdrop-blur">
          До
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 z-20 h-full w-0.5 bg-gold"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-bg/90 text-gold shadow-lg transition-transform group-hover:scale-110">
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

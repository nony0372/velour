'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LETTERS = 'VELOUR'.split('');

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only on first load of the session
    if (sessionStorage.getItem('velour-loaded')) {
      setShow(false);
      return;
    }
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('velour-loaded', '1');
      document.body.style.overflow = '';
    }, 1900);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="overflow-hidden">
            <div className="flex">
              {LETTERS.map((l, i) => (
                <motion.span
                  key={i}
                  className="font-display text-5xl font-medium tracking-[0.15em] text-gold-gradient md:text-7xl"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.div
            className="mt-5 h-px bg-gold/50"
            initial={{ width: 0 }}
            animate={{ width: '180px' }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="mt-4 text-[11px] uppercase tracking-[0.35em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            Premium Construction
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { Reveal } from '@/components/ui/Reveal';
import { PROJECTS } from '@/lib/data';

export default function VideoCase() {
  const [open, setOpen] = useState(false);
  const project = PROJECTS[1]; // пентхаус 240

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <section className="py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Видео-кейс"
          title="Тур по реализованному объекту"
          description="Видео и интерактивное «до/после» — доверие, которого нет у конкурентов с обычной галереей."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Video preview */}
          <Reveal>
            <button
              onClick={() => setOpen(true)}
              data-cursor="hover"
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border"
              aria-label="Открыть видео-тур"
            >
              <Image
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=80"
                alt="Видео-тур по пентхаусу 240 м²"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-bg/40 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/20">
                <Play className="ml-1 h-7 w-7 fill-gold text-gold" />
              </span>
              <div className="absolute bottom-6 left-6 text-left">
                <p className="font-display text-2xl text-text">{project.title}</p>
                <p className="text-sm text-muted">
                  {project.area} м² · {project.city} · {project.duration}
                </p>
              </div>
            </button>
          </Reveal>

          {/* Before / After */}
          <Reveal delay={0.1}>
            <div>
              <BeforeAfterSlider
                before={project.before}
                after={project.after}
                alt={project.title}
              />
              <p className="mt-3 text-center text-sm text-muted">
                Перетащите ползунок — сравните «до» и «после»
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
                aria-label="Закрыть видео"
              >
                Закрыть <X className="h-5 w-5" />
              </button>
              <div className="aspect-video overflow-hidden rounded-2xl border border-border">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/kuo9BY2AF3g?autoplay=1&rel=0"
                  title="Видео-тур VELOUR"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

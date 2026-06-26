'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { RENO_TYPES, MATERIAL_TIERS } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

function formatTenge(n: number) {
  // Round to nearest 10 000 ₸ for a clean full-sum display
  const rounded = Math.round(n / 10000) * 10000;
  return rounded.toLocaleString('ru-RU');
}

export default function Calculator() {
  const [typeId, setTypeId] = useState<(typeof RENO_TYPES)[number]['id']>(RENO_TYPES[3].id);
  const [area, setArea] = useState(80);
  const [materialId, setMaterialId] = useState<(typeof MATERIAL_TIERS)[number]['id']>(
    MATERIAL_TIERS[1].id
  );

  const { low, high } = useMemo(() => {
    const type = RENO_TYPES.find((t) => t.id === typeId)!;
    const mat = MATERIAL_TIERS.find((m) => m.id === materialId)!;
    const base = type.perM2 * area * mat.mult;
    return { low: base * 0.9, high: base * 1.15 };
  }, [typeId, area, materialId]);

  const sliderPct = ((area - 20) / (300 - 20)) * 100;

  return (
    <section id="calculator" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Калькулятор"
          title="Узнайте стоимость за 30 секунд"
          description="Передвиньте параметры — результат обновится мгновенно. Это ориентир; точную смету мы зафиксируем в договоре."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-8 rounded-3xl border border-border bg-surface p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10">
            {/* Controls */}
            <div className="space-y-9">
              {/* Type */}
              <div>
                <label className="mb-3 block text-sm font-medium text-text/90">Тип ремонта</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {RENO_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTypeId(t.id)}
                      className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                        typeId === t.id
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-border text-text/75 hover:border-gold/40 hover:text-text'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area */}
              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label htmlFor="area" className="text-sm font-medium text-text/90">
                    Площадь
                  </label>
                  <span className="font-display text-2xl text-gold">{area} м²</span>
                </div>
                <input
                  id="area"
                  type="range"
                  min={20}
                  max={300}
                  step={5}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="velour-range w-full cursor-pointer"
                  style={{ '--pct': `${sliderPct}%` } as React.CSSProperties}
                />
                <div className="mt-2 flex justify-between text-xs text-muted">
                  <span>20 м²</span>
                  <span>300 м²</span>
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="mb-3 block text-sm font-medium text-text/90">Материалы</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {MATERIAL_TIERS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMaterialId(m.id)}
                      className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                        materialId === m.id
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-border text-text/75 hover:border-gold/40 hover:text-text'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-gold/20 bg-bg/60 p-7 gold-glow">
              <div>
                <span className="text-[13px] uppercase tracking-[0.2em] text-muted">
                  Предварительная стоимость
                </span>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-sm text-muted">от</span>
                  <motion.span
                    key={low}
                    initial={{ opacity: 0.4, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-4xl font-medium text-text md:text-5xl"
                  >
                    {formatTenge(low)}
                  </motion.span>
                </div>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-sm text-muted">до</span>
                  <motion.span
                    key={high}
                    initial={{ opacity: 0.4, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-4xl font-medium text-gold-gradient md:text-5xl"
                  >
                    {formatTenge(high)}
                  </motion.span>
                  <span className="pb-1 text-sm text-muted">₸</span>
                </div>
              </div>

              <div className="hairline" />

              <ul className="space-y-2 text-sm text-muted">
                <li>· Цена фиксируется в договоре</li>
                <li>· 3D-проект и замер — бесплатно</li>
                <li>· Оплата поэтапно, без аванса</li>
              </ul>

              <Button href="/reviews#form" variant="gold" withArrow className="w-full">
                Получить точную смету
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        .velour-range {
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            #c4a882 var(--pct, 50%),
            #2a2018 var(--pct, 50%)
          );
          outline: none;
        }
        .velour-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #c4a882;
          border: 3px solid #0c0a09;
          box-shadow: 0 0 0 1px #c4a882, 0 4px 14px -2px rgba(196, 168, 130, 0.6);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .velour-range::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .velour-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #c4a882;
          border: 3px solid #0c0a09;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}

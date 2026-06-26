import { Reveal } from './Reveal';

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="noise-overlay relative overflow-hidden border-b border-border pb-16 pt-40 md:pb-20 md:pt-48">
      <div className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(50%_60%_at_50%_0%,rgba(122,79,46,0.35),transparent)]" />
      <div className="container-site text-center">
        <Reveal>
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold/60" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-h1 font-medium leading-[1.06] text-text">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
            {description}
          </p>
        </Reveal>
      </div>
    </header>
  );
}

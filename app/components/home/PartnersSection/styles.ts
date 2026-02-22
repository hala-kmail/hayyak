/**
 * Style constants for PartnersSection component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const partnersStyles = {
  section: 'relative bg-white py-14 md:py-20 overflow-hidden',
  container: 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-10 md:mb-12',
  title: 'text-2xl md:text-3xl font-black text-navy-blue mb-2',
  accent: 'w-16 h-1 rounded-full mx-auto mb-4 opacity-80 bg-gold',
  description:
    'text-warm-grey text-base md:text-lg leading-relaxed max-w-2xl mx-auto',
  grid: 'grid gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-2',
  card:
    'relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
  cardInner: 'relative p-5 sm:p-6',
  topRow: 'flex items-center justify-between gap-3',
  logoBox: 'rounded-xl bg-white/90 border px-3 py-2 shrink-0',
  logoImg: 'block w-[92px] sm:w-[110px] h-auto object-contain',
  name: 'text-lg sm:text-xl font-extrabold tracking-tight',
  kicker: 'mt-1 text-xs font-semibold uppercase tracking-[0.18em]',
  block: 'mt-4',
  blockTitle: 'text-sm font-bold',
  blockText: 'mt-1.5 text-xs sm:text-sm leading-relaxed',
  statsRow: 'mt-4 grid grid-cols-2 gap-2.5',
  statBox: 'rounded-xl border bg-white/10 p-3.5',
  statValue: 'text-2xl sm:text-3xl font-extrabold leading-none',
  statLabel: 'mt-1.5 text-[11px] sm:text-xs font-semibold',
  actionsRow: 'mt-4 flex items-center justify-between gap-3',
  toggle:
    'inline-flex items-center gap-2 text-xs font-bold underline underline-offset-4 opacity-90 hover:opacity-100',
  cta: 'inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs font-bold border transition-colors',
  glow:
    'pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl opacity-30',
  glow2:
    'pointer-events-none absolute -left-28 -bottom-28 h-80 w-80 rounded-full blur-3xl opacity-25',
} as const;

/**
 * Style constants for HeroSection component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const heroStyles = {
  section: 'relative overflow-hidden bg-white border-b-[5px] border-white',
  container: 'relative h-[680px] md:h-[750px] w-full flex items-center overflow-hidden bg-gradient-to-br from-navy-blue via-gold to-gold',
  backgroundBlur1: 'ios-reduce-blur absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-navy-blue/30 rounded-full blur-[120px] animate-pulse-slow',
  backgroundBlur2: 'ios-reduce-blur absolute bottom-[-10%] left-[0%] w-[400px] h-[400px] bg-gold/40 rounded-full blur-[100px] animate-float',
  backgroundBlur3: 'ios-reduce-blur absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-blue/20 rounded-full blur-[150px] animate-pulse-slow',
  contentWrapper: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10',
  mainContent: 'flex flex-col lg:flex-row items-center justify-between gap-12',
  textContent: 'lg:w-3/5 text-center lg:text-right text-navy-blue w-full flex flex-col items-center lg:items-start',
  badge: 'ios-reduce-blur font-subhead text-sm md:text-base inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg px-5 py-2 rounded-2xl font-medium mb-8  shadow-xl shadow-black/5 animate-fade-in-up text-navy-blue',
  badgeIndicator: 'flex h-2 w-2 relative',
  badgePing: 'ios-reduce-animation animate-ping absolute inline-flex h-full w-full rounded-full bg-navy-blue opacity-75',
  badgeDot: 'relative inline-flex rounded-full h-2 w-2 bg-navy-blue',
  title: 'font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-none tracking-normal drop-shadow-md text-white',
  titleAccent: 'text-navy-blue',
  description: 'font-body text-body md:text-xl text-navy-blue/90 font-normal max-w-xl mb-10 leading-relaxed',
  ctaWrapper: 'flex flex-wrap gap-4 justify-center lg:justify-start',
  ctaButton: 'font-cta text-cta px-8 py-3 bg-white text-navy-blue rounded-xl font-normal hover:bg-navy-blue hover:text-white transition-all duration-300 shadow-xl shadow-black/15 hover:shadow-2xl flex items-center gap-3 group active:scale-[0.97] border-2 border-white/40',
  ctaIcon: 'w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300',
  visualContent: 'lg:w-2/5  lg:flex flex-col items-center justify-center gap-8',
  visualWrapper: 'relative group hidden lg:flex',
  visualContainer: 'relative w-80 h-80 flex items-center justify-center',
  visualBackdrop: 'ios-reduce-blur absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-2xl animate-float',
  visualCard: 'relative z-10 bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700 flex flex-col items-center',
  visualIcon: 'w-24 h-24 bg-gradient-to-tr from-navy-blue to-lime-green rounded-full flex items-center justify-center text-white text-5xl shadow-lg mb-4',
  visualStars: 'flex gap-1 text-gold mb-2',
  visualText: 'font-headline text-navy-blue font-bold text-lg',
  visualHeart: 'ios-reduce-animation absolute top-0 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-navy-blue text-2xl animate-float [animation-delay:1s] border border-gray-50',
  visualSparkle: 'ios-reduce-animation absolute -bottom-4 -left-2 w-20 h-20 bg-navy-blue text-white rounded-3xl shadow-xl flex items-center justify-center text-3xl animate-float [animation-delay:2s]',
  // Leading neighborhood – بطاقة الحي المتصدر التفاعلية
  leadingCard:
    'relative hidden lg:flex flex-col items-center w-full max-w-[320px] pt-10 animate-slide-in-right group/card',
  leadingCardTrophy:
    'ios-reduce-animation absolute -top-1 inset-x-0 mx-auto z-20 w-[76px] h-[76px] rounded-full bg-gradient-to-br from-gold via-gold to-sand-brown flex items-center justify-center shadow-[0_8px_30px_rgba(206,184,136,0.5)] animate-float border-[3px] border-white/80 group-hover/card:scale-110 transition-transform duration-500',
  leadingCardTrophyIcon: 'w-8 h-8 text-white drop-shadow-md',
  leadingCardTrophyRing:
    'ios-reduce-animation absolute inset-0 rounded-full border-2 border-gold/40 animate-glow-pulse pointer-events-none',
  leadingCardOuter:
    'relative w-full rounded-3xl p-[2px] bg-gradient-to-br from-gold/80 via-white/70 to-navy-blue/50 shadow-2xl hover:shadow-[0_20px_60px_rgba(206,184,136,0.35)] transition-all duration-500 hover:scale-[1.03] cursor-default',
  leadingCardShimmer:
    'absolute inset-0 rounded-3xl overflow-hidden pointer-events-none',
  leadingCardShimmerBar:
    'ios-reduce-animation absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer',
  leadingCardInner:
    'relative bg-gradient-to-b from-white via-white to-gold/[0.03] rounded-[22px] text-right overflow-hidden',
  leadingCardGlow:
    'ios-reduce-blur ios-reduce-animation absolute -top-10 -right-10 w-32 h-32 bg-gold/15 rounded-full blur-3xl animate-glow-pulse pointer-events-none',
  leadingCardContent: 'relative px-6 pt-12 pb-6',
  leadingCardBadgeText:
    'block text-center text-[11px] font-bold text-gold tracking-widest uppercase mb-3',
  leadingCardDivider:
    'h-px bg-gradient-to-l from-transparent via-gold/25 to-transparent mb-4',
  leadingCardName:
    'font-headline text-2xl font-black text-navy-blue leading-tight text-center group-hover/card:text-gold transition-colors duration-300',
  leadingCardStats: 'mt-6 flex items-stretch gap-3',
  leadingCardVotesBlock:
    'flex-1 flex flex-col items-center justify-center bg-navy-blue/[0.04] rounded-2xl py-4 px-3 border border-navy-blue/10 group-hover/card:border-gold/25 transition-colors duration-300',
  leadingCardVotesNumber:
    'font-black text-3xl text-navy-blue tabular-nums leading-none',
  leadingCardVotesLabel: 'text-[11px] font-medium text-warm-grey mt-1.5',
  leadingCardPercentBlock:
    'flex flex-col items-center justify-center bg-gradient-to-br from-gold/10 to-gold/[0.03] rounded-2xl py-4 px-4 min-w-[80px] border border-gold/15',
  leadingCardPercentNumber:
    'font-black text-3xl text-gold leading-none',
  leadingCardPercentSign: 'text-base font-bold text-gold/60',
  leadingCardPercentLabel: 'text-[11px] font-medium text-gold/70 mt-1.5',
  leadingCardCta:
    'mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-navy-blue to-navy-blue/90 text-white text-sm font-bold hover:from-gold hover:to-gold hover:text-navy-blue transition-all duration-300 shadow-lg hover:shadow-gold/25 active:scale-[0.97]',
  leadingCardCtaIcon: 'w-4 h-4 group-hover/card:-translate-x-1 transition-transform duration-300',
  waveContainer: 'absolute bottom-[-1px] left-0 w-full leading-[0] z-10',
  waveSvg: 'w-full h-auto',
} as const;

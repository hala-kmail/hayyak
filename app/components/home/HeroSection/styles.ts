/**
 * Style constants for HeroSection component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const heroStyles = {
  section: 'relative overflow-hidden bg-white border-b-[5px] border-white',
  container: 'relative h-[680px] md:h-[750px] w-full flex items-center overflow-hidden bg-gradient-to-br from-navy-blue via-gold to-gold',
  backgroundBlur1: 'absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-navy-blue/30 rounded-full blur-[120px] animate-pulse-slow',
  backgroundBlur2: 'absolute bottom-[-10%] left-[0%] w-[400px] h-[400px] bg-gold/40 rounded-full blur-[100px] animate-float',
  backgroundBlur3: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-blue/20 rounded-full blur-[150px] animate-pulse-slow',
  contentWrapper: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10',
  mainContent: 'flex flex-col lg:flex-row items-center justify-between gap-12',
  textContent: 'lg:w-3/5 text-center lg:text-right text-navy-blue w-full flex flex-col items-center lg:items-start',
  badge: 'font-subhead text-sm md:text-base inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg px-5 py-2 rounded-2xl font-medium mb-8  shadow-xl shadow-black/5 animate-fade-in-up text-navy-blue',
  badgeIndicator: 'flex h-2 w-2 relative',
  badgePing: 'animate-ping absolute inline-flex h-full w-full rounded-full bg-navy-blue opacity-75',
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
  visualBackdrop: 'absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-2xl animate-float',
  visualCard: 'relative z-10 bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700 flex flex-col items-center',
  visualIcon: 'w-24 h-24 bg-gradient-to-tr from-navy-blue to-lime-green rounded-full flex items-center justify-center text-white text-5xl shadow-lg mb-4',
  visualStars: 'flex gap-1 text-gold mb-2',
  visualText: 'font-headline text-navy-blue font-bold text-lg',
  visualHeart: 'absolute top-0 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-navy-blue text-2xl animate-float [animation-delay:1s] border border-gray-50',
  visualSparkle: 'absolute -bottom-4 -left-2 w-20 h-20 bg-navy-blue text-white rounded-3xl shadow-xl flex items-center justify-center text-3xl animate-float [animation-delay:2s]',
  // Leading neighborhood – تصميم أنيق بلمسة ذهبية
  leadingCard:
    'relative hidden lg:flex flex-col w-full max-w-[320px] rounded-2xl overflow-hidden animate-fade-in-up',
  leadingCardInner:
    'bg-white/95 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl text-right overflow-hidden',
  leadingCardAccent: 'absolute top-0 right-0 w-1.5 h-full min-h-[120px] bg-gradient-to-b from-gold via-gold to-navy-blue/80',
  leadingCardContent: 'relative pr-5 py-5 pl-4',
  leadingCardLabel:
    'inline-flex items-center gap-1.5 text-[11px] font-bold text-gold uppercase tracking-[0.2em] mb-2',
  leadingCardName: 'font-headline text-xl md:text-2xl font-black text-navy-blue leading-tight',
  leadingCardLocation: 'text-sm text-warm-grey/90 mt-0.5',
  leadingCardVotesWrap: 'mt-4 flex items-baseline gap-2',
  leadingCardVotesNumber: 'font-black text-2xl text-navy-blue tabular-nums',
  leadingCardVotesLabel: 'text-sm font-medium text-navy-blue/70',
  leadingCardProgress: 'mt-3',
  leadingCardProgressBar: 'h-1.5 rounded-full bg-navy-blue/15 overflow-hidden',
  leadingCardProgressFill: 'h-full rounded-full bg-gold transition-all duration-700',
  leadingCardProgressText: 'text-[11px] text-navy-blue/60 mt-1',
  waveContainer: 'absolute bottom-[-1px] left-0 w-full leading-[0] z-10',
  waveSvg: 'w-full h-auto',
} as const;

import { motion } from 'framer-motion'
import { SpotlightCard } from '../components/SpotlightCard'
import { TiltedCard } from '../components/TiltedCard'
import { ShinyText } from '../components/ShinyText'
import { GridMotion } from '../components/backgrounds/GridMotion'
import { Particles } from '../components/backgrounds/Particles'
import { useI18n } from '../i18n'

const SwordsIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m14.5 17.5 3 3 4-4-3-3" /><path d="m3 3 7.07 7.07" /><path d="m6 6 2 2" /><path d="m14.5 6.5 3-3 4 4-3 3" /><path d="M3 21l7.07-7.07" /><path d="m6 18 2-2" /></svg>)
const RefreshIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>)
const MapPinIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>)
const RouteIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></svg>)
const TimerIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>)
const CompassIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>)
const FlagIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>)

export function GameModes() {
  const { t } = useI18n()

  const MODES = [
    { num: '01', name: t.modeTouge, desc: t.modeTougeDesc, icon: <SwordsIcon />, accent: 'pink' as const },
    { num: '02', name: t.modeDrift, desc: t.modeDriftDesc, icon: <RefreshIcon />, accent: 'mid' as const },
    { num: '03', name: t.modeP2P, desc: t.modeP2PDesc, icon: <MapPinIcon />, accent: 'pink' as const },
    { num: '04', name: t.modeDistance, desc: t.modeDistanceDesc, icon: <RouteIcon />, accent: 'mid' as const },
    { num: '05', name: t.modeTime, desc: t.modeTimeDesc, icon: <TimerIcon />, accent: 'pink' as const },
    { num: '06', name: t.modeFree, desc: t.modeFreeDesc, icon: <CompassIcon />, accent: 'mid' as const },
  ]

  return (
    <section id="features" className="relative min-h-screen bg-bg-main overflow-hidden flex items-center py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-16 lg:px-20 scroll-mt-[110px]">
      <GridMotion className="opacity-30 sm:opacity-40 z-0" color="rgba(255, 159, 252, 0.1)" />
      <Particles className="opacity-60 sm:opacity-100 z-0" color="#FF9FFC" count={60} />
      <div className="absolute inset-0 z-1 bg-linear-to-b from-bg-main via-bg-main/92 sm:via-bg-main/90 to-bg-main pointer-events-none" />
      <div className="absolute top-1/4 left-[5%] sm:left-[10%] w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-pink-neon/8 rounded-full filter blur-[80px] sm:blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-[5%] sm:right-[10%] w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-mid/6 rounded-full filter blur-[80px] sm:blur-[120px] pointer-events-none z-1" />

      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start"
      >
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 text-left lg:sticky lg:top-28">
          <div>
            <p className="mb-2 sm:mb-3">
              <ShinyText text={t.modesKicker} className="text-[10px] sm:text-xs font-bold tracking-widest uppercase" />
            </p>
            <h2 className="text-text-main text-4xl sm:text-5xl md:text-6xl font-heading font-black italic uppercase leading-[0.9] tracking-tight">
              {t.modesTitle1}<br />{t.modesTitle2}
            </h2>
          </div>
          <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-md font-body">{t.modesDesc}</p>
          <div className="p-4 sm:p-5 rounded-2xl border border-pink-neon/25 bg-bg-main/80 backdrop-blur-sm max-w-sm neon-glow-pink">
            <span className="text-[10px] sm:text-xs font-bold text-pink-neon uppercase tracking-wider flex items-center gap-2 mb-2">
              <FlagIcon />
              {t.modesOpenWorld}
            </span>
            <span className="text-[11px] sm:text-xs text-text-muted leading-relaxed font-body block">{t.modesOpenWorldDesc}</span>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {MODES.map((mode) => (
            <TiltedCard key={mode.name} className="w-full">
              <SpotlightCard
                className={`p-4 sm:p-6 h-full liquid-glass border transition-all group rounded-xl sm:rounded-2xl ${mode.accent === 'pink' ? 'border-pink-neon/10 hover:border-pink-neon/25' : 'border-purple-mid/10 hover:border-purple-mid/25'
                  }`}
                spotlightColor={mode.accent === 'pink' ? 'rgba(255,159,252,0.12)' : 'rgba(192,132,252,0.12)'}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className={`shrink-0 group-hover:scale-110 transition-transform duration-300 ${mode.accent === 'pink' ? 'text-pink-neon' : 'text-purple-mid'}`}>{mode.icon}</span>
                    <h3 className="text-text-main text-base sm:text-xl font-heading font-black italic uppercase tracking-wide group-hover:text-pink-neon transition-colors duration-200 truncate">
                      {mode.name}
                    </h3>
                  </div>
                  <span className={`shrink-0 ml-2 text-[10px] font-mono font-bold opacity-40 ${mode.accent === 'pink' ? 'text-pink-neon' : 'text-purple-mid'}`}>{mode.num}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed font-body">{mode.desc}</p>
              </SpotlightCard>
            </TiltedCard>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

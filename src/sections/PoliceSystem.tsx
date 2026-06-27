import { motion } from 'framer-motion'
import { SpotlightCard } from '../components/SpotlightCard'
import { ShinyText } from '../components/ShinyText'
import { GridMotion } from '../components/backgrounds/GridMotion'
import { Particles } from '../components/backgrounds/Particles'
import { useI18n } from '../i18n'

const BarricadeIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="22" height="12" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /><line x1="6" y1="6" x2="6" y2="18" /><line x1="18" y1="6" x2="18" y2="18" /></svg>)
const CarIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" /><circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>)
const AlertTriangleIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>)
const ZapIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>)
const RadioIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" /><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" /><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" /></svg>)

export function PoliceSystem() {
  const { t } = useI18n()

  const THREATS = [
    { title: t.threatRoadblocks, desc: t.threatRoadblocksDesc, code: 'UNIT-B1', icon: <BarricadeIcon /> },
    { title: t.threatPit, desc: t.threatPitDesc, code: 'PIT-OP', icon: <CarIcon /> },
    { title: t.threatSpike, desc: t.threatSpikeDesc, code: 'SPIKE-SP', icon: <AlertTriangleIcon /> },
    { title: t.threatRam, desc: t.threatRamDesc, code: 'RAM-UNIT', icon: <ZapIcon /> },
    { title: t.threatHeli, desc: t.threatHeliDesc, code: 'AIR-SUP', icon: <RadioIcon /> },
  ]

  const topRow = THREATS.slice(0, 3)
  const bottomRow = THREATS.slice(3)

  return (
    <section id="police" className="relative min-h-screen bg-bg-main overflow-hidden flex items-center py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-16 lg:px-20 scroll-mt-[110px]">
      <GridMotion className="opacity-25 sm:opacity-35 z-0" color="rgba(239, 68, 68, 0.12)" lineCount={20} />
      <Particles className="opacity-40 sm:opacity-50 z-0" color="#EF4444" count={45} />
      <div className="absolute inset-0 z-1 bg-linear-to-b from-bg-main via-bg-main/92 sm:via-bg-main/90 to-bg-main pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[450px] md:w-[600px] h-64 sm:h-[450px] md:h-[600px] bg-police-red/6 rounded-full filter blur-[100px] sm:blur-[150px] pointer-events-none animate-pulse z-1" />

      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto w-full z-10 flex flex-col gap-10 sm:gap-14 md:gap-16"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6">
          <div className="text-left">
            <p className="mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-police-red scale-90 sm:scale-100 origin-left"><AlertTriangleIcon /></span>
              <ShinyText text={t.policeKicker} className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-police-red" />
            </p>
            <h2 className="text-text-main text-4xl sm:text-5xl md:text-6xl font-heading font-black italic uppercase leading-[0.9] tracking-tight">
              {t.policeTitle1}<br />{t.policeTitle2}
            </h2>
          </div>
          <div className="max-w-md text-left md:text-right">
            <p className="text-sm text-text-muted leading-relaxed font-body">{t.policeDesc}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {topRow.map((threat) => (
              <SpotlightCard
                key={threat.title}
                className="p-4 sm:p-6 liquid-glass border border-police-red/10 hover:border-police-red/30 transition-all rounded-xl sm:rounded-2xl flex flex-col justify-between h-full"
                spotlightColor="rgba(239, 68, 68, 0.1)"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <span className="text-police-red scale-90 sm:scale-100 origin-top-left">{threat.icon}</span>
                    <span className="text-[9px] font-bold text-police-red bg-deep-navy/80 border border-police-red/30 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">{threat.code}</span>
                  </div>
                  <h3 className="text-text-main text-base sm:text-lg font-heading font-black italic uppercase tracking-wide mb-2">{threat.title}</h3>
                  <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed font-body">{threat.desc}</p>
                </div>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-bold text-police-red uppercase tracking-widest">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-police-red animate-ping" />
                  <span>{t.policeActive}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto w-full">
            {bottomRow.map((threat) => (
              <SpotlightCard
                key={threat.title}
                className="p-4 sm:p-6 liquid-glass border border-police-red/10 hover:border-police-red/30 transition-all rounded-xl sm:rounded-2xl flex flex-col justify-between h-full"
                spotlightColor="rgba(239, 68, 68, 0.1)"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <span className="text-police-red scale-90 sm:scale-100 origin-top-left">{threat.icon}</span>
                    <span className="text-[9px] font-bold text-police-red bg-deep-navy/80 border border-police-red/30 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">{threat.code}</span>
                  </div>
                  <h3 className="text-text-main text-base sm:text-lg font-heading font-black italic uppercase tracking-wide mb-2">{threat.title}</h3>
                  <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed font-body">{threat.desc}</p>
                </div>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-bold text-police-red uppercase tracking-widest">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-police-red animate-ping" />
                  <span>{t.policeActive}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

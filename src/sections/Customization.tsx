import { motion } from 'framer-motion'
import { SpotlightCard } from '../components/SpotlightCard'
import { TiltedCard } from '../components/TiltedCard'
import { ShinyText } from '../components/ShinyText'
import { Aurora } from '../components/backgrounds/Aurora'
import { Particles } from '../components/backgrounds/Particles'
import { useI18n } from '../i18n'

export function Customization() {
  const { t } = useI18n()

  const FEATURES = [
    {
      title: t.customLiveryTitle,
      desc: t.customLiveryDesc,
      tags: t.customLiveryTags.split(','),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-pink-neon">
          <path d="M12 20a8 8 0 0 0 8-8 8 8 0 0 0-16 0c0 2.01.74 3.84 1.97 5.25L4 21h5l-.5-2.5A8 8 0 0 0 12 20Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: t.customLightsTitle,
      desc: t.customLightsDesc,
      tags: t.customLightsTags.split(','),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-purple-mid">
          <path d="M9 18h6" /><path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
        </svg>
      ),
    },
    {
      title: t.customTuningTitle,
      desc: t.customTuningDesc,
      tags: t.customTuningTags.split(','),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-pink-neon">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ]

  return (
    <section id="customization" className="relative min-h-screen bg-bg-main overflow-hidden flex items-center py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-16 lg:px-20 scroll-mt-[110px]">
      <Aurora className="opacity-40 sm:opacity-60 z-0" colors={['#FF9FFC', '#C084FC', '#FF9FFC']} />
      <Particles className="opacity-25 sm:opacity-35 z-0" color="#C084FC" count={35} />
      <div className="absolute inset-0 z-1 bg-linear-to-t from-bg-main via-bg-main/90 sm:via-bg-main/88 to-bg-main pointer-events-none" />
      <div className="absolute top-1/2 -left-16 sm:left-0 w-64 sm:w-[400px] md:w-[500px] h-64 sm:h-[400px] md:h-[500px] bg-pink-neon/8 rounded-full filter blur-[100px] sm:blur-[120px] pointer-events-none z-1" />

      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto w-full z-10 flex flex-col gap-10 sm:gap-14 md:gap-16"
      >
        <div className="text-center md:text-left">
          <p className="mb-2 sm:mb-3">
            <ShinyText text={t.customKicker} className="text-[10px] sm:text-xs font-bold tracking-widest uppercase" />
          </p>
          <h2 className="text-text-main text-4xl sm:text-5xl md:text-6xl font-heading font-black italic uppercase leading-[0.9] tracking-tight">
            {t.customTitle1}<br />{t.customTitle2}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FEATURES.map((feat) => (
            <TiltedCard key={feat.title} className="w-full">
              <SpotlightCard
                className="p-4 sm:p-6 h-full liquid-glass border border-pink-neon/12 hover:border-pink-neon/30 transition-all group rounded-xl sm:rounded-2xl flex flex-col justify-between"
                spotlightColor="rgba(255,159,252,0.12)"
              >
                <div>
                  <div className="flex justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl liquid-glass flex items-center justify-center border border-white/5 shrink-0">
                      {feat.icon}
                    </div>
                    <div className="flex gap-1 sm:gap-1.5 flex-wrap justify-end">
                      {feat.tags.map((tag) => (
                        <span key={tag} className="text-[8px] sm:text-[9px] font-bold text-text-muted px-1.5 sm:px-2 py-0.5 rounded-full uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-text-main text-xl sm:text-2xl font-heading font-black italic uppercase tracking-wider mb-2 sm:mb-3 group-hover:text-pink-neon transition-colors duration-200">
                    {feat.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed font-body">{feat.desc}</p>
                </div>

                <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-white/5 flex justify-between items-center text-[9px] sm:text-[10px] font-bold text-pink-neon/85 uppercase tracking-widest">
                </div>
              </SpotlightCard>
            </TiltedCard>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

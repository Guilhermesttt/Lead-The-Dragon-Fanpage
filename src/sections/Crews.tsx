import { motion } from 'framer-motion'
import { FadingVideo } from '../components/FadingVideo'
import { TiltedCard } from '../components/TiltedCard'
import { SpotlightCard } from '../components/SpotlightCard'
import { ShinyText } from '../components/ShinyText'
import { useI18n } from '../i18n'
import LeadTeaser from '../assets/lead-the-dragon-teaser.mp4'

export function Crews() {
  const { t } = useI18n()

  const CREWS = [
    {
      title: t.crewAmericanTitle, body: t.crewAmericanBody, tags: t.crewAmericanTags.split(','), icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-pink-neon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      title: t.crewEuropeanTitle, body: t.crewEuropeanBody, tags: t.crewEuropeanTags.split(','), icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-pink-neon">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4l-2-2" />
        </svg>
      )
    },
    {
      title: t.crewJapaneseTitle, body: t.crewJapaneseBody, tags: t.crewJapaneseTags.split(','), icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-pink-neon">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
  ]

  return (
    <section id="crews" className="relative min-h-screen bg-bg-main overflow-hidden flex flex-col justify-center scroll-mt-[110px]">
      <FadingVideo src={LeadTeaser} className="absolute inset-0 w-full h-full object-cover z-0 opacity-30" />
      <div className="absolute inset-0 bg-linear-to-t from-bg-main via-bg-main/70 to-bg-main z-1" />

      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 px-8 md:px-16 lg:px-20 py-24 flex flex-col justify-between h-full min-h-screen"
      >
        <div>
          <p className="mb-4">
            <ShinyText text={t.crewsKicker} className="text-xs font-bold tracking-widest uppercase" />
          </p>
          <h2
            className="text-text-main text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.85] font-heading font-black italic uppercase select-none"
            style={{ letterSpacing: '-3px', filter: 'drop-shadow(0 0 25px rgba(255,159,252,0.4))' }}
          >
            {t.crewsTitle1}<br />{t.crewsTitle2}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {CREWS.map(({ title, body, tags, icon }) => (
            <TiltedCard key={title} className="w-full">
              <SpotlightCard
                className="w-full h-full liquid-glass flex flex-col p-6 border border-pink-neon/15 hover:border-pink-neon/40 neon-border-hover hover:shadow-[0_0_20px_rgba(255,159,252,0.15),inset_0_0_20px_rgba(255,159,252,0.05)] transition-all duration-300 group rounded-2xl"
                spotlightColor="rgba(255,159,252,0.15)"
              >
                <div className="flex items-start justify-between gap-4 z-10">
                  <div className="liquid-glass flex items-center justify-center shrink-0 border rounded-lg border-pink-neon/25 group-hover:scale-110 transition-transform duration-300" style={{ width: 44, height: 44, borderRadius: '0.75rem' }}>
                    {icon}
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5" style={{ maxWidth: '75%' }}>
                    {tags.map((tag) => (
                      <span key={tag} className="liquid-glass rounded-full px-2 py-0.5 text-[10px] font-semibold text-text-main/80 whitespace-nowrap border border-white/5">{tag}</span>
                    ))}
                  </div>
                </div>
                <div />
                <div className="mt-6 z-10">
                  <h3 className="text-text-main text-3xl font-heading font-black italic uppercase tracking-wider group-hover:text-pink-neon transition-colors duration-200">{title}</h3>
                  <p className="mt-3 text-sm text-text-main leading-relaxed font-body">{body}</p>
                </div>
              </SpotlightCard>
            </TiltedCard>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <div className="flex flex-col items-center gap-2 text-xs text-text-muted uppercase tracking-widest font-semibold">
            <span>{t.crewsScroll}</span>
            <div className="w-1.5 h-6 rounded-full bg-pink-neon/25 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-pink-neon rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

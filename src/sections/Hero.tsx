import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadingVideo } from '../components/FadingVideo'
import leadLogoFull from '../assets/Lead_Text_Logo.png'
import { SoundButton } from '../components/SoundButton'
import { SoundLink } from '../components/SoundButton'
import { useAudio } from '../audio/AudioProvider'
import { useI18n } from '../i18n'
import { NAV_ITEMS, useSectionNav } from '../hooks/useSectionNav'
import leadLogo from '../assets/Lead The Dragon Transparent.png'
import LeadTrailer from '../assets/Lead-Police.mp4'

const fadeUp = (delay: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
})

const fadeUpLogo = {
  initial: { filter: 'blur(12px)', opacity: 0, y: 60 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 1.0, ease: 'easeOut' as const, delay: 0.5 },
}

function ArrowUpRight({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export function Hero() {
  const { t, lang, toggle } = useI18n()
  const { playClick } = useAudio()
  const { activeSection, scrollToSection } = useSectionNav()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

useEffect(() => {

  const raf = requestAnimationFrame(() => setMounted(true))
  return () => cancelAnimationFrame(raf)
}, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault()
    scrollToSection(href, id)
    setMobileOpen(false)
  }

  return (
    <section id="home" className="relative h-screen bg-bg-main overflow-hidden flex flex-col scroll-mt-[110px]">
     <FadingVideo
  src={LeadTrailer}
  className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
/>
      <div
        className="absolute inset-0 z-1"
        style={{
          background: 'linear-gradient(180deg, rgba(7,6,15,0.95) 20%, rgba(7,6,15,0.80) 40%, rgba(7,6,15,1) 100%)',
        }}
      />

      <nav className="fixed top-4 left-0 right-0 px-6 lg:px-16 z-9999 flex items-center justify-between">
        <div className=" w-20 h-20 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
          <img src={leadLogo} alt="Lead The Dragon" className="w-full h-full object-cover" />
        </div>

        <div className="hidden lg:flex liquid-glass rounded-full px-1.5 py-1.5 items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href
            return (
              <SoundLink
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`px-4 py-2 text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-all duration-300 rounded-full border border-transparent ${isActive
                  ? 'liquid-glass-strong text-pink-neon neon-border'
                  : 'text-white/70 hover:text-pink-neon neon-border-hover'
                  }`}
              >
                {t[item.key]}
              </SoundLink>
            )
          })}
          <SoundLink
            href="https://store.steampowered.com/app/3836490/Lead_The_Dragon/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 bg-pink-neon text-bg-main hover:bg-pink-neon/85 rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all neon-glow-pink uppercase tracking-wider"
          >
            {t.navSteam}
            <ArrowUpRight size={14} />
          </SoundLink>
        </div>

        <div className="flex items-center gap-2">
          <SoundButton
            onClick={toggle}
            className="liquid-glass h-11 rounded-full px-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-pink-neon neon-border-hover transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
            </svg>
            {lang === 'en' ? 'PT' : 'EN'}
          </SoundButton>

          <SoundLink
            href="https://x.com/LeadTheDragon"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex w-11 h-11 rounded-full liquid-glass items-center justify-center shrink-0 text-white/70 hover:text-pink-neon neon-border-hover transition-all"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </SoundLink>

          <SoundButton
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden liquid-glass h-11 w-11 rounded-full flex items-center justify-center text-white/80 hover:text-pink-neon neon-border-hover transition-colors"
            aria-label={mobileOpen ? t.navClose : t.navMenu}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </SoundButton>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { filter: 'blur(0px)', opacity: 1, y: 0 } : false}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9998 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => { playClick(); setMobileOpen(false) }} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 bottom-0 w-[min(100%,320px)] liquid-glass-strong border-l border-pink-neon/20 p-8 pt-24 flex flex-col gap-2"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <SoundLink
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className={`block px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${activeSection === item.href ? 'text-pink-neon bg-pink-neon/10 border border-pink-neon/30' : 'text-white/80 hover:text-pink-neon'
                      }`}
                  >
                    {t[item.key]}
                  </SoundLink>
                </motion.div>
              ))}
              <SoundLink
                href="https://store.steampowered.com/app/3836490/Lead_The_Dragon/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-pink-neon text-bg-main rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 neon-glow-pink"
              >
                {t.navSteam}
                <ArrowUpRight size={14} />
              </SoundLink>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full justify-center">
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">
          <motion.div {...fadeUp(0.4)} className="liquid-glass rounded-full flex items-center gap-2 pr-3 mb-6">
            <span className="bg-pink-neon text-bg-main rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">Q4 2026</span>
            <span className="text-xs text-text-main/80 pr-1 font-medium">{t.heroBadge}</span>
          </motion.div>

          <motion.img
  {...fadeUpLogo}
  src={leadLogoFull}
  alt="Lead The Dragon"
  className="select-none w-full max-w-[min(700px,90vw)] mt-10"
  style={{
    filter: 'drop-shadow(0 0 40px rgba(255, 159, 252, 0.65)) drop-shadow(0 0 80px rgba(255, 159, 252, 0.25))',
  }}
/>

          <motion.p {...fadeUp(0.8)} className="mt-10 text-sm md:text-base text-text-main max-w-xl leading-relaxed">
            {t.heroSub}
          </motion.p>

          <motion.div {...fadeUp(1.1)} className="flex flex-wrap justify-center items-center gap-5 mt-8">
            <SoundLink
              href="https://www.youtube.com/watch?v=Har72JdTJ90"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-bold text-white flex items-center gap-2 hover:text-pink-neon transition-all neon-glow-pink border border-pink-neon/25 uppercase tracking-wider"
            >
              {t.heroTrailer}
              <ArrowUpRight size={16} />
            </SoundLink>
            <SoundLink
              href="https://discord.gg/3YbRzPNcRa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-main/80 hover:text-pink-neon flex items-center gap-2 text-sm font-semibold transition-colors uppercase tracking-wider"
            >
              {t.heroDiscord}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
              </svg>
            </SoundLink>
          </motion.div>

          <motion.div {...fadeUp(1.3)} className="flex items-stretch gap-4 mt-10">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-pink-neon drop-shadow-[0_0_8px_rgba(255,159,252,0.5)]">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
                value: t.heroStatPlatform,
                label: t.heroStatPlatformLabel,
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-purple-mid drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                ),
                value: t.heroStatCrews,
                label: t.heroStatCrewsLabel,
              },
            ].map(({ icon, value, label }) => (
              <div
                key={value}
                className="liquid-glass p-4 flex flex-col justify-between neon-border-hover"
                style={{ width: 200, borderRadius: '1rem', minHeight: 120 }}
              >
                <div className="flex justify-between items-start">
                  {icon}
                  <span className="text-[9px] text-pink-neon font-bold tracking-wider uppercase">LEAD</span>
                </div>
                <div className="text-left mt-2">
                  <div className="text-xl text-text-main font-heading font-black italic uppercase tracking-wider">{value}</div>
                  <div className="text-[10px] text-text-muted mt-1 font-body">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div {...fadeUp(1.4)} className="flex flex-col items-center gap-3 pb-6">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-[10px] font-bold text-pink-neon/80 border border-pink-neon/15 uppercase tracking-[0.2em]">
            {t.heroTag}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-text-muted text-[10px] font-semibold uppercase tracking-wider">
            <span>{t.heroAttr1}</span>
            <span className="w-1 h-1 rounded-full bg-pink-neon/50" />
            <span>{t.heroAttr2}</span>
            <span className="w-1 h-1 rounded-full bg-pink-neon/50" />
            <span>{t.heroAttr3}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

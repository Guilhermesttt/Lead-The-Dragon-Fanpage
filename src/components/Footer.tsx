import { useI18n } from '../i18n'
import { SoundLink } from './SoundButton'
import leadLogo from '../assets/Lead The Dragon Logo.jpg'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="relative bg-bg-main border-t border-pink-neon/10 py-16 px-6 lg:px-16 overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-neon/6 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-pink-neon/8 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center overflow-hidden neon-glow-pink">
              <img src={leadLogo} alt="Lead The Dragon" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-text-main text-2xl font-heading font-black italic uppercase tracking-wider">LEAD THE DRAGON</h3>
              <p className="text-xs text-text-muted font-medium tracking-wide">BY 3 LAPZ</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <SoundLink
              href="https://store.steampowered.com/app/3836490/Lead_The_Dragon/"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass px-4 py-2.5 rounded-xl text-xs font-bold text-white/90 hover:text-pink-neon neon-border-hover transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
              {t.footerSteam}
            </SoundLink>
            <SoundLink
              href="https://discord.gg/3YbRzPNcRa"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass px-4 py-2.5 rounded-xl text-xs font-bold text-white/90 hover:text-pink-neon neon-border-hover transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
              </svg>
              {t.footerDiscord}
            </SoundLink>
            <SoundLink
              href="https://x.com/LeadTheDragon"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass px-4 py-2.5 rounded-xl text-xs font-bold text-white/90 hover:text-pink-neon neon-border-hover transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
              {t.footerTwitter}
            </SoundLink>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-text-muted text-[11px] font-medium leading-relaxed">
          <div className="flex flex-col gap-1">
            <span>{t.footerCopyright} <span className="text-white/80 font-bold">3 Lapz</span></span>
            <span className="text-[10px] text-text-muted/70">{t.footerLegal}</span>
          </div>
          <div className="text-left md:text-right text-[10px] italic max-w-sm">{t.footerInspiration}</div>
        </div>
      </div>
    </footer>
  )
}

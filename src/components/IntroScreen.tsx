import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../audio/AudioProvider'
import { useI18n } from '../i18n'
import leadLogo from '../assets/Lead The Dragon Logo.jpg'
import { AUDIO } from '../audio/paths'

type Phase = 'loading' | 'enter' | 'logo' | 'done'

const LOGO_HOLD_MS = 1800
const LOGO_FADE_MS = 900
const MIN_LOADING_MS = 2400
const LOADING_END_DELAY_MS = 600
const LOADING_FALLBACK_MS = 4800

function getEnterAt(startTime: number, assetsDoneAt: number | null) {
  if (!assetsDoneAt) return startTime + MIN_LOADING_MS + LOADING_END_DELAY_MS
  return Math.max(startTime + MIN_LOADING_MS, assetsDoneAt) + LOADING_END_DELAY_MS
}

export function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const { t } = useI18n()
  const { playEnter, startMusic, setIntroComplete } = useAudio()
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (phase !== 'loading') return

    const assets = [AUDIO.bgMusic, AUDIO.enter, AUDIO.click, leadLogo]
    const startTime = Date.now()
    let loaded = 0
    let assetsDoneAt: number | null = null
    let cancelled = false
    let advanceTimer: ReturnType<typeof setTimeout> | null = null
    let raf = 0

    const scheduleEnter = () => {
      if (advanceTimer) return
      const enterAt = getEnterAt(startTime, assetsDoneAt)
      advanceTimer = setTimeout(() => setPhase('enter'), Math.max(0, enterAt - Date.now()))
    }

    const tick = () => {
      if (cancelled) return

      const now = Date.now()
      const enterAt = getEnterAt(startTime, assetsDoneAt)
      const duration = enterAt - startTime
      const elapsed = now - startTime
      const raw = duration > 0 ? (elapsed / duration) * 100 : 0
      const capped = assetsDoneAt ? raw : Math.min(88, raw)
      setProgress(Math.min(100, Math.round(capped)))

      if (now < enterAt) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(100)
      }
    }

    raf = requestAnimationFrame(tick)

    const bump = () => {
      loaded += 1
      if (loaded >= assets.length && !assetsDoneAt) {
        assetsDoneAt = Date.now()
        scheduleEnter()
      }
    }

    assets.forEach((src) => {
      if (typeof src === 'string' && src.endsWith('.mp3')) {
        const audio = new Audio(src)
        audio.addEventListener('canplaythrough', bump, { once: true })
        audio.addEventListener('error', bump, { once: true })
        audio.load()
      } else {
        const img = new Image()
        img.onload = bump
        img.onerror = bump
        img.src = src as string
      }
    })

    const fallback = setTimeout(() => {
      if (!cancelled) {
        setProgress(100)
        setPhase('enter')
      }
    }, LOADING_FALLBACK_MS)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
      if (advanceTimer) clearTimeout(advanceTimer)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'logo') return

    const fadeTimer = setTimeout(() => {
      setPhase('done')
      setIntroComplete(true)
      startMusic()
      onComplete()
    }, LOGO_HOLD_MS + LOGO_FADE_MS)

    return () => clearTimeout(fadeTimer)
  }, [phase, onComplete, setIntroComplete, startMusic])

  const handleEnter = () => {
    playEnter()
    setPhase('logo')
  }

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-neon/10 rounded-full blur-[120px]" />
        </div>

        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-8 z-10"
            >
              <div className="w-56 h-1.5 rounded-full bg-[#2E1A47]/90 overflow-hidden border border-pink-neon/15">
                <div
                  className="h-full rounded-full transition-[width] duration-100 ease-linear"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #FF9FFC, #E879F9, #C084FC)',
                  }}
                />
              </div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">
                {t.introLoading} {progress}%
              </p>
            </motion.div>
          )}

          {phase === 'enter' && (
            <motion.div
              key="enter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 z-10"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] font-bold text-text-muted uppercase tracking-[0.35em]"
              >
                {t.introPressEnter}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnter}
                className="group relative px-12 py-4 rounded-full liquid-glass-strong text-text-main font-heading font-black italic text-2xl uppercase tracking-[0.2em] neon-border neon-glow-pink hover:scale-[1.02] transition-transform"
              >
                <span className="relative z-10">{t.introEnter}</span>
                <motion.span
                  className="absolute inset-0 rounded-full border border-pink-neon/30"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>
          )}

          {phase === 'logo' && (
            <motion.div
              key="logo"
              className="flex items-center justify-center z-10"
            >
              <motion.img
                src={leadLogo}
                alt="Lead The Dragon"
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.85, 1, 1, 1.05],
                  filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'],
                }}
                transition={{
                  duration: (LOGO_HOLD_MS + LOGO_FADE_MS) / 1000,
                  times: [0, 0.15, 0.75, 1],
                  ease: 'easeInOut',
                }}
                className="w-40 h-40 md:w-52 md:h-52 rounded-3xl object-cover shadow-[0_0_80px_rgba(255,159,252,0.35)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

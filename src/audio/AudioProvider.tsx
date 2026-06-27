import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AUDIO, TRACK_TITLE } from './paths'

const DEFAULT_VOLUME = 0.35

interface AudioContextType {
  trackTitle: string
  musicPlaying: boolean
  musicMuted: boolean
  musicVolume: number
  introComplete: boolean
  setIntroComplete: (v: boolean) => void
  playClick: () => void
  playHover: () => void
  playEnter: () => void
  startMusic: () => void
  toggleMusic: () => void
  setMusicVolume: (volume: number) => void
  withClick: <T extends (...args: unknown[]) => unknown>(fn: T) => (...args: Parameters<T>) => ReturnType<T>
}

const AudioContext = createContext<AudioContextType | null>(null)

function useAudioElement(src: string, loop = false) {
  const ref = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audio.preload = 'auto'
    audio.loop = loop
    ref.current = audio
    return () => {
      audio.pause()
      ref.current = null
    }
  }, [src, loop])

  return ref
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicMuted, setMusicMuted] = useState(false)
  const [musicVolume, setMusicVolumeState] = useState(DEFAULT_VOLUME)

  const musicRef = useAudioElement(AUDIO.bgMusic, true)
  const clickRef = useAudioElement(AUDIO.click)
  const hoverRef = useAudioElement(AUDIO.hover)
  const enterRef = useAudioElement(AUDIO.enter)

  useEffect(() => {
    if (clickRef.current) clickRef.current.volume = 0.5
    if (hoverRef.current) hoverRef.current.volume = 0.25
    if (enterRef.current) enterRef.current.volume = 0.7
  }, [clickRef, hoverRef, enterRef])

  useEffect(() => {
    const audio = musicRef.current
    if (!audio) return
    audio.volume = musicMuted ? 0 : musicVolume
  }, [musicRef, musicVolume, musicMuted])

  const playSafe = useCallback((ref: React.RefObject<HTMLAudioElement | null>) => {
    const audio = ref.current
    if (!audio) return
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [])

  const playClick = useCallback(() => playSafe(clickRef), [playSafe, clickRef])
  const playHover = useCallback(() => playSafe(hoverRef), [playSafe, hoverRef])
  const playEnter = useCallback(() => playSafe(enterRef), [playSafe, enterRef])

  const startMusic = useCallback(() => {
    const audio = musicRef.current
    if (!audio) return
    audio.volume = musicMuted ? 0 : musicVolume
    audio.play()
      .then(() => setMusicPlaying(true))
      .catch(() => {})
  }, [musicRef, musicMuted, musicVolume])

  const setMusicVolume = useCallback((volume: number) => {
    const clamped = Math.max(0, Math.min(1, volume))
    setMusicVolumeState(clamped)
    if (clamped === 0) {
      setMusicMuted(true)
    } else {
      setMusicMuted(false)
      if (musicRef.current) musicRef.current.volume = clamped
    }
  }, [musicRef])

  const toggleMusic = useCallback(() => {
    setMusicMuted((prev) => {
      const next = !prev
      const audio = musicRef.current
      if (audio) audio.volume = next ? 0 : musicVolume
      if (!next && audio?.paused) {
        audio.play().then(() => setMusicPlaying(true)).catch(() => {})
      }
      return next
    })
  }, [musicRef, musicVolume])

  const withClick = useCallback(
    <T extends (...args: unknown[]) => unknown>(fn: T) =>
      (...args: Parameters<T>) => {
        playClick()
        return fn(...args) as ReturnType<T>
      },
    [playClick],
  )

  return (
    <AudioContext.Provider
      value={{
        trackTitle: TRACK_TITLE,
        musicPlaying,
        musicMuted,
        musicVolume,
        introComplete,
        setIntroComplete,
        playClick,
        playHover,
        playEnter,
        startMusic,
        toggleMusic,
        setMusicVolume,
        withClick,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}

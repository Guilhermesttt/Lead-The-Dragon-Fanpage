import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { useAudio } from '../audio/AudioProvider'

type SoundButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  playHoverSound?: boolean
}

export function SoundButton({ onClick, onMouseEnter, playHoverSound = true, children, ...props }: SoundButtonProps) {
  const { playClick, playHover } = useAudio()

  return (
    <button
      {...props}
      onMouseEnter={(e) => {
        if (playHoverSound) playHover()
        onMouseEnter?.(e)
      }}
      onClick={(e) => {
        playClick()
        onClick?.(e)
      }}
    >
      {children}
    </button>
  )
}

type SoundLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  playHoverSound?: boolean
}

export function SoundLink({ onClick, onMouseEnter, playHoverSound = true, children, ...props }: SoundLinkProps) {
  const { playClick, playHover } = useAudio()

  return (
    <a
      {...props}
      onMouseEnter={(e) => {
        if (playHoverSound) playHover()
        onMouseEnter?.(e)
      }}
      onClick={(e) => {
        playClick()
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}

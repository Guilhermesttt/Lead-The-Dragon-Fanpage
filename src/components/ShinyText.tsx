interface ShinyTextProps {
  text: string
  className?: string
  speed?: string
}

export function ShinyText({ text, className = '', speed = '3s' }: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-linear-to-r from-white/30 via-white to-white/30 bg-size-[200%_auto] ${className}`}
      style={{
        animation: `shine ${speed} linear infinite`,
        backgroundImage: `linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.15) 100%)`,
        backgroundSize: '200% auto',
      }}
    >
      {text}
    </span>
  )
}

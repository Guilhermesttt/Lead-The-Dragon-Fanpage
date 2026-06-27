import { useEffect, useRef } from 'react'

interface GridMotionProps {
  className?: string
  color?: string
  lineCount?: number
}

export function GridMotion({ className = '', color = 'rgba(255, 159, 252, 0.12)', lineCount = 24 }: GridMotionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offsetRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let running = true

    const resize = () => {
      const dpr = devicePixelRatio
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      if (!running) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = color
      ctx.lineWidth = 1

      const mobile = window.matchMedia('(max-width: 639px)').matches
      const activeLineCount = mobile ? Math.max(10, Math.floor(lineCount * 0.55)) : lineCount

      offsetRef.current = (offsetRef.current + 0.4) % 40
      const spacing = w / activeLineCount

      for (let x = -spacing; x < w + spacing; x += spacing) {
        const skew = Math.sin((x + offsetRef.current) * 0.02) * 20
        ctx.beginPath()
        ctx.moveTo(x + skew, 0)
        ctx.lineTo(x - skew, h)
        ctx.stroke()
      }

      for (let y = 0; y < h; y += spacing * 0.6) {
        const wave = Math.sin((y + offsetRef.current) * 0.03) * 15
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y + wave)
        ctx.globalAlpha = 0.4
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(draw)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [color, lineCount])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}

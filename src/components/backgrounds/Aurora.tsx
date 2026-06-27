import { useEffect, useRef } from 'react'

interface AuroraProps {
  className?: string
  colors?: [string, string, string]
}

export function Aurora({
  className = '',
  colors = ['#FF9FFC', '#C084FC', '#FF9FFC'],
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t = 0
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
      t += 0.008
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 3; i++) {
        const grad = ctx.createRadialGradient(
          w * (0.3 + Math.sin(t + i * 2) * 0.2),
          h * (0.4 + Math.cos(t * 0.7 + i) * 0.15),
          0,
          w * 0.5,
          h * 0.5,
          w * 0.7,
        )
        grad.addColorStop(0, colors[i] + '55')
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      raf = requestAnimationFrame(draw)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) raf = requestAnimationFrame(draw)
    else {
      ctx.fillStyle = colors[0] + '22'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [colors])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none opacity-60 ${className}`}
      aria-hidden="true"
    />
  )
}

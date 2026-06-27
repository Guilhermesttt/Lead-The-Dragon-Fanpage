import { useRef, useEffect, useState } from 'react'

interface FuzzyTextProps {
  text: string
  baseIntensity?: number
  hoverIntensity?: number
  fuzzRange?: number
  fontSize?: string | number
  fontWeight?: string | number
  color?: string
  className?: string
  style?: React.CSSProperties
}

export function FuzzyText({
  text,
  baseIntensity = 0.08,
  hoverIntensity = 0.39,
  fuzzRange = 12,
  fontSize = '6rem',
  fontWeight = 900,
  color = '#FF9FFC',
  className = '',
  style = {},
}: FuzzyTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Create a virtual element to measure bounding box accurately
    const measureSpan = document.createElement('span')
    measureSpan.style.fontFamily = style.fontFamily || "'Barlow Condensed', sans-serif"
    measureSpan.style.fontSize = typeof fontSize === 'number' ? `${fontSize}px` : fontSize
    measureSpan.style.fontWeight = String(fontWeight)
    measureSpan.style.fontStyle = style.fontStyle || 'italic'
    measureSpan.style.position = 'absolute'
    measureSpan.style.visibility = 'hidden'
    measureSpan.style.whiteSpace = 'nowrap'
    measureSpan.textContent = text
    document.body.appendChild(measureSpan)

    const rect = measureSpan.getBoundingClientRect()
    const padding = fuzzRange * 2
    const width = Math.ceil(rect.width) + padding
    const height = Math.ceil(rect.height) + padding
    document.body.removeChild(measureSpan)

    canvas.width = width
    canvas.height = height

    let animationId: number

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const currentIntensity = isHovered ? hoverIntensity : baseIntensity

      ctx.font = `${style.fontStyle || 'italic'} ${fontWeight} ${fontSize} ${style.fontFamily || "'Barlow Condensed', sans-serif"}`
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'

      // We slice the text horizontally to simulate CRT/VHS horizontal sync fuzz!
      const slices = 30
      const sliceHeight = height / slices

      for (let s = 0; s < slices; s++) {
        const ySource = s * sliceHeight
        const offsetRange = currentIntensity * fuzzRange
        const offset = (Math.random() - 0.5) * offsetRange

        ctx.save()
        ctx.beginPath()
        ctx.rect(0, ySource, width, sliceHeight)
        ctx.clip()

        // Apply custom linear gradient if background matches our style
        if (typeof style.background === 'string' && style.background.includes('gradient')) {
          const gradient = ctx.createLinearGradient(0, 0, 0, height)
          gradient.addColorStop(0, '#FF9FFC')
          gradient.addColorStop(1, '#5227FF')
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = color
        }

        ctx.fillText(text, width / 2 + offset, height / 2)
        ctx.restore()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [text, baseIntensity, hoverIntensity, fuzzRange, fontSize, fontWeight, color, isHovered, style])

  return (
    <div
      className={`inline-block relative select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
      }}
    >
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto pointer-events-none"
      />
    </div>
  )
}

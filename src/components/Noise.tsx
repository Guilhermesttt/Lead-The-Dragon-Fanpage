import { useState, useEffect } from 'react'

interface NoiseProps {
  patternSize?: number
  patternAlpha?: number // 0 to 1
  patternRefreshInterval?: number // ms
  className?: string
}

export function Noise({
  patternSize = 128,
  patternAlpha = 0.08,
  patternRefreshInterval = 50, // ms
  className = '',
}: NoiseProps) {
  const [patterns, setPatterns] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const tempPatterns: string[] = []
    const canvas = document.createElement('canvas')
    canvas.width = patternSize
    canvas.height = patternSize
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Pre-generate 4 distinct frames of noise to cycle
    for (let frame = 0; frame < 4; frame++) {
      const imgData = ctx.createImageData(patternSize, patternSize)
      const data = imgData.data

      for (let i = 0; i < data.length; i += 4) {
        const val = Math.floor(Math.random() * 255)
        data[i] = val       // R
        data[i + 1] = val   // G
        data[i + 2] = val   // B
        data[i + 3] = Math.floor(patternAlpha * 255) // A
      }
      ctx.putImageData(imgData, 0, 0)
      tempPatterns.push(canvas.toDataURL())
    }

    setPatterns(tempPatterns)
  }, [patternSize, patternAlpha])

  useEffect(() => {
    if (patterns.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % patterns.length)
    }, patternRefreshInterval)

    return () => clearInterval(interval)
  }, [patterns, patternRefreshInterval])

  if (patterns.length === 0) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-9999 h-full w-full opacity-60 ${className}`}
      style={{
        backgroundImage: `url(${patterns[currentIndex]})`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'screen',
      }}
    />
  )
}

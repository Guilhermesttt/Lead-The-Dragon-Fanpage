import { useCallback, useEffect, useRef, useState } from 'react'

export const NAV_ITEMS = [
  { key: 'navHome', href: '#', id: 'home' },
  { key: 'navCrews', href: '#crews', id: 'crews' },
  { key: 'navModes', href: '#features', id: 'features' },
  { key: 'navPolice', href: '#police', id: 'police' },
  { key: 'navCustom', href: '#customization', id: 'customization' },
] as const

export const NAV_OFFSET = 110

function getSectionTop(id: string) {
  const el = document.getElementById(id)
  if (!el) return 0
  return el.getBoundingClientRect().top + window.scrollY
}

function resolveActiveSection() {
  const scrollPos = window.scrollY + NAV_OFFSET
  let active = '#'

  for (const { id, href } of NAV_ITEMS) {
    if (scrollPos >= getSectionTop(id) - 2) active = href
  }

  return active
}

export function useSectionNav() {
  const [activeSection, setActiveSection] = useState('#')
  const isNavigatingRef = useRef(false)
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const finishNavigation = useCallback(() => {
    isNavigatingRef.current = false
    setActiveSection(resolveActiveSection())
  }, [])

  const scrollToSection = useCallback((href: string, id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    isNavigatingRef.current = true
    setActiveSection(href)

    // Cancel any in-progress smooth scroll before starting a new one
    window.scrollTo({ top: window.scrollY, behavior: 'auto' })

    const top = Math.max(0, getSectionTop(id) - NAV_OFFSET)
    window.scrollTo({ top, behavior: 'smooth' })

    const newUrl =
      href === '#'
        ? `${window.location.pathname}${window.location.search}`
        : href
    window.history.replaceState(null, '', newUrl)

    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    scrollEndTimerRef.current = setTimeout(finishNavigation, 750)

    const onScrollEnd = () => {
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
      finishNavigation()
    }
    window.addEventListener('scrollend', onScrollEnd, { once: true })
  }, [finishNavigation])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (isNavigatingRef.current) return
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          setActiveSection(resolveActiveSection())
          ticking = false
        })
      }
    }

    setActiveSection(resolveActiveSection())
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    }
  }, [])

  return { activeSection, scrollToSection }
}

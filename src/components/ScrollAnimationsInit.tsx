'use client'

import { useEffect } from 'react'

export default function ScrollAnimationsInit() {
  useEffect(() => {
    let mounted = true

    async function init() {
      const AOS = (await import('aos')).default
      if (!mounted) return
      AOS.init({
        once: true,
        duration: 600,
        easing: 'ease-out-cubic',
      })
    }

    init().catch(err => console.error('AOS init failed', err))

    return () => {
      mounted = false
    }
  }, [])

  return null
}

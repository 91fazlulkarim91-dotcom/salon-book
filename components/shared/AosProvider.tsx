"use client"

import { useEffect } from "react"
import AOS from "aos"

export function AosProvider() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
        disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      })
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [])

  return null
}

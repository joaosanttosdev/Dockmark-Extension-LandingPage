'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  // O tema real é definido pelo script inline do layout antes da hidratação
  useEffect(() => setDark(document.documentElement.dataset.theme === 'dark'), [])

  function toggle() {
    const theme = dark ? 'light' : 'dark'
    setDark(!dark)
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'} title={dark ? 'Modo claro' : 'Modo escuro'}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={dark ? 'sun' : 'moon'} initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

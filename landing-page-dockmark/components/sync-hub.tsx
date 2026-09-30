'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const clouds = [
  { name: 'Google Drive', icon: '/images/clouds/google-drive.svg' },
  { name: 'Dropbox', icon: '/images/clouds/dropbox.svg' },
  { name: 'Nextcloud', icon: '/images/clouds/nextcloud.svg' },
]

const browsers = [
  { name: 'Chrome', icon: '/images/browsers/chrome.svg' },
  { name: 'Firefox', icon: '/images/browsers/firefox.svg' },
  { name: 'Brave', icon: '/images/browsers/brave.svg' },
]

type Box = { x: number; y: number; w: number; h: number }

// Posição relativa ao container, ignorando transforms (animações de entrada)
function box(el: HTMLElement, root: HTMLElement): Box {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

// Curva tracejada do bloco até a borda do círculo central
function connect(square: Box, item: Box, hub: Box) {
  const gap = 10
  const r = hub.w / 2
  const hx = hub.x + r
  const hy = hub.y + hub.h / 2
  const tx = square.x + square.w / 2
  const ty = square.y + square.h / 2
  if (square.x + square.w < hub.x || square.x > hub.x + hub.w) {
    const dir = tx < hx ? 1 : -1
    const sx = tx + dir * (square.w / 2 + gap)
    const ex = hx - dir * (r + gap)
    const ey = hy + (ty - hy) * 0.15
    const mx = (sx + ex) / 2
    return `M${sx} ${ty} C${mx} ${ty} ${mx} ${ey} ${ex} ${ey}`
  }
  // Layout vertical (celular): sai por baixo/cima do bloco, contando o rótulo
  const dir = ty < hy ? 1 : -1
  const sy = dir > 0 ? item.y + item.h + gap : item.y - gap
  const ey = hy - dir * (r + gap)
  const ex = hx + (tx - hx) * 0.15
  const my = (sy + ey) / 2
  return `M${tx} ${sy} C${tx} ${my} ${ex} ${my} ${ex} ${ey}`
}

export default function SyncHub() {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const squareRefs = useRef<(HTMLDivElement | null)[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState<string[]>([])

  useEffect(() => {
    const root = rootRef.current
    const hub = hubRef.current
    if (!root || !hub) return
    const update = () => {
      const hubBox = box(hub, root)
      setSize({ w: root.offsetWidth, h: root.offsetHeight })
      setPaths(squareRefs.current.map((square, i) => {
        const item = itemRefs.current[i]
        return square && item ? connect(box(square, root), box(item, root), hubBox) : ''
      }))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const tiles = (list: typeof clouds, offset: number, tone: 'cloud' | 'browser') => list.map((tile, i) => (
    <motion.div
      key={tile.name}
      ref={el => { itemRefs.current[offset + i] = el }}
      className={`hub-tile ${tone}`}
      initial={reduce ? false : { opacity: 0, x: tone === 'cloud' ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
    >
      <div className="hub-tile-box" ref={el => { squareRefs.current[offset + i] = el }}><img src={tile.icon} alt="" /></div>
      <span>{tile.name}</span>
    </motion.div>
  ))

  return (
    <div className="sync-hub">
      <div className="hub-diagram" ref={rootRef}>
        <svg className="hub-lines" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
          {paths.map((d, i) => d && <path key={i} d={d} className={i < clouds.length ? 'flow-in' : 'flow-out'} />)}
        </svg>
        <div className="hub-column">{tiles(clouds, 0, 'cloud')}</div>
        <div className="hub-center">
          <div className="hub" ref={hubRef}>
            <span className="hub-ring r1" /><span className="hub-ring r2" /><span className="hub-ring r3" /><span className="hub-ring r4" /><span className="hub-ripple" />
            <div className="hub-core"><img src="/images/gota.png" alt="Gota azul, mascote do Dockmark" /></div>
          </div>
          <strong className="hub-label">Dockmark</strong>
        </div>
        <div className="hub-column">{tiles(browsers, clouds.length, 'browser')}</div>
      </div>
      <p className="hub-caption"><strong>Chrome, Firefox, Brave e Edge</strong> — Safari em breve. Comece pelo Google Drive; mais nuvens chegam depois.</p>
    </div>
  )
}

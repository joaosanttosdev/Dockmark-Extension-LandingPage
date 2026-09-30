'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Cloud, FolderClosed, KeyRound, Link2, LockKeyhole, Plus, RefreshCw, ShieldCheck, Star } from 'lucide-react'

const integrations = [
  { name: 'Chrome', icon: '/images/browsers/chrome.svg' },
  { name: 'Firefox', icon: '/images/browsers/firefox.svg' },
  { name: 'Brave', icon: '/images/browsers/brave.svg' },
  { name: 'Edge', icon: '/images/browsers/edge.svg' },
]

export default function FeatureBento() {
  const reduce = useReducedMotion()
  const reveal = (delay: number) => reduce ? {} : {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  }

  return (
    <motion.div className="bento" {...reveal(0)}>
      <div className="bento-cell bento-browsers">
        <div className="bento-copy">
          <h3>Todos os seus navegadores, em minutos.</h3>
          <p>Instale o Dockmark no Chrome, Firefox, Brave e Edge e seus favoritos passam a viver em um só lugar.</p>
        </div>
        <div className="integration-list">
          <motion.div className="integration integration-new" {...reveal(0.15)}>
            <span className="integration-icon"><Plus size={16} /></span>
            Adicionar navegador
            <span className="integration-badge badge-new">Novo</span>
          </motion.div>
          {integrations.map((item, i) => (
            <motion.div className="integration" key={item.name} {...reveal(0.25 + i * 0.1)}>
              <span className="integration-icon"><img src={item.icon} alt="" /></span>
              {item.name}
              <span className="integration-badge">Ativo</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bento-cell bento-split">
        <div className="bento-copy">
          <h3>Criptografia ponta a ponta, sem esforço.</h3>
          <p>Seus favoritos são cifrados com AES-GCM antes de sair do dispositivo. Só você tem a chave.</p>
        </div>
        <div className="orbit-art" aria-hidden="true">
          <div className="orbit-ring outer" />
          <div className="orbit-ring inner" />
          <div className="orbit-spin">
            <span className="orbit-chip chip-a"><Star size={13} /></span>
            <span className="orbit-chip chip-b"><FolderClosed size={15} /></span>
            <span className="orbit-chip chip-c"><KeyRound size={17} /></span>
            <span className="orbit-chip chip-d"><Link2 size={13} /></span>
          </div>
          <div className="orbit-core"><LockKeyhole size={30} /></div>
          <span className="orbit-tag"><ShieldCheck size={13} /> AES-GCM</span>
        </div>
      </div>

      <div className="bento-cell bento-split">
        <div className="bento-copy">
          <h3>Na sua nuvem, sem lock-in.</h3>
          <p>Google Drive, WebDAV ou seu próprio servidor. Seus dados ficam onde você escolher.</p>
        </div>
        <div className="cloud-art" aria-hidden="true">
          <div className="cloud-halo" />
          <div className="cloud-line" />
          <div className="cloud-box"><Cloud size={46} strokeWidth={1.6} /></div>
          <span className="cloud-chip"><RefreshCw size={16} /></span>
        </div>
      </div>
    </motion.div>
  )
}

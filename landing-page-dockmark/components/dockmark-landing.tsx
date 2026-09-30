'use client'

import { FormEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Cloud, Download, GitBranch, LockKeyhole, Menu, Moon, ShieldCheck, Sparkles, Sun, X, Zap } from 'lucide-react'

const browsers = [
  { name: 'Chrome', mark: 'C', tone: 'bg-[#f2b8be] text-[#2e3138]' },
  { name: 'Firefox', mark: 'F', tone: 'bg-[#e8788a] text-white' },
  { name: 'Brave', mark: 'B', tone: 'bg-[#f1c9a6] text-[#2e3138]' },
  { name: 'Edge', mark: 'e', tone: 'bg-[#9fcabc] text-[#2e3138]' },
]

const faqs = [
  ['O Dockmark é gratuito?', 'Sim. O Dockmark é gratuito e open-source. Você pode usar a nuvem que preferir, sem taxas escondidas ou lock-in.'],
  ['Meus favoritos ficam privados?', 'Sempre. A sincronização usa criptografia ponta a ponta com AES-GCM antes de qualquer dado sair do seu dispositivo.'],
  ['Quais navegadores são compatíveis?', 'Chrome, Firefox, Brave e Edge desde o primeiro lançamento. O projeto foi pensado para adicionar mais navegadores com facilidade.'],
]

function Pingo({ small = false }: { small?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.img
      className={small ? 'pingo-image pingo-small' : 'pingo-image'}
      src="/images/gota.png"
      alt="Gota azul, mascote do Dockmark"
      animate={reduce ? {} : { y: [0, -12, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function ThemeToggle() {
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

// Entrada suave (fade + subida) quando o elemento aparece na tela
function useReveal() {
  const reduce = useReducedMotion()
  return (delay = 0, onMount = false) => reduce ? {} : {
    initial: { opacity: 0, y: 28 },
    [onMount ? 'animate' : 'whileInView']: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  const reveal = useReveal()
  return <motion.div className="section-intro" {...reveal()}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</motion.div>
}

export default function DockmarkLanding() {
  const [menu, setMenu] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const reveal = useReveal()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSent(true)
  }

  return (
    <main>
      <motion.nav className="nav-wrap" aria-label="Navegação principal" {...reveal(0, true)}>
        <a className="brand" href="#top" aria-label="Dockmark início"><span className="brand-dot" />dockmark</a>
        <div className={`nav-links ${menu ? 'is-open' : ''}`}>
          <a href="#como-funciona" onClick={() => setMenu(false)}>Como funciona</a><a href="#recursos" onClick={() => setMenu(false)}>Recursos</a><a href="#faq" onClick={() => setMenu(false)}>FAQ</a>
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="nav-cta" href="#espera">Entrar na espera <ArrowRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? 'Fechar menu' : 'Abrir menu'}>{menu ? <X /> : <Menu />}</button>
        </div>
      </motion.nav>

      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-copy"><motion.p className="eyebrow" {...reveal(0.1, true)}><span className="eyebrow-dot" /> favoritos, finalmente em casa</motion.p><motion.h1 {...reveal(0.2, true)}>Seus favoritos,<br /><em>em qualquer navegador.</em></motion.h1><motion.p className="hero-text" {...reveal(0.35, true)}>O Dockmark sincroniza seus favoritos onde quer que você navegue — com privacidade, simplicidade e um toque de leveza.</motion.p><motion.div {...reveal(0.5, true)}><a className="button button-primary" href="#espera">Entrar na lista de espera <ArrowRight size={18} /></a><p className="microcopy"><ShieldCheck size={14} /> Gratuito, open-source e feito com carinho.</p></motion.div></div>
        <motion.div className="hero-mascot" {...reveal(0.4, true)}><div className="halo" /><Pingo /><span className="float-label label-one">seus links</span><span className="float-label label-two">sempre com você</span></motion.div>
      </section>

      <section className="compat-section"><p>Funciona em todos</p><div className="browser-row">{browsers.map((browser, i) => <motion.div className="browser-pill" key={browser.name} {...reveal(i * 0.08)}><span className={`browser-mark ${browser.tone}`}>{browser.mark}</span>{browser.name}</motion.div>)}</div></section>

      <section className="section comparison"><SectionIntro eyebrow="a dor conhecida" title="Trocar de navegador não deveria apagar seu caminho." copy="Seus favoritos contam a história de como você navega. O Dockmark garante que ela continue com você." /><div className="compare-grid"><motion.div className="compare-card chaos" {...reveal()}><span className="card-number">01</span><h3>Antes do Dockmark</h3><div className="messy-links"><span>★ receitas-de-domingo</span><span>★ pesquisa-importante</span><span>★ aquele artigo</span><span>★ inspiração</span></div><p>Exportar. Baixar. Reimportar.<br />De novo. E de novo.</p></motion.div><motion.div className="compare-card calm" {...reveal(0.15)}><span className="card-number">02</span><h3>Com o Dockmark</h3><div className="sync-visual"><Pingo small /><div className="sync-line" /><Cloud size={32} /></div><p>Abra o navegador que quiser.<br /><strong>Seus favoritos já estão lá.</strong></p><span className="check-stamp"><Check size={14} /> tudo no lugar</span></motion.div></div></section>

      <section className="section steps-section" id="como-funciona"><SectionIntro eyebrow="sem complicação" title="Do seu navegador para a nuvem, em três passos." /><div className="steps-grid">{[['01','Instale','Adicione o Dockmark ao seu navegador favorito.'],['02','Conecte sua nuvem','Escolha onde seus favoritos vão morar.'],['03','Sincronize','Pronto. Eles acompanham você em todo lugar.']].map(([number, title, copy], i) => <motion.div className="step" key={number} {...reveal(i * 0.15)}><span className="step-number">{number}</span><div className="step-icon">{i === 0 ? <Download /> : i === 1 ? <Cloud /> : <Zap />}</div><h3>{title}</h3><p>{copy}</p>{i < 2 && <div className="step-beam" />}</motion.div>)}</div></section>

      <section className="section features-section" id="recursos"><SectionIntro eyebrow="feito para durar" title="Tudo que importa. Nada que atrapalha." /><div className="feature-grid"><motion.div className="feature-card feature-large" {...reveal()}><div className="feature-icon"><LockKeyhole /></div><h3>Criptografia ponta a ponta</h3><p>Seus favoritos são protegidos com AES-GCM antes de saírem do dispositivo. Só você tem a chave.</p><div className="lock-art"><div className="lock-ring" /><Pingo small /></div><span className="feature-tag">E2EE · AES-GCM</span></motion.div><motion.div className="feature-card" {...reveal(0.12)}><div className="feature-icon coral"><Sparkles /></div><h3>Multi-navegador</h3><p>Chrome, Firefox, Brave e Edge. Um lugar só para todos os seus caminhos.</p><div className="mini-browser-stack">{browsers.map(b => <span key={b.name} className={`browser-mark ${b.tone}`}>{b.mark}</span>)}</div></motion.div><motion.div className="feature-card feature-cloud" {...reveal(0.24)}><div className="feature-icon water"><Cloud /></div><h3>Zero lock-in</h3><p>Seus dados na sua nuvem. Google Drive, WebDAV e mais — você escolhe.</p><div className="cloud-words"><span>Google Drive</span><span>WebDAV</span><span>+ seu servidor</span></div></motion.div></div></section>

      <section className="section demo-section"><SectionIntro eyebrow="veja em ação" title="Seu novo lugar favorito." /><motion.div className="browser-window" {...reveal(0.1)}><div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>dockmark · favoritos</span><div className="window-profile">D</div></div><div className="window-body"><div className="sidebar"><div className="mini-brand"><span className="brand-dot" /> dockmark</div><span className="side-active">Todos os favoritos <b>24</b></span><span>Recentes</span><span>Pastas</span><span>Configurações</span></div><div className="bookmark-content"><div className="content-head"><div><p className="tiny-label">seus favoritos</p><h3>Olá, Ana.</h3></div><span className="synced"><Check size={13} /> sincronizado</span></div><div className="bookmark-list">{['Inspiração para o próximo projeto','Receita de pão de fermentação natural','Como criar hábitos que duram'].map((text, i) => <motion.div className="bookmark" key={text} {...reveal(0.3 + i * 0.12)}><span className="bookmark-star">★</span><div><strong>{text}</strong><small>{['are.na · há 2 min','cozinhando.com · há 1 h','slowgrowth.co · ontem'][i]}</small></div><span>•••</span></motion.div>)}</div></div></div></motion.div></section>

      <section className="section faq-section" id="faq"><SectionIntro eyebrow="ainda curioso?" title="Perguntas frequentes." /><div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span>{question}</span><span className="faq-plus">{openFaq === i ? '−' : '+'}</span></button><AnimatePresence initial={false}>{openFaq === i && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div></section>

      <motion.section className="signup-section" id="espera" {...reveal()}><div className="signup-mascot"><Pingo small /></div><div className="signup-copy"><p className="eyebrow">fique por perto</p><h2>Seus favoritos<br /><em>estão quase em casa.</em></h2><p>Entre na lista e seja uma das primeiras pessoas a experimentar o Dockmark.</p></div>{sent ? <div className="success-message"><Check size={22} /><strong>Você está na lista!</strong><span>Avisaremos quando o Dockmark estiver pronto.</span></div> : <form className="signup-form" onSubmit={submit} action="[ENDPOINT_DO_FORMULARIO]" method="POST"><label htmlFor="email">Seu melhor e-mail</label><div><input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@exemplo.com" /><button className="button button-dark" type="submit">Quero entrar <ArrowRight size={16} /></button></div><small>Sem spam. Só novidades do Dockmark.</small></form>}</motion.section>

      <footer><a className="brand" href="#top"><span className="brand-dot" />dockmark</a><p>Favoritos que acompanham você.</p><div className="footer-links"><a href="#top">Privacidade</a><a href="#top">GitHub <GitBranch size={14} /></a><span>© 2024 Dockmark</span></div></footer>
    </main>
  )
}


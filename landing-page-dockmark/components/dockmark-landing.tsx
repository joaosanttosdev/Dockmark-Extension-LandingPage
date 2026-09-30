'use client'

import { FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Cloud, Download, GitBranch, LockKeyhole, Menu, ShieldCheck, Sparkles, X, Zap } from 'lucide-react'

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

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-intro"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>
}

export default function DockmarkLanding() {
  const [menu, setMenu] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSent(true)
  }

  return (
    <main>
      <nav className="nav-wrap" aria-label="Navegação principal">
        <a className="brand" href="#top" aria-label="Dockmark início"><span className="brand-dot" />dockmark</a>
        <div className={`nav-links ${menu ? 'is-open' : ''}`}>
          <a href="#como-funciona" onClick={() => setMenu(false)}>Como funciona</a><a href="#recursos" onClick={() => setMenu(false)}>Recursos</a><a href="#faq" onClick={() => setMenu(false)}>FAQ</a>
        </div>
        <a className="nav-cta" href="#espera">Entrar na espera <ArrowRight size={15} /></a>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? 'Fechar menu' : 'Abrir menu'}>{menu ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> favoritos, finalmente em casa</p><h1>Seus favoritos,<br /><em>em qualquer navegador.</em></h1><p className="hero-text">O Dockmark sincroniza seus favoritos onde quer que você navegue — com privacidade, simplicidade e um toque de leveza.</p><a className="button button-primary" href="#espera">Entrar na lista de espera <ArrowRight size={18} /></a><p className="microcopy"><ShieldCheck size={14} /> Gratuito, open-source e feito com carinho.</p></div>
        <div className="hero-mascot"><div className="halo" /><Pingo /><span className="float-label label-one">seus links</span><span className="float-label label-two">sempre com você</span></div>
      </section>

      <section className="compat-section"><p>Funciona em todos</p><div className="browser-row">{browsers.map(browser => <div className="browser-pill" key={browser.name}><span className={`browser-mark ${browser.tone}`}>{browser.mark}</span>{browser.name}</div>)}</div></section>

      <section className="section comparison"><SectionIntro eyebrow="a dor conhecida" title="Trocar de navegador não deveria apagar seu caminho." copy="Seus favoritos contam a história de como você navega. O Dockmark garante que ela continue com você." /><div className="compare-grid"><div className="compare-card chaos"><span className="card-number">01</span><h3>Antes do Dockmark</h3><div className="messy-links"><span>★ receitas-de-domingo</span><span>★ pesquisa-importante</span><span>★ aquele artigo</span><span>★ inspiração</span></div><p>Exportar. Baixar. Reimportar.<br />De novo. E de novo.</p></div><div className="compare-card calm"><span className="card-number">02</span><h3>Com o Dockmark</h3><div className="sync-visual"><Pingo small /><div className="sync-line" /><Cloud size={32} /></div><p>Abra o navegador que quiser.<br /><strong>Seus favoritos já estão lá.</strong></p><span className="check-stamp"><Check size={14} /> tudo no lugar</span></div></div></section>

      <section className="section steps-section" id="como-funciona"><SectionIntro eyebrow="sem complicação" title="Do seu navegador para a nuvem, em três passos." /><div className="steps-grid">{[['01','Instale','Adicione o Dockmark ao seu navegador favorito.'],['02','Conecte sua nuvem','Escolha onde seus favoritos vão morar.'],['03','Sincronize','Pronto. Eles acompanham você em todo lugar.']].map(([number, title, copy], i) => <div className="step" key={number}><span className="step-number">{number}</span><div className="step-icon">{i === 0 ? <Download /> : i === 1 ? <Cloud /> : <Zap />}</div><h3>{title}</h3><p>{copy}</p>{i < 2 && <div className="step-beam" />}</div>)}</div></section>

      <section className="section features-section" id="recursos"><SectionIntro eyebrow="feito para durar" title="Tudo que importa. Nada que atrapalha." /><div className="feature-grid"><div className="feature-card feature-large"><div className="feature-icon"><LockKeyhole /></div><h3>Criptografia ponta a ponta</h3><p>Seus favoritos são protegidos com AES-GCM antes de saírem do dispositivo. Só você tem a chave.</p><div className="lock-art"><div className="lock-ring" /><Pingo small /></div><span className="feature-tag">E2EE · AES-GCM</span></div><div className="feature-card"><div className="feature-icon coral"><Sparkles /></div><h3>Multi-navegador</h3><p>Chrome, Firefox, Brave e Edge. Um lugar só para todos os seus caminhos.</p><div className="mini-browser-stack">{browsers.map(b => <span key={b.name} className={`browser-mark ${b.tone}`}>{b.mark}</span>)}</div></div><div className="feature-card feature-cloud"><div className="feature-icon water"><Cloud /></div><h3>Zero lock-in</h3><p>Seus dados na sua nuvem. Google Drive, WebDAV e mais — você escolhe.</p><div className="cloud-words"><span>Google Drive</span><span>WebDAV</span><span>+ seu servidor</span></div></div></div></section>

      <section className="section demo-section"><SectionIntro eyebrow="veja em ação" title="Seu novo lugar favorito." /><div className="browser-window"><div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>dockmark · favoritos</span><div className="window-profile">D</div></div><div className="window-body"><div className="sidebar"><div className="mini-brand"><span className="brand-dot" /> dockmark</div><span className="side-active">Todos os favoritos <b>24</b></span><span>Recentes</span><span>Pastas</span><span>Configurações</span></div><div className="bookmark-content"><div className="content-head"><div><p className="tiny-label">seus favoritos</p><h3>Olá, Ana.</h3></div><span className="synced"><Check size={13} /> sincronizado</span></div><div className="bookmark-list">{['Inspiração para o próximo projeto','Receita de pão de fermentação natural','Como criar hábitos que duram'].map((text, i) => <div className="bookmark" key={text}><span className="bookmark-star">★</span><div><strong>{text}</strong><small>{['are.na · há 2 min','cozinhando.com · há 1 h','slowgrowth.co · ontem'][i]}</small></div><span>•••</span></div>)}</div></div></div></div></section>

      <section className="section faq-section" id="faq"><SectionIntro eyebrow="ainda curioso?" title="Perguntas frequentes." /><div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span>{question}</span><span className="faq-plus">{openFaq === i ? '−' : '+'}</span></button>{openFaq === i && <p>{answer}</p>}</div>)}</div></section>

      <section className="signup-section" id="espera"><div className="signup-mascot"><Pingo small /></div><div className="signup-copy"><p className="eyebrow">fique por perto</p><h2>Seus favoritos<br /><em>estão quase em casa.</em></h2><p>Entre na lista e seja uma das primeiras pessoas a experimentar o Dockmark.</p></div>{sent ? <div className="success-message"><Check size={22} /><strong>Você está na lista!</strong><span>Avisaremos quando o Dockmark estiver pronto.</span></div> : <form className="signup-form" onSubmit={submit} action="[ENDPOINT_DO_FORMULARIO]" method="POST"><label htmlFor="email">Seu melhor e-mail</label><div><input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@exemplo.com" /><button className="button button-dark" type="submit">Quero entrar <ArrowRight size={16} /></button></div><small>Sem spam. Só novidades do Dockmark.</small></form>}</section>

      <footer><a className="brand" href="#top"><span className="brand-dot" />dockmark</a><p>Favoritos que acompanham você.</p><div className="footer-links"><a href="#top">Privacidade</a><a href="#top">GitHub <GitBranch size={14} /></a><span>© 2024 Dockmark</span></div></footer>
    </main>
  )
}


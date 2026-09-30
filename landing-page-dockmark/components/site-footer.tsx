import Link from 'next/link'
import { GitBranch } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer>
      <Link className="brand" href="/"><span className="brand-dot" />dockmark</Link>
      <p>Favoritos que acompanham você.</p>
      <div className="footer-links">
        <Link href="/privacidade">Privacidade</Link>
        <a href="https://github.com/joaosanttosdev/Dockmark-Extension-LandingPage" target="_blank" rel="noopener noreferrer">GitHub <GitBranch size={14} /></a>
        <span>© 2026 Dockmark</span>
      </div>
    </footer>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import SiteFooter from '@/components/site-footer'
import ThemeToggle from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Política de Privacidade — Dockmark',
  description: 'Como o Dockmark trata a sua privacidade e as suas informações pessoais.',
}

const updatedAt = '30 September 2026 19:44'

// Para adicionar um novo tópico, basta incluir uma entrada aqui: ele aparece no índice e na página
const sections: { id: string; title: string; paragraphs: string[]; list?: string[] }[] = [
  {
    id: 'politica-de-privacidade',
    title: 'Política de Privacidade',
    paragraphs: [
      'A sua privacidade é importante para nós. É política do Dockmark respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Dockmark, e outros sites que possuímos e operamos.',
      'Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.',
      'Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.',
      'Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.',
      'O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.',
      'Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.',
      'O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.',
      'O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.',
      'Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.',
      'Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.',
      'Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.',
    ],
  },
  {
    id: 'compromisso-do-usuario',
    title: 'Compromisso do Usuário',
    paragraphs: [
      'O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Dockmark oferece no site e com caráter enunciativo, mas não limitativo:',
    ],
    list: [
      'A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;',
      'B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;',
      'C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Dockmark, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.',
    ],
  },
  {
    id: 'mais-informacoes',
    title: 'Mais informações',
    paragraphs: [
      'Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.',
      `Esta política é efetiva a partir de ${updatedAt}.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main>
      <nav className="nav-wrap" aria-label="Navegação principal">
        <Link className="brand" href="/"><span className="brand-dot" />dockmark</Link>
        <div className="nav-actions">
          <ThemeToggle />
          <Link className="nav-cta legal-back" href="/"><ArrowLeft size={15} /> Voltar ao site</Link>
        </div>
      </nav>

      <div className="legal-page">
        <header className="legal-header">
          <p className="eyebrow"><span className="eyebrow-dot" /> transparência</p>
          <h1>Privacidade</h1>
          <p className="legal-updated">Última atualização: {updatedAt}</p>
        </header>

        <div className="legal-body">
          <aside className="legal-toc" aria-label="Nesta página">
            <p>Nesta página</p>
            {sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
          </aside>
          <article className="legal-content">
            {sections.map(section => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map(text => <p key={text}>{text}</p>)}
                {section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}
              </section>
            ))}
          </article>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

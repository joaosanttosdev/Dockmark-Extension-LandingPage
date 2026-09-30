# Dockmark — Landing Page

Landing page da **Dockmark**, extensão de navegador que sincroniza seus favoritos entre navegadores com privacidade, simplicidade e um toque de leveza.

> Status: pré-lançamento. A página funciona como vitrine do projeto e captação de **lista de espera**.

## Sobre o Dockmark

- **Multi-navegador:** Chrome, Firefox, Brave e Edge desde o primeiro lançamento (Safari em breve).
- **Criptografia ponta a ponta:** os favoritos são cifrados com **AES-GCM** antes de sair do dispositivo. Só você tem a chave.
- **Zero lock-in:** os dados ficam na nuvem que você escolher (Google Drive, WebDAV ou seu próprio servidor).
- **Gratuito e open-source.**
- **Mascote:** uma gota azul de gelatina (`public/images/gota.png`).

Como funciona, em três passos: **Instale** a extensão → **Conecte sua nuvem** → **Sincronize**.

## Stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | React 19 + TypeScript 5.7 |
| Estilos | Tailwind CSS 4 + CSS próprio em `app/globals.css` |
| Animações | [framer-motion](https://motion.dev) + animações CSS |
| Ícones | [lucide-react](https://lucide.dev) + SVGs de marcas em `public/images` |
| Analytics | `@vercel/analytics` (apenas em produção) |
| Gerenciador | pnpm 12 |

## Como rodar

Pré-requisitos: Node.js recente e pnpm (via `corepack enable`).

```bash
cd landing-page-dockmark
pnpm install
pnpm dev -p 7777      # http://localhost:7777
```

Outros comandos:

```bash
pnpm build            # build de produção
pnpm start            # serve o build
```

> Ao rodar `next dev`, o Next.js gera/atualiza `AGENTS.md` e `CLAUDE.md` na pasta do app (instruções para agentes de IA). Para desativar, use `agentRules: false` no `next.config.mjs`.

## Estrutura

```
landing-page-dockmark/
├── app/
│   ├── layout.tsx            # HTML raiz, metadados, script de tema (evita flash)
│   ├── page.tsx              # Home → <DockmarkLanding />
│   ├── privacidade/page.tsx  # Página de Política de Privacidade
│   └── globals.css           # Todo o design: tokens, seções, dark mode, responsivo
├── components/
│   ├── dockmark-landing.tsx  # Página principal (menu, hero, passos, demo, FAQ, cadastro)
│   ├── sync-hub.tsx          # Diagrama nuvens → Dockmark → navegadores
│   ├── feature-bento.tsx     # Seção de recursos em blocos (bento)
│   ├── theme-toggle.tsx      # Botão de modo claro/escuro
│   ├── site-footer.tsx       # Rodapé compartilhado entre as páginas
│   └── ui/                   # Componentes shadcn
└── public/images/
    ├── gota.png              # Mascote
    ├── browsers/             # Logos: Chrome, Firefox, Brave, Edge
    └── clouds/               # Logos: Google Drive, Dropbox, Nextcloud
```

## Páginas e seções

### Home (`/`)

1. **Menu:** links para Como funciona, Recursos e FAQ, botão de tema e CTA "Entrar na espera" (menu hambúrguer no celular).
2. **Hero:** "Seus favoritos, em qualquer navegador." com o mascote flutuando.
3. **Funciona em todos:** faixa com os logos dos navegadores suportados.
4. **Trocar de navegador não deveria apagar seu caminho:** diagrama com as nuvens de um lado, o Dockmark no centro e os navegadores do outro, ligados por linhas tracejadas animadas. As linhas são calculadas pela posição real dos blocos, e o diagrama fica vertical no celular.
5. **Do seu navegador para a nuvem, em três passos:** Instale, Conecte, Sincronize, ligados pelas mesmas linhas animadas.
6. **Tudo que importa. Nada que atrapalha. (bento):**
   - Lista de navegadores integrados.
   - Criptografia ponta a ponta, com ícones em órbita.
   - Zero lock-in, com a nuvem e o chip de sincronização.
7. **Seu novo lugar favorito:** mockup da interface da extensão.
8. **FAQ:** acordeão animado.
9. **Lista de espera:** formulário de e-mail.
10. **Rodapé:** link para Privacidade, link para o GitHub e © 2026.

### Privacidade (`/privacidade`)

Política de Privacidade e Compromisso do Usuário, com índice lateral. Para adicionar um novo tópico, inclua uma entrada no array `sections` em `app/privacidade/page.tsx`. Ele aparece automaticamente no texto e no índice.

## Recursos implementados

- **Animações:**
  - Entrada suave das seções ao rolar e hero em cascata.
  - Hover nos cards e blocos.
  - FAQ com abrir e fechar animado.
  - Linhas tracejadas em fluxo, órbita e pulso no diagrama.
- **Acessibilidade de movimento:** tudo respeita `prefers-reduced-motion`.
- **Modo escuro:**
  - O botão sol/lua no menu alterna o tema e salva a escolha em `localStorage`. Na primeira visita, o site segue o tema do sistema.
  - Um script inline no `<head>` aplica o tema antes da primeira pintura, então a página não pisca.
  - As cores escuras usam `[data-theme="dark"]` em `globals.css`.
- **Responsivo:**
  - Espaçamento lateral via `--pad-x`: **80px** em PC e tablet, **20px** no celular (até 760px).
  - **PC (1100px ou mais):** layout mais largo e tipografia maior para ocupar a tela.
  - **Celular (até 760px):** layouts empilhados e menu hambúrguer.

## Créditos dos ícones

- Logos de navegadores: [alrra/browser-logos](https://github.com/alrra/browser-logos) (MIT)
- Google Drive e Dropbox: [gilbarbara/logos](https://github.com/gilbarbara/logos) (CC0)
- Nextcloud: [Simple Icons](https://simpleicons.org) (CC0), com a cor oficial `#0082C9`

As marcas pertencem aos seus respectivos donos e são usadas apenas para indicar compatibilidade.

## Pendências conhecidas

- [ ] **Formulário da lista de espera:** o `action` ainda é o placeholder `[ENDPOINT_DO_FORMULARIO]`. Hoje o envio só mostra a mensagem de sucesso na tela.
- [ ] **Política de Privacidade:** revisar o texto.
  - Ele menciona Google AdSense, cookies de publicidade e afiliados, que o site não usa.
  - Tem termos de português europeu ("contacto connosco") e não informa um canal de contato.
  - Tem a data em inglês.
- [ ] **Consistência de nuvens:** o diagrama cita Dropbox e Nextcloud, mas o FAQ e o bento citam Google Drive e WebDAV.
- [ ] **Edge no diagrama:** o Edge aparece na legenda do diagrama, mas não tem bloco próprio.

## Repositório

https://github.com/joaosanttosdev/Dockmark-Extension-LandingPage

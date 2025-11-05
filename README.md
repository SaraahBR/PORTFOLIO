# Portfólio – Sarah Hernandes

Site pessoal moderno e acessível, com i18n completo, tema dark/light por contexto, jogos e showcase de projetos. Baseado em Next.js (App Router), TypeScript e Tailwind.

## Stack
- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS (darkMode: 'class')
- Framer Motion (animações + useInView)
- React Icons, country-flag-icons (bandeiras SVG)
- react-type-animation (texto no Hero)
- sonner (toasts)

## Principais Recursos Implementados
- Internacionalização completa (pt‑BR, en, es, fr) via `LanguageContext` e JSONs em `messages/*`.
  - Seções, navbar, projetos, rodapé, jogo da cobrinha e toasts traduzidos.
- Tema customizado com `ThemeContext` (sem next-themes).
  - Aplica classe no `<html>`, persiste em `localStorage`, script anti‑FOUC em `layout`.
- Navbar acessível e responsiva.
  - Bandeiras SVG, dropdown fecha ao clicar fora/ESC, bloqueio de scroll quando menu mobile aberto.
- Jogo da cobrinha (Snake) melhorado.
  - Olhos com pupilas e língua bifurcada animada; aparência da demo igual ao jogo real; i18n de títulos e toasts.
- Habilidades (Skills) com 6 cards, incluindo “Comportamentais” (novidade).
  - Itens longos (ex.: AWS EC2/S3/RDS/IAM/Lambda/CloudFormation) quebram corretamente.
- Novas seções: Experiência, Cursos e Idiomas.
  - Página organiza: Skills → Experiência → Cursos → Formação → Projetos → Idiomas → Contato.
- Projetos atualizados e ordenados.
  - Ordem: LUIGARAH Frontend, LUIGARAH Backend, Identificador de Pronomes, ScoreOn, GamerzNew, CyberVenus, demais.
  - Links corrigidos (ex.: LUIGARAH backend) e novos projetos (GamerzNew, ScoreOn, CyberVenus).
- Favicon habilitado (`public/favicon.ico`).

## Estrutura de Pastas (principal)
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── internacionalizacao/
│   │   ├── LanguageContext.tsx
│   │   └── LanguageSelector.tsx
│   └── jogo-cobrinha/
│       └── SnakeGame.jsx
├── components/
│   ├── Navbar/
│   │   └── Navbar.tsx
│   ├── Hero/
│   │   └── Hero.tsx
│   ├── Sobre/
│   │   └── About.tsx
│   ├── Habilidades/
│   │   └── Skills.tsx
│   ├── Emprego/
│   │   └── Experience.tsx
│   ├── Educacao/
│   │   └── Education.tsx
│   ├── Cursos/
│   │   └── Courses.tsx
│   ├── Idiomas/
│   │   └── Languages.tsx
│   ├── Projetos/
│   │   └── Projects.tsx
│   ├── Contato/
│   │   └── Contact.tsx
│   ├── Tema/
│   │   └── ThemeContext.tsx
│   └── ParticlesBackground.tsx
messages/
├── pt-BR.json
├── en.json
├── es.json
└── fr.json
public/
└── favicon.ico
```

## i18n (como funciona)
- Provider: `src/app/internacionalizacao/LanguageContext.tsx`
  - Lê `idioma` do localStorage, expõe `t(chave)` genérico (suporta string e arrays), `setIdioma`.
- Mensagens: `messages/{pt-BR,en,es,fr}.json`
  - Ex.: `skills.lists.programming`, `projects.items`, `snake.*`, `footer.rights`.
- Para adicionar um idioma: crie `messages/xx.json`, inclua no `LanguageContext` e traduza as chaves existentes.

## Tema (dark/light)
- Provider: `src/components/Tema/ThemeContext.tsx` (toggle + persistência).
- Tailwind: `darkMode: 'class'` e classes `dark:*` em todo o site.

## Acessibilidade e Mobile
- Navbar com aria‑* no dropdown e no hambúrguer.
- Fechamento por ESC e clique fora.
- Body sem scroll quando menu mobile aberto.
- Listas com `break-words` para não “estourar” no mobile (ex.: cards de contato e skills).
- Indicador de scroll (mouse) reposicionado para não colar no botão do Hero.

## Projetos (dados e ordem)
- Definidos em `messages/* .json` em `projects.items` – facilitando reordenação/edição por idioma.
- Itens recentes adicionados:
  - LUIGARAH – Frontend/Backend (links corrigidos para backend).
  - GamerzNew (Angular + SSR + Neon Postgres + OAuth2).
  - ScoreOn (Next.js + MUI + NextAuth + Vercel Postgres + Recharts).
  - CyberVenus (Next.js 14 + TypeScript + Sass Modules).

## Jogo da Cobrinha
- `src/app/jogo-cobrinha/SnakeGame.jsx`
- Melhorias visuais (cabeça arredondada, olhos com pupilas e língua animada), i18n e unificação da demo com o jogo real.
- Toasts via `sonner` traduzidas.

## Favicon
- Arquivo: `public/favicon.ico`.
- Configuração: `src/app/layout.tsx` com `metadata.icons` e `<link rel="icon" href="/favicon.ico" />`.

## Como rodar
```bash
npm install
npm run dev      # http://localhost:3000

# Produção
npm run build
npm start
```

## Dicas de manutenção
- Sempre validar o JSON em `messages/*` (qualquer vírgula sobrando quebra o build).
- Para novos projetos/seções, prefira alimentar via arquivos de mensagens (mantém i18n e conteúdo centralizado).
- Evite `next-themes` – o projeto usa `ThemeContext` próprio.

## Licença
MIT License © 2025 Sarah Hernandes. Veja o arquivo `LICENSE` na raiz do projeto.

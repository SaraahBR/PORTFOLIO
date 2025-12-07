# Portfólio – Sarah Hernandes

Site pessoal moderno e acessível, com i18n completo, tema dark/light por contexto, **animações de fadas e flores no modo claro** e **galáxia no modo escuro**, jogos e showcase de projetos. Baseado em Next.js (App Router), TypeScript e Tailwind.

## Stack
- Next.js 16.0.7 (App Router com Turbopack)
- React 18
- TypeScript
- Tailwind CSS (darkMode: 'class')
- Framer Motion (animações + useInView)
- React Icons, country-flag-icons (bandeiras SVG)
- react-type-animation (texto no Hero)
- sonner (toasts)
- Canvas API (animações customizadas de fundo)

## Principais Recursos Implementados

### 🎨 Sistema de Animações de Fundo (Destaque!)

#### Modo Claro - Fadas e Flores
**Componente**: `src/components/FlowerFairyBackground.tsx`

**Flores Flutuantes (60 unidades)**
- 4 tipos diferentes desenhados com Canvas: rosa clássica, margarida, flor de cerejeira e tulipa
- Cores: vermelho intenso (#DC143C, #FF0000, #8B0000) e branco puro (#FFFFFF, #F8F8FF, #FFFAFA)
- Movimento suave com velocidade reduzida e rotação natural
- Distribuição equilibrada: 50% lado esquerdo + 50% lado direito
- Opacidade: 0.1 a 0.3 para efeito delicado

**Fadas Animadas (3 unidades)**
- Cores personalizadas: rosa escuro (hue 330°), vermelho (hue 0°), prata (hue 0° com saturação 0)
- Desenho detalhado de perfil usando Canvas API:
  * Cabeça com coque de cabelo
  * Cabelo comprido fluindo para trás
  * Corpo feminino com curvas naturais
  * Vestido fluido com detalhes de pregas
  * Braços e pernas em posições dinâmicas
- **Asas de libélula realistas**:
  * 4 asas separadas (2 superiores + 2 inferiores)
  * Abertura e fechamento sincronizado
  * Nervuras desenhadas para realismo
  * Gradientes translúcidos
- **Sistema de perseguição inteligente**:
  * Cada fada persegue uma flor específica
  * Muda de alvo ao alcançar a flor
  * Velocidade de movimento: 1.0 (lento e elegante)
  * Velocidade de asas: 0.15-0.25 (rápido para naturalidade)
- Opacidade: 0.3 a 0.6 para sutileza

**Fade Out Gradual**
- Algoritmo de transparência baseado em distância do centro (área do Hero)
- Área de fade: 30% da largura × 40% da altura a partir do centro
- Curva quártica (x⁴) para transição ultra suave e natural
- Fadas e flores desaparecem gradualmente ao se aproximar do conteúdo
- Nunca aparecem sobre elementos importantes

#### Modo Escuro - Galáxia Animada
**Componente**: `src/components/GalaxyBackground.tsx`

- 80 estrelas/partículas brilhantes
- Paleta roxa/rosa: #e879f9, #f0abfc, #c084fc, #ec4899, #d946ef
- Efeito twinkle (piscar) suave e contínuo
- Movimento orgânico lento
- Opacity: 0.7 para não cansar visualmente
- Z-index: -1 (sempre atrás do conteúdo)

#### Hero Component - Design Responsivo
- **Fundo único fixo** (não expande com conteúdo)
- Gradiente radial esfumado nas bordas:
  * Centro: 40% opacidade 95% (sólido)
  * Transição: 70% opacidade 70%
  * Bordas: 100% transparente (fusão natural)
- Cores por tema:
  * Claro: rgba(245, 235, 229) - bege/rosa
  * Escuro: rgba(10, 10, 20) - preto galáxia
- Sem bolas de luz no modo escuro
- Responsivo: largura otimizada para ver animações no mobile

### 📐 Hierarquia de Camadas (Z-Index)
```
Navbar: z-50 (sempre no topo, fixa)
Hero: z-20 (conteúdo principal)
Seções: z-10 (com backdrop-blur)
Backgrounds: z-1 (animações sempre atrás)
```

### 🎯 Navbar - UX Otimizada
- **Posição fixed permanente** (visível ao rolar)
- Fundo opaco em todos os estados (claro/escuro)
- Efeito hover: scale 1.05 sem mudança de cor
- Linha decorativa inferior:
  * Modo claro: gradiente rosa (#d4a5a5 → #b8968a)
  * Modo escuro: mantém gradiente original
- Corrigido bug de overflow-x-hidden que interferia com position:fixed

### ✨ Divisórias Sutis Entre Seções
- Classe CSS: `section-divider`
- Linha de 1px com gradiente suave
- **Modo claro**: bege/rosa (rgba(180, 150, 140))
- **Modo escuro**: azul/roxo (rgba(120, 100, 150))
- Largura: 60% da seção, centralizada
- Transição: transparente → visível no centro → transparente

### 🎨 Seções com Efeito Vidro Fosco
- Classe: `section-blur` com `backdrop-blur-[8px]`
- Aplicado em: About, Skills, Experience, Courses, Education, Projects, Languages, Contact
- Efeito: animações de fundo visíveis através de blur suave
- Funciona em ambos os temas

### 🌐 Internacionalização Completa
- 4 idiomas: pt-BR, en, es, fr
- Context API: `LanguageContext` + JSONs em `messages/`
- Todas as seções, navbar, projetos, rodapé e toasts traduzidos
- Seletor de idioma com bandeiras SVG

### 🎨 Sistema de Temas
- Context próprio: `ThemeContext` (sem dependências externas)
- Persistência em localStorage
- Classes Tailwind: `dark:*`
- Script anti-FOUC no layout
- Cores de fundo unificadas para transição natural

### 🧭 Navegação Acessível
- Dropdown fecha com ESC ou clique fora
- Bloqueio de scroll quando menu mobile aberto
- ARIA labels e roles adequados
- Responsivo em todas as resoluções

### 🎮 Jogo da Cobrinha
- Olhos com pupilas dinâmicas
- Língua bifurcada animada
- Aparência da demo idêntica ao jogo
- i18n completa (títulos e toasts)

### 💼 Conteúdo Organizado
- **Skills**: 6 cards incluindo "Comportamentais"
- **Novas seções**: Experiência, Cursos, Idiomas
- **Ordem**: Skills → Experiência → Cursos → Formação → Projetos → Idiomas → Contato
- **Projetos atualizados**: LUIGARAH (Frontend/Backend), ScoreOn, GamerzNew, CyberVenus
- Favicon habilitado

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
│   │   ├── ThemeContext.tsx
│   │   └── ThemeToggle.tsx
│   ├── GalaxyBackground.tsx (modo escuro)
│   └── FlowerFairyBackground.tsx (modo claro)
messages/
├── pt-BR.json
├── en.json
├── es.json
└── fr.json
public/
├── favicon.ico
└── images/
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
- Backgrounds diferentes por tema:
  * Light: FlowerFairyBackground (fadas e flores)
  * Dark: GalaxyBackground (estrelas e galáxia)

## Animações Customizadas
### FlowerFairyBackground (Canvas)
- Renderização via Canvas 2D API
- 60 flores + 3 fadas em movimento constante
- Sistema de fade out baseado em distância euclidiana
- RequestAnimationFrame loop otimizado
- Flowers array com propriedades: x, y, size, speedX, speedY, rotation, color, opacity
- Fairies array com propriedades: x, y, size, hue, saturation, lightness, wingAngle, targetFlowerIndex

### GalaxyBackground (Canvas)
- 80 partículas com efeito twinkle
- Movimento orgânico com wraparound
- Gradientes radiais para efeito de brilho
- Cores dinâmicas baseadas no tema

## Acessibilidade e Mobile
- Navbar com aria-* no dropdown e no hambúrguer.
- Fechamento por ESC e clique fora.
- Body sem scroll quando menu mobile aberto.
- Listas com `break-words` para não "estourar" no mobile (ex.: cards de contato e skills).
- Animações otimizadas para não interferir na leitura do conteúdo
- Backdrop-blur leve para manter legibilidade

## Projetos (dados e ordem)
- Definidos em `messages/*.json` em `projects.items` – facilitando reordenação/edição por idioma.
- Itens recentes adicionados:
  - LUIGARAH – Frontend/Backend (links corrigidos para backend).
  - GamerzNew (Angular + SSR + Neon Postgres + OAuth2).
  - ScoreOn (Next.js + MUI + NextAuth + Vercel Postgres + Recharts).
  - CyberVenus (Next.js 14 + TypeScript + Sass Modules).

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

## Performance
- Next.js 16 com Turbopack para builds rápidos
- Animações em Canvas (hardware-accelerated)
- Lazy loading de componentes pesados
- Opacidades otimizadas para não sobrecarregar
- Z-index hierarchy bem definida

## Dicas de manutenção
- Sempre validar o JSON em `messages/*` (qualquer vírgula sobrando quebra o build).
- Para novos projetos/seções, prefira alimentar via arquivos de mensagens (mantém i18n e conteúdo centralizado).
- Evite `next-themes` – o projeto usa `ThemeContext` próprio.
- Animações de fundo: ajustar opacidades em `FlowerFairyBackground.tsx` e `GalaxyBackground.tsx`
- Fade out: modificar `fadeRadiusX/Y` e curva (multiplicação) em ambos os componentes

## Melhorias Futuras Possíveis
- [ ] Modo de economia de energia (reduzir animações)
- [ ] Easter eggs interativos nas animações

## Licença
MIT License © 2025 Sarah Hernandes. Veja o arquivo `LICENSE` na raiz do projeto.

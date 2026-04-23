# Portfólio – Sarah Hernandes

Site pessoal moderno e acessível, com internacionalização completa em 4 idiomas, suporte a tema dark/light com animações de fundo customizadas (fadas e flores no modo claro, galáxia no modo escuro), minigame interativo e showcase de projetos com visualizadores desktop/mobile. Baseado em Next.js (App Router), TypeScript e Tailwind CSS.


<div align="center">
  <img src="./public/images/sarah_logo.svg" alt="Sarah Logo" width="270" height="270" />
</div>

## Stack Tecnológico

- **Next.js** 16.0.7 (App Router com Turbopack)
- **React** 19.2.1
- **TypeScript** 5.6.3
- **Tailwind CSS** 3.4.1 (darkMode: 'class')
- **Framer Motion** 11.11.17 (animações)
- **React Icons** 5.3.0, country-flag-icons 1.5.21 (ícones e bandeiras SVG)
- **react-type-animation** 3.2.0 (animação de texto)
- **next-intl** 4.4.0 (internacionalização)
- **sonner** 2.0.7 (notificações toast)
- **Canvas API** (animações de fundo)

## Recursos Principais

### Sistema de Animações de Fundo

#### Modo Claro: Fadas e Flores 🧚✨🌸
**Arquivo**: `src/components/FlowerFairyBackground.tsx`

**Flores Flutuantes (60 unidades)**
- Formato tradicional: pétalas elípticas circulares ao redor de um centro
- Cores: tons de vermelho (#DC143C, #FF0000, #8B0000) e branco (#FFFFFF, #F8F8FF)
- Movimento suave com rotação natural e velocidade reduzida
- Distribuição: 50% lado esquerdo, 50% lado direito
- Opacidade: 0.1 a 0.3 para efeito delicado
- Renderização otimizada via Canvas 2D

**Fadas Animadas (3 unidades)**
- Tamanho: 3-5 unidades
- Cores personalizadas: rosa escuro, vermelho e prata
- Desenho detalhado em Canvas com:
  * Cabeça com coque de cabelo
  * Cabelo comprido fluindo
  * Corpo feminino com proporções naturais
  * Vestido fluido com pregas
  * Braços e pernas em posição dinâmica
- Asas de libélula com 4 seções (2 superiores, 2 inferiores), nervuras e gradientes translúcidos
- Comportamento de perseguição: busca flores próximas com velocidade 0.6
- Batida de asas: 0.12-0.20 (rápida e contínua)
- Trail reduzido a 10 pontos para otimização
- Opacidade: 0.3 a 0.6

**Fade Out Gradual**
- Transparência baseada em distância euclidiana do centro
- Área de fade: 30% da largura × 40% da altura
- Curva quártica (x⁴) para transição suave
- Animações desaparecem ao se aproximar do conteúdo principal

#### Modo Escuro: Galáxia Animada 🌌
**Arquivo**: `src/components/GalaxyBackground.tsx`

- 50 partículas brilhantes com efeito twinkle
- Paleta de cores: roxo e rosa (#e879f9, #f0abfc, #c084fc, #ec4899, #d946ef)
- Movimento orgânico lento com efeito de wraparound
- Opacidade: 0.7 para conforto visual
- Intersection Observer: pausa automática quando fora da viewport
- Posicionamento: z-index -1 (sempre atrás do conteúdo)

#### Hero Component
- Fundo único fixo com gradiente radial
- Gradiente esfumado: centro 95% opaco, transição suave nas bordas
- Cores por tema: bege/rosa (claro), preto escuro (escuro)
- Layout responsivo com otimização para visualização de animações em mobile

### Hierarquia de Camadas

```
Navbar:      z-50 (sempre visível, posição fixa)
Hero:        z-20 (conteúdo principal)
Seções:      z-10 (com backdrop-blur)
Backgrounds: z-1  (animações de fundo)
```

### Navbar

- Posição fixa permanente (visível ao rolar)
- Fundo opaco em todos os temas
- Efeito hover: escala 1.05
- Linha decorativa com gradiente rosa
- Menu mobile com bloqueio de scroll quando aberto
- Fechamento por ESC ou clique fora
- Responsivo em todas as resoluções

### Divisórias Entre Seções

- Linha de 1px com gradiente suave
- Modo claro: tons bege/rosa (rgba(180, 150, 140))
- Modo escuro: tons azul/roxo (rgba(120, 100, 150))
- Largura: 60% da seção, centralizada
- Transição: transparente → visível → transparente

### Seções com Efeito Vidro

Backdrop-blur de 8px aplicado em todas as seções de conteúdo:
- Sobre
- Habilidades
- Experiência
- Cursos
- Formação Acadêmica
- Projetos
- Idiomas
- Contato

Efeito permite visualizar animações de fundo através de desfoque suave.

### Visualizadores de Projetos 🖥️ 📱

Componente interativo para showcase de projetos em desktop e mobile com galeria de imagens:

**Identificador de Pronomes Oblíquos Átonos**
- Visualizador desktop com moldura de monitor
- 4 imagens: código, terminal (2x), resultado final
- Sem modo mobile

**ScoreOn**
- Visualizador desktop e mobile com toggle
- 3 imagens desktop + 2 imagens mobile
- Navegação com setas (anterior/próxima)
- Indicadores de slides ativos

**VittaCash (Gerenciador de Despesas)**
- Visualizador desktop e mobile com toggle
- 5 imagens desktop + 3 imagens mobile
- Stack: Next.js 15, React 19, Node.js, PostgreSQL, Prisma, JWT, OAuth
- Links: [Site](https://vittacash.vercel.app/) | [Código](https://github.com/SaraahBR/Vitta-Cash)

**LUIGARAH - Frontend e Backend**
- Frontend: Marketplace de Moda de Luxo
- Ambos com visualizador desktop e mobile
- Toggle de visualização
- Múltiplas imagens em galeria
- Frontend: 5 desktop + 4 mobile
- Backend: 5 desktop + 1 mobile

**Moldura Mobile**
- Inspirada no design clássico do iPhone 5s
- Notch bar superior simulado
- Botões laterais (volume e power)
- Home button inferior
- Altura: 270px padrão, 350px para alguns projetos
- Rounded corners com proporção correta

### Internacionalização

4 idiomas suportados: Português (pt-BR), Inglês (en), Espanhol (es), Francês (fr)

**Implementação**:
- Context API: `src/app/internacionalizacao/LanguageContext.tsx`
- Mensagens: `messages/{pt-BR,en,es,fr}.json`
- Seletor com bandeiras SVG
- Persistência em localStorage
- Todas as seções traduzidas: navbar, hero, seções, projetos, footer, notificações

### Sistema de Temas

**Implementação**:
- Context próprio: `src/components/Tema/ThemeContext.tsx`
- Sem dependências externas
- Persistência em localStorage
- Tailwind: `darkMode: 'class'` com classes `dark:*`
- Anti-FOUC via script inline

**Backgrounds por Tema**:
- Light: FlowerFairyBackground (fadas e flores)
- Dark: GalaxyBackground (galáxia com estrelas)

### Minigame - Jogo da Cobrinha

**Arquivo**: `src/app/jogo-cobrinha/SnakeGame.jsx`

Jogo interativo com:
- Olhos com pupilas dinâmicas que seguem a cobra
- Língua bifurcada animada
- Interface de pontuação
- Internacionalização completa
- Controles: setas do teclado ou WASD
- Detecção de colisão com paredes e auto-colisão

### Organização de Conteúdo

**Seções** (em ordem de exibição):
1. Hero com animação de texto
2. Sobre mim
3. Habilidades (6 categorias)
4. Experiência profissional
5. Cursos
6. Formação Acadêmica
7. Projetos com visualizadores
8. Idiomas
9. Contato

**Projetos Destacados**:
1. LUIGARAH - Frontend (Marketplace de Moda de Luxo)
2. LUIGARAH - Backend (API RESTful)
3. VittaCash (Gerenciador de Despesas)
4. Identificador de Pronomes Oblíquos Átonos (Projeto Freelance)
5. ScoreOn (Sistema de Controle de Notas)
6. GamerzNew (Angular + SSR + OAuth2)
7. CyberVenus (Portal Educacional)
8. E mais 4 projetos adicionais

### Acessibilidade

- Atributos ARIA em componentes interativos
- Navegação por teclado
- Contraste de cores adequado
- Suporte a leitor de tela
- Links semânticos
- Estrutura de headings hierárquica
- Texto alternativo em imagens

### Performance

**Otimizações de Animações**:
- Intersection Observer: animações pausam quando fora da viewport
- Elementos reduzidos: 60 flores, 50 estrelas
- Trail otimizado: 10 pontos para fadas
- GPU acceleration: `will-change: transform`, `translateZ(0)`

**Otimizações de Imagens**:
- Lazy loading em todas as imagens
- Next.js Image component com sizes responsivos
- GIFs com `unoptimized={true}` para evitar processamento desnecessário

**Otimizações de CSS**:
- Transições específicas em propriedades (transform, box-shadow)
- `will-change` estratégico para elementos com hover
- GPU acceleration via transforms

**Build**:
- Next.js 16 com Turbopack (builds ultra-rápidos)
- Tree-shaking automático
- Code splitting por rota

## Estrutura de Pastas

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
│   │   ├── Navbar.tsx
│   │   └── TopButtons.tsx
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
│   ├── ParticlesBackground.tsx
│   ├── GalaxyBackground.tsx
│   └── FlowerFairyBackground.tsx
messages/
├── pt-BR.json
├── en.json
├── es.json
└── fr.json
public/
├── favicon.ico
├── images/
├── Identificador-Pronomes/
├── LUIGARAH-front/
├── LUIGARAH-back/
├── ScoreOn-front/
├── ScoreOn-back/
├── VittaCash-front/
└── VittaCash-back/
```

## Internacionalização

Implementada com Context API e arquivos JSON centralizados.

- Provider: `src/app/internacionalizacao/LanguageContext.tsx`
- Mensagens: `messages/{pt-BR,en,es,fr}.json`
- Seletor com bandeiras SVG
- Persistência em localStorage
- Para adicionar um idioma: crie `messages/xx.json`, inclua no `LanguageContext` e traduza as chaves existentes

## Como Rodar

```bash
# Instalação
npm install

# Desenvolvimento
npm run dev
# Abrir http://localhost:3000

# Produção
npm run build
npm start
```

## Componente Projects.tsx

Sistema de visualizadores de projetos com desktop/mobile toggle.

**Estado Management**:
- Índices de imagens separados por projeto
- View modes (desktop/mobile) por projeto
- Navegação anterior/próxima com wraparound

**Visualizadores**:
- LUIGARAH Frontend: 5 imagens desktop, 4 mobile
- LUIGARAH Backend: 5 imagens desktop, 1 mobile
- VittaCash: 5 imagens desktop, 3 mobile
- Identificador: 4 imagens desktop (sem mobile)
- ScoreOn: 3 imagens desktop, 2 mobile

**Moldura Mobile**:
- Inspiração: design clássico do iPhone 5s
- Notch bar superior
- Botões laterais (volume, power)
- Home button
- Rounded corners com proporção correta
- Altura padrão: 270px (350px para VittaCash)

## Projetos em Destaque

1. LUIGARAH - Frontend (Marketplace de Moda de Luxo)
2. LUIGARAH - Backend (API RESTful Java/Spring Boot)
3. VittaCash (Gerenciador de Despesas - Next.js + Node.js + PostgreSQL)
4. Identificador de Pronomes Oblíquos Átonos (Python + NLP)
5. ScoreOn (Sistema de Notas - Next.js + MUI + Recharts)

## Dicas de Manutenção

- Validar JSON em `messages/*` antes de fazer commit
- Adicionar novo visualizador: criar pastas em `public/`, adicionar estados em `Projects.tsx`, adicionar dados em `messages/*.json`
- Reordenar projetos: atualizar `messages/*.json` mantendo sincronização entre idiomas
- Tema: ajustar opacidades em `FlowerFairyBackground.tsx` e `GalaxyBackground.tsx`
- Animações: `will-change`, `transform: translateZ(0)` para GPU acceleration

## Melhorias Futuras

- Modo de economia de energia
- Filtro de projetos por tags
- Previews em tempo real dos projetos
- Lightbox para imagens dos visualizadores
- Animações de transição entre slides

## Licença

MIT License © 2025 Sarah Hernandes. Veja [LICENSE](./LICENSE).

# Currículo Digital — Rafael Raunan da Silva

Landing page de currículo/portfólio de **Rafael Raunan da Silva** — Suporte Técnico em T.I, Programação Web e Automação Industrial (São Miguel do Oeste/SC).

🔗 **Deploy:** [curriculo-rafael-two.vercel.app](https://curriculo-rafael-two.vercel.app)

## 🛠 Tecnologias

- **HTML5** semântico (arquivo único `index.html`)
- **CSS3** puro (`css/style.css`) — variáveis, grid, flexbox, animações
- **JavaScript** vanilla (`js/main.js`) — sem dependências ou build
- Fontes: [Inter](https://fonts.google.com/specimen/Inter) e [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Google Fonts

## ✨ Recursos

- Design dark tech com gradientes cyan/violeta
- Totalmente responsivo (mobile-first)
- Efeito *typewriter* no hero
- Animações de entrada ao rolar (IntersectionObserver)
- Timeline de formação acadêmica
- Menu mobile com hambúrguer, barra de progresso de scroll e botão "voltar ao topo"
- Respeita `prefers-reduced-motion` (acessibilidade)
- Links diretos: WhatsApp, e-mail, telefone e LinkedIn

## 📂 Estrutura

```
├── index.html      # Página única com todas as seções
├── css/
│   └── style.css   # Estilos (tema, layout, responsivo, animações)
├── js/
│   └── main.js     # Microinterações
└── vercel.json     # Configuração de deploy (clean URLs + headers)
```

As fontes (Inter e Space Grotesk) são carregadas via Google Fonts.

## 🚀 Rodando localmente

Não precisa de build — é só abrir o `index.html` no navegador, ou servir a pasta:

```bash
npx serve .
```

## ☁️ Deploy na Vercel

O projeto já está conectado à Vercel (projeto `curriculo-rafael`). Qualquer push na branch principal gera um novo deploy automaticamente.

Para um deploy manual:

```bash
npm i -g vercel
vercel --prod
```

## ✏️ Como editar

| O que mudar | Onde |
|---|---|
| Textos, seções, links de contato | `index.html` |
| Cores do tema | Variáveis `:root` no topo de `css/style.css` |
| Frases do efeito typewriter | Array `roles` em `js/main.js` |
| Nova formação/experiência | Duplicar um `timeline__item` ou `xp-card` no `index.html` |

# TRI Climatização — Site institucional

Site institucional estático, responsivo e focado em geração de orçamentos (WhatsApp).
Sem build, sem framework: HTML + CSS + um arquivo JS. Basta abrir ou publicar.

## Estrutura

```
tri/
├── index.html                     # Página principal (todas as seções)
├── politica-de-privacidade.html   # Página de política de privacidade
├── css/styles.css                 # Design system + estilos
├── js/main.js                     # Menu mobile, reveal, formulário → WhatsApp
├── assets/
│   ├── logo.svg                   # Logotipo (marca + wordmark)
│   ├── favicon.svg                # Ícone da aba
│   └── img/                       # Placeholders de foto (SVG) — TROCAR por fotos reais
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Como visualizar

Abra `index.html` no navegador, ou rode um servidor local:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## ⚠️ Trocar as fotos (importante)

As imagens usadas hoje (`assets/img/hero.jpg`, `residencial.jpg`, `empresarial.jpg`)
são **fotos de acervo livre temporárias**, só para o layout não ficar vazio.
O ideal é substituí-las por **fotos reais da TRI Climatização** (ex.: do
Instagram @triclimatizacao) — técnicos, instalações, higienizações e equipamentos.

**Licenças / créditos:** veja `assets/img/CREDITOS.txt`. `hero.jpg` é domínio
público (sem exigências). Já `residencial.jpg` (CC BY 2.0) e `empresarial.jpg`
(CC BY-SA 4.0) **exigem atribuição** se forem mantidas em produção — por isso o
recomendado é trocá-las por fotos próprias.

Para cada foto:

1. Otimize a imagem (**WebP** ou **JPG**, largura ~1200–1600px, peso < 300KB).
2. Salve em `assets/img/` com o mesmo nome-base (ex.: `hero.jpg` ou `hero.webp`).
3. No `index.html`, atualize o `src` (e o `alt`) correspondente.
4. Mantenha `loading="lazy"` (exceto o hero, que usa `fetchpriority="high"`) e `width`/`height`.

Imagens usadas: `hero`, `residencial`, `empresarial`. Crie também um
`assets/og-image.jpg` (1200×630) para compartilhamento em redes sociais.

## O que ajustar antes de publicar

- **Domínio:** troque `https://www.triclimatizacao.com.br/` em `index.html` (canonical, Open Graph,
  schema), `sitemap.xml` e `robots.txt` pelo domínio real.
- **Endereço/horário:** não foram incluídos por não terem sido confirmados. Se existirem,
  adicione ao bloco `schema.org` (`address`, `openingHours`) no `index.html`.
- **Mapa da região:** `assets/img/area-mapa.svg` pode ser trocado por um print/mapa estático real
  ou por um embed do Google Maps, se desejado.

## WhatsApp

Número configurado: **(51) 98948-9992** → `https://wa.me/5551989489992`.
Todos os botões e o formulário já apontam para esse número. O formulário monta a mensagem
com os dados preenchidos e abre o WhatsApp para o cliente conferir e enviar (sem backend).
Para trocar o número, altere a constante `WA` em `js/main.js` e os links `wa.me/...` no HTML.

## Acessibilidade & SEO já incluídos

- HTML semântico, um único `<h1>`, hierarquia de títulos, `alt` em imagens, labels em formulários,
  foco visível, navegação por teclado, respeito a `prefers-reduced-motion`.
- `title`, `meta description`, Open Graph, canonical, favicon, `robots.txt`, `sitemap.xml`,
  `site.webmanifest` e dados estruturados `HVACBusiness` (schema.org).

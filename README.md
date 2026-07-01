# AMORA LACES

E-commerce premium com foco em conversao via WhatsApp, desenvolvido com Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion e Supabase.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui (componentes base com Radix)
- Framer Motion
- Supabase (Auth + Postgres + Storage)
- Zustand (sacola)

## Funcionalidades principais

- Home premium completa com hero full-screen e secoes de conversao
- Catalogo com pesquisa instantanea e filtros por categoria, cor, comprimento, material e faixa de preco
- Infinite scroll / carregamento progressivo de cards
- Pagina de produto com galeria, lightbox, video e produtos relacionados
- Drawer de compra sem sair da pagina com mensagem automatica para WhatsApp
- Sacola multi-itens com fechamento de pedido via WhatsApp
- Botao flutuante de WhatsApp sempre visivel
- Painel administrativo dark com login Supabase
- Rota admin secreta configuravel por variavel de ambiente
- SEO completo: Metadata, Open Graph, JSON-LD, Schema Product, sitemap e robots

## Setup local

1. Instale dependencias:

```bash
npm install
```

2. Crie o arquivo `.env.local` baseado em `.env.example`.

3. Rode o schema SQL no Supabase:

- Arquivo: `supabase/schema.sql`

4. Inicie em modo dev:

```bash
npm run dev
```

## Variaveis de ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ADMIN_SECRET_PATH=atelier-amora-privado
NEXT_PUBLIC_WHATSAPP_NUMBER=5511960291282
```

## Acesso ao painel admin

- URL secreta: `/{NEXT_PUBLIC_ADMIN_SECRET_PATH}`
- Exemplo: `/atelier-amora-privado`
- A rota `/admin` retorna 404 para ocultacao.

## Estrutura

- `src/app` rotas e SEO
- `src/components` layout, secoes, produto e ui
- `src/lib` tipos, dados, Supabase e utilitarios
- `src/store` estado global da sacola
- `supabase/schema.sql` estrutura inicial do banco

## Deploy (Netlify)

1. Conecte o repositorio no Netlify.
2. Configure build command: `npm run build`
3. Configure publish directory: `.next`
4. Configure as variaveis de ambiente no painel do Netlify.

## Lighthouse

Projeto otimizado para atingir score acima de 95 com imagens otimizadas, metadados completos e UI de alto desempenho.

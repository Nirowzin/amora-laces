import { Product } from "@/lib/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    code: "AML-FL-001",
    slug: "front-lace-rubi-natural",
    name: "Front Lace Rubi Natural",
    category: "Front Laces de Cabelo Humano",
    material: "Cabelo Humano",
    colors: ["Preto Onix", "Castanho Avela", "Ruivo Marsala"],
    lengths: ["30cm", "40cm", "55cm"],
    price: 899.9,
    promoPrice: 799.9,
    shortDescription: "Acabamento invisivel com textura sedosa e linha frontal ultra natural.",
    description:
      "Front lace premium para quem deseja movimento leve, brilho sofisticado e acabamento impecavel para uso diario ou eventos.",
    specifications: [
      "Base respiravel HD",
      "Densidade premium 180%",
      "Baby hair natural",
      "Aceita calor e modelagem",
    ],
    images: ["/produtos/produto-1.jpeg", "/produtos/produto-2.jpeg", "/produtos/produto-3.jpeg"],
    videos: ["https://www.youtube.com/embed/o0fG_lnVhHw"],
    isNew: true,
    isPremium: true,
    isOnSale: true,
    isFeatured: true,
    views: 1082,
  },
  {
    id: "2",
    code: "AML-WG-009",
    slug: "wig-diamante-loiro-fibra",
    name: "Wig Diamante Loiro",
    category: "Perucas de Fibra Importada",
    material: "Fibra Premium",
    colors: ["Loiro Champagne", "Loiro Areia"],
    lengths: ["35cm", "50cm"],
    price: 429.9,
    shortDescription: "Fibra importada com brilho equilibrado e toque macio.",
    description:
      "Wig de fibra importada com recorte moderno e visual editorial, ideal para transformacoes rapidas com resultado luxuoso.",
    specifications: [
      "Fibra termo resistente ate 180C",
      "Franja estrategica",
      "Cap regulavel",
      "Baixa manutencao",
    ],
    images: ["/produtos/produto-2.jpeg", "/produtos/produto-4.jpeg"],
    isPremium: true,
    isFeatured: true,
    views: 742,
  },
  {
    id: "3",
    code: "AML-FB-014",
    slug: "front-lace-safira-fibra",
    name: "Front Lace Safira",
    category: "Front Laces de Fibra Premium",
    material: "Fibra Premium",
    colors: ["Preto Onix", "Castanho Escuro"],
    lengths: ["30cm", "40cm"],
    price: 389.9,
    shortDescription: "Leve, elegante e de aplicacao rapida para o dia a dia.",
    description:
      "Front lace em fibra premium de acabamento discreto, perfeita para quem busca praticidade sem abrir mao de um visual refinado.",
    specifications: ["Risco frontal natural", "Tela leve", "Termo resistente", "Alta durabilidade"],
    images: ["/produtos/produto-3.jpeg", "/produtos/produto-1.jpeg"],
    isOnSale: true,
    views: 510,
  },
  {
    id: "4",
    code: "AML-HW-033",
    slug: "peruca-imperial-cabelo-humano",
    name: "Peruca Imperial",
    category: "Perucas de Cabelo Humano",
    material: "Cabelo Humano",
    colors: ["Castanho Avela", "Chocolate", "Preto Onix"],
    lengths: ["40cm", "55cm", "70cm"],
    price: 1299.9,
    shortDescription: "Modelagem de atelier com caimento de alta costura.",
    description:
      "Peruca premium produzida com cabelo humano selecionado para quem exige performance, durabilidade e uma presenca elegante.",
    specifications: [
      "Lace HD invisivel",
      "Durabilidade superior",
      "Base reforcada",
      "Customizacao de reparticao",
    ],
    images: ["/produtos/produto-4.jpeg", "/produtos/produto-2.jpeg", "/produtos/produto-1.jpeg"],
    isPremium: true,
    isFeatured: true,
    views: 1350,
  },
  {
    id: "5",
    code: "AML-AC-021",
    slug: "kit-luxo-manutencao",
    name: "Kit Luxo de Manutencao",
    category: "Acessorios",
    material: "Acessorios",
    colors: ["Dourado", "Preto"],
    lengths: [],
    price: 149.9,
    shortDescription: "Kit profissional para prolongar a vida util da lace.",
    description:
      "Conjunto com escova premium, fita, spray fixador e bolsa acetinada para preservar brilho, textura e acabamento.",
    specifications: ["4 itens", "Uso diario", "Bolsa premium", "Ideal para viagem"],
    images: ["/produtos/produto-2.jpeg", "/produtos/produto-3.jpeg"],
    isNew: true,
    views: 391,
  },
  {
    id: "6",
    code: "AML-WP-101",
    slug: "wig-velvet-black-premium",
    name: "Wig Velvet Black",
    category: "Wigs Premium",
    material: "Fibra Premium",
    colors: ["Preto Onix", "Castanho Escuro"],
    lengths: ["45cm", "60cm"],
    price: 679.9,
    shortDescription: "Textura aveludada e visual glam para ocasioes especiais.",
    description:
      "Wig premium com movimento impecavel, densidade equilibrada e acabamento para compor looks sofisticados com conforto.",
    specifications: ["Densidade 150%", "Toque macio", "Conforto prolongado", "Cap ajustavel"],
    images: ["/produtos/produto-1.jpeg", "/produtos/produto-4.jpeg"],
    isPremium: true,
    isFeatured: true,
    views: 960,
  },
];

export const STORE_BENEFITS = [
  "Curadoria premium com padrao internacional",
  "Envio seguro para todo o Brasil",
  "Atendimento consultivo no WhatsApp",
  "Garantia de autenticidade e qualidade",
];

export const TESTIMONIALS = [
  {
    name: "Camila R.",
    text: "A qualidade e absurda. A lace chegou perfeita e o atendimento foi impecavel.",
  },
  {
    name: "Juliana S.",
    text: "Comprei duas perucas e parecia experiencia de loja de luxo internacional.",
  },
  {
    name: "Renata M.",
    text: "Visual elegante e o suporte no WhatsApp facilitou tudo do inicio ao fim.",
  },
];

export const FAQ = [
  {
    q: "Quanto tempo leva para enviar?",
    a: "Produtos a pronta entrega sao enviados em ate 24h uteis. Itens personalizados podem levar ate 7 dias uteis.",
  },
  {
    q: "As pecas aceitam calor?",
    a: "As pecas de cabelo humano aceitam modelagem completa. Fibras premium suportam temperaturas especificadas na descricao.",
  },
  {
    q: "Posso receber orientacao para escolher?",
    a: "Sim. Nossa consultoria no WhatsApp ajuda a escolher cor, comprimento e modelo ideal para voce.",
  },
];

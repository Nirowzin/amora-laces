import { CartItem, Product } from "@/lib/types";

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function encode(message: string) {
  return encodeURIComponent(message);
}

export function buildProductWhatsAppMessage(params: {
  product: Product;
  quantity: number;
  color?: string;
  length?: string;
  customerName: string;
  phone: string;
  city?: string;
  notes?: string;
  productUrl: string;
}) {
  const {
    product,
    quantity,
    color,
    length,
    customerName,
    phone,
    city,
    notes,
    productUrl,
  } = params;

  const effectivePrice = product.promoPrice ?? product.price;

  return [
    "Ola! Gostaria de fazer um pedido na AMORA LACES.",
    "",
    "🛍 Produto:",
    product.name,
    "",
    "🏷 Codigo:",
    product.code,
    "",
    "💰 Preco:",
    formatBRL(effectivePrice),
    "",
    "📦 Quantidade:",
    String(quantity),
    "",
    "🎨 Cor:",
    color ?? "Nao informado",
    "",
    "📏 Comprimento:",
    length ?? "Nao informado",
    "",
    "👤 Nome:",
    customerName,
    "",
    "📱 Telefone:",
    phone,
    "",
    "🏙 Cidade:",
    city || "Nao informado",
    "",
    "📝 Observacoes:",
    notes || "Sem observacoes",
    "",
    "Link do produto:",
    productUrl,
  ].join("\n");
}

export function buildCartWhatsAppMessage(params: {
  items: CartItem[];
  customerName: string;
  phone: string;
}) {
  const { items, customerName, phone } = params;
  const lines = ["Ola!", "", "Gostaria de solicitar um orcamento.", "", "Itens escolhidos:", ""];

  let total = 0;

  items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    lines.push(`${index + 1})`);
    lines.push("");
    lines.push("Produto:");
    lines.push(item.productName);
    lines.push("");
    lines.push("Quantidade:");
    lines.push(String(item.quantity));
    lines.push("");
    lines.push("Preco:");
    lines.push(formatBRL(lineTotal));
    lines.push("");
    lines.push("--------------------");
    lines.push("");
  });

  lines.push("Total estimado:");
  lines.push("");
  lines.push(formatBRL(total));
  lines.push("");
  lines.push("Nome:");
  lines.push(customerName);
  lines.push("");
  lines.push("Telefone:");
  lines.push(phone);

  return lines.join("\n");
}

export function buildWhatsAppLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encode(message)}`;
}

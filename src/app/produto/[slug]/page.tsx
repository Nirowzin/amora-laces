import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/mock-data";
import { ProductGallery } from "@/components/product/product-gallery";
import { Badge } from "@/components/ui/badge";
import { formatBRL } from "@/lib/whatsapp";
import ProductBuySection from "./product-buy-section";
import { ProductCard } from "@/components/product/product-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Produto" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const related = PRODUCTS.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.code,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.promoPrice ?? product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {product.isPremium && <Badge variant="premium">Premium</Badge>}
            {product.isNew && <Badge>Novo</Badge>}
            {product.isOnSale && <Badge variant="sale">Promocao</Badge>}
          </div>

          <div>
            <h1 className="font-serif text-5xl leading-tight text-[#101010]">{product.name}</h1>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[#101010]/50">Codigo: {product.code}</p>
          </div>

          <div>
            {product.promoPrice ? <p className="text-sm text-[#101010]/40 line-through">{formatBRL(product.price)}</p> : null}
            <p className="text-3xl font-semibold text-[#c45b7a]">{formatBRL(product.promoPrice ?? product.price)}</p>
          </div>

          <p className="text-[#101010]/75">{product.description}</p>

          <div>
            <h2 className="mb-2 font-medium text-[#101010]">Especificacoes</h2>
            <ul className="grid gap-2 text-sm text-[#101010]/70">
              {product.specifications.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          {product.videos?.[0] ? (
            <div className="overflow-hidden rounded-2xl border border-[#101010]/10">
              <iframe
                src={product.videos[0]}
                title="Video do produto"
                className="h-56 w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}

          <ProductBuySection product={product} />
        </div>
      </div>

      {related.length > 0 ? (
        <div className="mt-16">
          <h2 className="mb-6 font-serif text-4xl text-[#101010]">Produtos relacionados</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

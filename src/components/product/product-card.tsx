"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { formatBRL } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  const price = product.promoPrice ?? product.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-[0_20px_50px_rgba(16,16,16,0.08)] backdrop-blur"
    >
      <Link href={`/produto/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {product.isPremium && <Badge variant="premium">Premium</Badge>}
          {product.isOnSale && <Badge variant="sale">Promocao</Badge>}
          {product.isNew && <Badge>Novo</Badge>}
        </div>

        <div>
          <h3 className="font-serif text-xl text-[#101010]">{product.name}</h3>
          <p className="text-xs uppercase tracking-[0.14em] text-[#101010]/55">{product.category}</p>
        </div>

        <p className="line-clamp-2 text-sm text-[#101010]/70">{product.shortDescription}</p>

        <div className="flex items-end justify-between">
          <div>
            {product.promoPrice ? (
              <p className="text-xs text-[#101010]/40 line-through">{formatBRL(product.price)}</p>
            ) : null}
            <p className="text-lg font-semibold text-[#c45b7a]">{formatBRL(price)}</p>
          </div>

          <Button asChild size="sm" variant="gold">
            <Link href={`/produto/${product.slug}`}>Ver produto</Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

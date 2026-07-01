"use client";

import { useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";
import { Product } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

type Props = {
  products: Product[];
};

const PAGE_SIZE = 6;

export function CatalogClient({ products }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [material, setMaterial] = useState("Todos");
  const [color, setColor] = useState("Todos");
  const [length, setLength] = useState("Todos");
  const [price, setPrice] = useState("Todos");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const endRef = useRef<HTMLDivElement>(null);
  const inView = useInView(endRef, { margin: "200px" });

  if (inView && visible < products.length) {
    setTimeout(() => setVisible((n) => n + PAGE_SIZE), 150);
  }

  const allColors = useMemo(
    () => Array.from(new Set(products.flatMap((product) => product.colors))),
    [products],
  );

  const allLengths = useMemo(
    () => Array.from(new Set(products.flatMap((product) => product.lengths))),
    [products],
  );

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const value = `${product.name} ${product.code} ${product.description}`.toLowerCase();
      const searchOk = value.includes(query.toLowerCase());
      const categoryOk = category === "Todos" || product.category === category;
      const materialOk = material === "Todos" || product.material === material;
      const colorOk = color === "Todos" || product.colors.includes(color);
      const lengthOk = length === "Todos" || product.lengths.includes(length);

      const effectivePrice = product.promoPrice ?? product.price;
      const priceOk =
        price === "Todos" ||
        (price === "ate400" && effectivePrice <= 400) ||
        (price === "400a800" && effectivePrice > 400 && effectivePrice <= 800) ||
        (price === "acima800" && effectivePrice > 800);

      return searchOk && categoryOk && materialOk && colorOk && lengthOk && priceOk;
    });
  }, [category, color, length, material, price, products, query]);

  const sliced = filtered.slice(0, visible);

  return (
    <div className="space-y-8">
      <div className="grid gap-3 rounded-3xl border border-white/40 bg-white/65 p-5 backdrop-blur md:grid-cols-6">
        <Input
          placeholder="Pesquisar por nome ou codigo"
          value={query}
          onChange={(e) => {
            setVisible(PAGE_SIZE);
            setQuery(e.target.value);
          }}
          className="md:col-span-2"
        />

        <select className="h-11 rounded-xl border border-[#d7d3cf] bg-white px-3 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Todos</option>
          {CATEGORIES.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <select className="h-11 rounded-xl border border-[#d7d3cf] bg-white px-3 text-sm" value={color} onChange={(e) => setColor(e.target.value)}>
          <option>Todos</option>
          {allColors.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <select className="h-11 rounded-xl border border-[#d7d3cf] bg-white px-3 text-sm" value={length} onChange={(e) => setLength(e.target.value)}>
          <option>Todos</option>
          {allLengths.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <select className="h-11 rounded-xl border border-[#d7d3cf] bg-white px-3 text-sm" value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="Todos">Todos os precos</option>
          <option value="ate400">Ate R$ 400</option>
          <option value="400a800">R$ 400 a R$ 800</option>
          <option value="acima800">Acima de R$ 800</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sliced.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sliced.length < filtered.length ? (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
            Carregar mais
          </Button>
        </div>
      ) : null}

      <div ref={endRef} />
    </div>
  );
}

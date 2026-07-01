import type { Metadata } from "next";
import { CatalogClient } from "@/components/product/catalog-client";
import { PRODUCTS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Catalogo",
  description: "Explore o catalogo completo da AMORA LACES com filtros inteligentes.",
};

export default function CatalogPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-5xl text-[#101010]">Catalogo</h1>
        <p className="mt-2 text-sm text-[#101010]/65">
          Pesquisa instantanea, filtros completos e selecao premium para facilitar sua escolha.
        </p>
      </div>

      <CatalogClient products={PRODUCTS} />
    </section>
  );
}

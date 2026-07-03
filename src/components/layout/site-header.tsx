"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function SiteHeader() {
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.setOpen);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-[#f7f3ef]/75 backdrop-blur-lg">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3" aria-label="AMORA LACES">
          <Image
            src="/brand/logo-amora.jpg"
            alt="Logo AMORA LACES"
            width={44}
            height={44}
            className="rounded-full border border-[#101010]/10 object-cover"
            priority
          />
          <span className="font-serif text-xl tracking-[0.25em] text-[#101010] sm:text-2xl">AMORA LACES</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[#101010]/80 md:flex">
          <Link href="/catalogo" className="transition hover:text-[#c45b7a]">
            Catalogo
          </Link>
          <Link href="/#novidades" className="transition hover:text-[#c45b7a]">
            Novidades
          </Link>
          <Link href="/#beneficios" className="transition hover:text-[#c45b7a]">
            Beneficios
          </Link>
          <Link href="/#faq" className="transition hover:text-[#c45b7a]">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="size-5" />
          </Button>
          <Button
            variant="outline"
            className="relative"
            onClick={() => openCart(true)}
            aria-label="Abrir sacola"
          >
            <ShoppingBag className="size-4" />
            Sacola
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex size-5 items-center justify-center rounded-full bg-[#c45b7a] text-[11px] text-white">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

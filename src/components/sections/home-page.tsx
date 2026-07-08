"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FAQ, PRODUCTS, STORE_BENEFITS, TESTIMONIALS } from "@/lib/mock-data";

const featured = PRODUCTS.filter((item) => item.isFeatured).slice(0, 3);
const news = PRODUCTS.filter((item) => item.isNew).slice(0, 3);
const sales = PRODUCTS.filter((item) => item.isOnSale).slice(0, 3);
const mostViewed = [...PRODUCTS].sort((a, b) => b.views - a.views).slice(0, 3);

export function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_25%,rgba(127,38,61,0.14),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(184,144,79,0.18),transparent_40%),linear-gradient(180deg,#f7f3ef_0%,#f3efea_38%,#f7f3ef_100%)]" />

      <section className="relative flex min-h-[calc(100vh-5rem)] items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge variant="premium" className="mb-4">Luxo em cada detalhe</Badge>
            <h1 className="font-serif text-5xl leading-tight text-[#101010] sm:text-6xl md:text-7xl">
              Elegancia de atelier
              <span className="block text-[#c45b7a]">para sua melhor versao</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-[#101010]/70 sm:text-lg">
              Front laces e wigs premium com acabamento impecavel, curadoria sofisticada e atendimento consultivo para voce comprar com seguranca no WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link href="/catalogo">
                  Explorar catalogo <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#beneficios">Conhecer beneficios</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="relative overflow-hidden rounded-[2.2rem] border border-white/40 bg-white/25 p-4 shadow-[0_30px_100px_rgba(16,16,16,0.18)] backdrop-blur-md"
          >
            <img
              src="/novidades/WhatsApp Image 2026-07-08 at 08.58.29 (1).jpeg"
              alt="Modelo usando lace premium"
              className="h-[58vh] w-full rounded-[1.6rem] object-cover"
            />
            <div className="absolute bottom-8 left-8 rounded-2xl border border-white/30 bg-black/35 p-4 text-[#f7f3ef] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-[#f7f3ef]/75">Editorial Collection</p>
              <p className="font-serif text-2xl">AMORA Signature</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Front Laces Premium", "Wigs de Alto Padrao", "Acessorios Profissionais"].map((item) => (
            <Card key={item}>
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#101010]/50">Categoria</p>
                <h3 className="mt-2 font-serif text-3xl text-[#101010]">{item}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <ProductShowcase id="destaques" title="Produtos em destaque" items={featured} />
      <ProductShowcase id="novidades" title="Novidades" items={news} />
      <ProductShowcase id="promocoes" title="Promocoes" items={sales} />
      <ProductShowcase id="mais-vistos" title="Mais visualizados" items={mostViewed} />

      <section id="beneficios" className="mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "Garantia Premium" },
            { icon: Truck, title: "Envio Seguro" },
            { icon: Sparkles, title: "Curadoria de Luxo" },
            { icon: ShieldCheck, title: "Atendimento Especialista" },
          ].map(({ icon: Icon, title }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="rounded-3xl border border-white/50 bg-white/70 p-6"
            >
              <Icon className="mb-3 size-5 text-[#c45b7a]" />
              <h3 className="font-serif text-2xl text-[#101010]">{title}</h3>
              <p className="mt-2 text-sm text-[#101010]/65">{STORE_BENEFITS[idx] || STORE_BENEFITS[0]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8" id="instagram">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-4xl text-[#101010]">Instagram</h2>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm text-[#c45b7a]">
            Ver perfil
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((item) => (
            <img key={item.id} src={item.images[0]} alt={item.name} className="aspect-square w-full rounded-2xl object-cover" />
          ))}
        </div>
      </section>

      <section id="avaliacoes" className="mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-serif text-4xl text-[#101010]">Avaliacoes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Card key={item.name}>
              <CardContent className="p-6">
                <p className="text-sm text-[#101010]/75">"{item.text}"</p>
                <p className="mt-4 text-sm font-medium text-[#c45b7a]">{item.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto mt-20 w-full max-w-4xl px-4 pb-12 sm:px-6">
        <h2 className="mb-6 text-center font-serif text-4xl text-[#101010]">Perguntas frequentes</h2>
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible>
              {FAQ.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ProductShowcase({ id, title, items }: { id: string; title: string; items: typeof PRODUCTS }) {
  return (
    <section id={id} className="mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-serif text-4xl text-[#101010]">{title}</h2>
        <Button asChild variant="ghost">
          <Link href="/catalogo">Ver tudo</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}

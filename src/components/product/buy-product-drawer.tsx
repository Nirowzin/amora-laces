"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { buildProductWhatsAppMessage, buildWhatsAppLink, formatBRL } from "@/lib/whatsapp";
import { DEFAULT_SETTINGS } from "@/lib/constants";

type Props = {
  product: Product;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function BuyProductDrawer({ product, open, setOpen }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [length, setLength] = useState(product.lengths[0] ?? "");
  const [notes, setNotes] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  const effectivePrice = product.promoPrice ?? product.price;
  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  const link = useMemo(() => {
    const message = buildProductWhatsAppMessage({
      product,
      quantity,
      color,
      length,
      notes,
      customerName: customerName || "Nao informado",
      phone: phone || "Nao informado",
      city,
      productUrl,
    });

    return buildWhatsAppLink(DEFAULT_SETTINGS.whatsappNumber, message);
  }, [city, color, customerName, length, notes, phone, product, productUrl, quantity]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="mx-auto w-full max-w-3xl">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#101010]/10">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-3xl text-[#101010]">{product.name}</h3>
              <p className="text-sm text-[#101010]/60">Codigo: {product.code}</p>
              <p className="text-lg font-semibold text-[#c45b7a]">{formatBRL(effectivePrice)}</p>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#101010]/10 bg-white/70 p-4">
              <div className="flex items-center justify-between">
                <Label>Quantidade</Label>
                <div className="inline-flex items-center gap-3 rounded-full border border-[#101010]/20 px-3 py-1">
                  <button onClick={() => setQuantity((n) => Math.max(1, n - 1))}>
                    <Minus className="size-4" />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity((n) => n + 1)}>
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              {product.colors.length > 0 && (
                <div className="space-y-1">
                  <Label>Cor</Label>
                  <Input value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
              )}

              {product.lengths.length > 0 && (
                <div className="space-y-1">
                  <Label>Comprimento</Label>
                  <Input value={length} onChange={(e) => setLength(e.target.value)} />
                </div>
              )}

              <div className="space-y-1">
                <Label>Nome</Label>
                <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
              </div>

              <div className="space-y-1">
                <Label>Telefone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div className="space-y-1">
                <Label>Cidade (opcional)</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <div className="space-y-1">
                <Label>Observacoes</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                variant="outline"
                onClick={() => {
                  addItem({
                    productId: product.id,
                    productName: product.name,
                    productCode: product.code,
                    productSlug: product.slug,
                    price: effectivePrice,
                    quantity,
                    color,
                    length,
                    image: product.images[0],
                  });
                  setOpen(false);
                }}
              >
                Adicionar na Sacola
              </Button>

              <Button asChild variant="gold">
                <a href={link} target="_blank" rel="noreferrer">
                  Finalizar pelo WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

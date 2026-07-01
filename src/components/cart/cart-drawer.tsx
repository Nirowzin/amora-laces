"use client";

import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { buildCartWhatsAppMessage, buildWhatsAppLink, formatBRL } from "@/lib/whatsapp";
import { DEFAULT_SETTINGS } from "@/lib/constants";

export function CartDrawer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isOpen = useCartStore((state) => state.isOpen);
  const setOpen = useCartStore((state) => state.setOpen);
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQuantity);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const canSend = items.length > 0 && name.trim().length >= 2 && phone.trim().length >= 8;

  const waLink = buildWhatsAppLink(
    DEFAULT_SETTINGS.whatsappNumber,
    buildCartWhatsAppMessage({
      items,
      customerName: name || "Nao informado",
      phone: phone || "Nao informado",
    }),
  );

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className="mx-auto w-full max-w-2xl">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <div>
            <h3 className="font-serif text-3xl text-[#101010]">Sacola de Compras</h3>
            <p className="text-sm text-[#101010]/70">Finalize seu pedido direto no WhatsApp.</p>
          </div>

          <div className="max-h-[38vh] space-y-3 overflow-y-auto pr-1">
            {items.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[#101010]/20 p-6 text-sm text-[#101010]/70">
                Sua sacola esta vazia.
              </p>
            ) : (
              items.map((item) => (
                <div key={item.lineId} className="rounded-2xl border border-[#101010]/10 bg-white/80 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-[#101010]">{item.productName}</p>
                      <p className="text-xs text-[#101010]/60">Codigo: {item.productCode}</p>
                      <p className="text-xs text-[#101010]/60">
                        {item.color ? `Cor: ${item.color} ` : ""}
                        {item.length ? `| Comprimento: ${item.length}` : ""}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => remove(item.lineId)}>
                      <Trash2 className="size-4 text-[#7f263d]" />
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#101010]/15 px-2 py-1">
                      <button onClick={() => updateQty(item.lineId, Math.max(1, item.quantity - 1))}>
                        <Minus className="size-4" />
                      </button>
                      <span className="min-w-6 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQty(item.lineId, item.quantity + 1)}>
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <p className="font-medium text-[#101010]">{formatBRL(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Seu telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[#101010]/70">Total estimado</p>
            <p className="text-xl font-semibold text-[#101010]">{formatBRL(total)}</p>
          </div>

          <Button
            asChild
            variant="gold"
            className="h-12 w-full"
            aria-disabled={!canSend}
            onClick={() => {
              if (canSend) {
                setOpen(false);
              }
            }}
          >
            <a href={canSend ? waLink : "#"} target="_blank" rel="noreferrer">
              Finalizar Pedido pelo WhatsApp
            </a>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

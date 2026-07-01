"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BuyProductDrawer } from "@/components/product/buy-product-drawer";
import { Product } from "@/lib/types";

export default function ProductBuySection({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="gold" size="lg" className="w-full sm:w-auto" onClick={() => setOpen(true)}>
        Comprar
      </Button>
      <BuyProductDrawer product={product} open={open} setOpen={setOpen} />
    </>
  );
}

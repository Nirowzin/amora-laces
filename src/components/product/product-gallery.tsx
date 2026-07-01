"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/40"
        onClick={() => setLightboxOpen(true)}
      >
        <Image src={images[active]} alt={name} fill className="object-cover" />
      </button>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            className={`relative aspect-square overflow-hidden rounded-2xl border ${
              active === index ? "border-[#7f263d]" : "border-white/40"
            }`}
            onClick={() => setActive(index)}
          >
            <Image src={image} alt={`${name} ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl bg-black p-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <Image src={images[active]} alt={name} fill className="object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

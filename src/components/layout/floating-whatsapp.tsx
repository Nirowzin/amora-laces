"use client";

import { MessageCircle } from "lucide-react";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const href = buildWhatsAppLink(
    DEFAULT_SETTINGS.whatsappNumber,
    "Ola! Vim pelo site da AMORA LACES e gostaria de atendimento.",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle className="size-5" />
      WhatsApp
    </a>
  );
}

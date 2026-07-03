import { StoreSettings } from "@/lib/types";

export const DEFAULT_SETTINGS: StoreSettings = {
  brandName: "AMORA LACES",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511960291282",
  instagramUrl: "https://instagram.com",
  adminSecretPath: process.env.NEXT_PUBLIC_ADMIN_SECRET_PATH ?? "atelier-amora-privado",
};

export const CATEGORIES = [
  "Front Laces de Fibra Premium",
  "Front Laces de Cabelo Humano",
  "Wigs Premium",
  "Perucas de Fibra Importada",
  "Perucas de Cabelo Humano",
  "Acessorios",
] as const;

export const SITE_COLORS = {
  ivory: "#f7f3ef",
  black: "#101010",
  gold: "#d4a56b",
  marsala: "#c45b7a",
  softGray: "#d7d3cf",
};

import type { Metadata } from "next";
import { HomePage } from "@/components/sections/home-page";

export const metadata: Metadata = {
  title: "Home",
  description: "Colecao premium de front laces e wigs da AMORA LACES.",
};

export default function Home() {
  return <HomePage />;
}

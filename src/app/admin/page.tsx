"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { PlusCircle, RefreshCcw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Product } from "@/lib/types";
import { PRODUCTS } from "@/lib/mock-data";

const EMPTY_PRODUCT: Product = {
  id: "",
  code: "",
  slug: "",
  name: "",
  category: "",
  material: "",
  colors: [],
  lengths: [],
  price: 0,
  shortDescription: "",
  description: "",
  specifications: [],
  images: [],
  views: 0,
};

export default function AdminPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [tab, setTab] = useState<"produtos" | "conteudo" | "aparencia" | "config">("produtos");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editing, setEditing] = useState<Product>(PRODUCTS[0] ?? EMPTY_PRODUCT);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setLogged(true);
      }
    });
  }, [supabase]);

  async function login() {
    if (!supabase) {
      setMessage("Configure as variaveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      return;
    }

    setLogged(true);
    setMessage("Login realizado com sucesso.");
  }

  function duplicateProduct() {
    const copy: Product = {
      ...editing,
      id: crypto.randomUUID(),
      code: `${editing.code}-COPY`,
      slug: `${editing.slug}-copy-${Date.now()}`,
      name: `${editing.name} (Copia)`,
    };
    setProducts((prev) => [copy, ...prev]);
    setEditing(copy);
  }

  function saveLocal() {
    setProducts((prev) => {
      const exists = prev.some((product) => product.id === editing.id);
      if (exists) {
        return prev.map((product) => (product.id === editing.id ? editing : product));
      }
      return [{ ...editing, id: crypto.randomUUID() }, ...prev];
    });
    setMessage("Alteracoes salvas localmente. Para persistir, conecte a tabela products no Supabase.");
  }

  async function saveSupabase() {
    if (!supabase) {
      setMessage("Supabase nao configurado.");
      return;
    }

    const payload = {
      id: editing.id || crypto.randomUUID(),
      code: editing.code,
      slug: editing.slug,
      name: editing.name,
      category: editing.category,
      material: editing.material,
      colors: editing.colors,
      lengths: editing.lengths,
      price: editing.price,
      promo_price: editing.promoPrice ?? null,
      short_description: editing.shortDescription,
      description: editing.description,
      specifications: editing.specifications,
      images: editing.images,
      videos: editing.videos ?? [],
      is_new: editing.isNew ?? false,
      is_premium: editing.isPremium ?? false,
      is_on_sale: editing.isOnSale ?? false,
      is_featured: editing.isFeatured ?? false,
    };

    const { error } = await supabase.from("products").upsert(payload);
    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Produto salvo no Supabase.");
  }

  async function removeProduct() {
    if (!editing.id) return;
    setProducts((prev) => prev.filter((product) => product.id !== editing.id));

    if (supabase) {
      await supabase.from("products").delete().eq("id", editing.id);
    }

    setEditing(EMPTY_PRODUCT);
    setMessage("Produto removido.");
  }

  if (!logged) {
    return (
      <section className="min-h-screen bg-[#0b0b0f] px-4 py-20 text-white">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="font-serif text-4xl">Painel AMORA</h1>
          <p className="mt-2 text-sm text-white/70">Acesso restrito</p>

          <div className="mt-6 space-y-3">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/10 text-white" />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 text-white"
            />
            <Button className="w-full" onClick={login}>
              Entrar
            </Button>
            {message ? <p className="text-xs text-amber-300">{message}</p> : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-5xl">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(EMPTY_PRODUCT)}>
              <PlusCircle className="size-4" /> Novo produto
            </Button>
            <Button variant="outline" onClick={duplicateProduct}>
              <RefreshCcw className="size-4" /> Duplicar
            </Button>
            <Button variant="gold" onClick={saveLocal}>
              <Save className="size-4" /> Salvar
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            ["produtos", "Produtos"],
            ["conteudo", "Conteudo"],
            ["aparencia", "Aparencia"],
            ["config", "Configuracoes"],
          ].map(([value, label]) => (
            <Button key={value} variant={tab === value ? "gold" : "outline"} onClick={() => setTab(value as typeof tab)}>
              {label}
            </Button>
          ))}
        </div>

        {tab === "produtos" ? (
          <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
            <Card className="border-white/10 bg-white/5">
              <CardContent className="max-h-[72vh] space-y-2 overflow-y-auto p-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setEditing(product)}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-left transition hover:border-[#b8904f]/40"
                  >
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-white/60">{product.code}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardContent className="space-y-4 p-6">
                <h2 className="font-serif text-3xl">Editor de Produto</h2>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Nome" value={editing.name} onChange={(value) => setEditing({ ...editing, name: value })} />
                  <Field label="Codigo" value={editing.code} onChange={(value) => setEditing({ ...editing, code: value })} />
                  <Field label="Slug" value={editing.slug} onChange={(value) => setEditing({ ...editing, slug: value })} />
                  <Field label="Categoria" value={editing.category} onChange={(value) => setEditing({ ...editing, category: value })} />
                  <Field label="Material" value={editing.material} onChange={(value) => setEditing({ ...editing, material: value })} />
                  <Field
                    label="Preco"
                    value={String(editing.price)}
                    onChange={(value) => setEditing({ ...editing, price: Number(value || 0) })}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Descricao curta</Label>
                  <Textarea
                    value={editing.shortDescription}
                    onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                    className="bg-white/10 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Descricao completa</Label>
                  <Textarea
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="bg-white/10 text-white"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <Field
                    label="Cores (virgula)"
                    value={editing.colors.join(",")}
                    onChange={(value) => setEditing({ ...editing, colors: value.split(",").map((i) => i.trim()).filter(Boolean) })}
                  />
                  <Field
                    label="Comprimentos"
                    value={editing.lengths.join(",")}
                    onChange={(value) => setEditing({ ...editing, lengths: value.split(",").map((i) => i.trim()).filter(Boolean) })}
                  />
                  <Field
                    label="Imagens URL"
                    value={editing.images.join(",")}
                    onChange={(value) => setEditing({ ...editing, images: value.split(",").map((i) => i.trim()).filter(Boolean) })}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={saveSupabase}>
                    Salvar no Supabase
                  </Button>
                  <Button variant="outline" onClick={removeProduct}>
                    <Trash2 className="size-4" /> Excluir
                  </Button>
                </div>

                {message ? <p className="text-sm text-amber-300">{message}</p> : null}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-white/10 bg-white/5">
            <CardContent className="space-y-3 p-6 text-sm text-white/80">
              <p>
                Esta area esta preparada para gestao de banners, videos, logo, cores do site, textos, WhatsApp e redes sociais.
              </p>
              <p>
                As tabelas sugeridas para persistencia estao em supabase/schema.sql e podem ser conectadas rapidamente nesta interface.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="bg-white/10 text-white" />
    </div>
  );
}

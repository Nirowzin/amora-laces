import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[#101010]/10 bg-[#101010] text-[#f7f3ef]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-amora.jpg"
              alt="Logo AMORA LACES"
              width={42}
              height={42}
              className="rounded-full border border-white/20 object-cover"
            />
            <h3 className="font-serif text-2xl tracking-[0.14em]">AMORA LACES</h3>
          </div>
          <p className="text-sm text-[#f7f3ef]/70">
            Front laces e wigs premium para mulheres que desejam presenca, elegancia e autenticidade.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm uppercase tracking-[0.2em] text-[#d4a56b]">Institucional</h4>
          <ul className="space-y-2 text-sm text-[#f7f3ef]/80">
            <li>
              <Link href="/#beneficios">Diferenciais</Link>
            </li>
            <li>
              <Link href="/#avaliacoes">Avaliacoes</Link>
            </li>
            <li>
              <Link href="/#faq">Perguntas frequentes</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm uppercase tracking-[0.2em] text-[#d4a56b]">Catalogo</h4>
          <ul className="space-y-2 text-sm text-[#f7f3ef]/80">
            <li>Front Laces</li>
            <li>Wigs Premium</li>
            <li>Perucas de Cabelo Humano</li>
            <li>Acessorios</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm uppercase tracking-[0.2em] text-[#d4a56b]">Contato</h4>
          <ul className="space-y-2 text-sm text-[#f7f3ef]/80">
            <li>WhatsApp: (11) 96029-1282</li>
            <li>Instagram: @amoralaces</li>
            <li>Atendimento: seg a sex, 9h as 19h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-[#f7f3ef]/60">
        {new Date().getFullYear()} AMORA LACES. Todos os direitos reservados.
      </div>
    </footer>
  );
}

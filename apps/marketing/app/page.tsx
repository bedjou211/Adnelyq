import { Button } from "@adnelyq/ui";
import Link from "next/link";

const metrics = [
  ["38 400 DA", "Chiffre d’affaires livré"],
  ["14 200 DA", "Marge réelle estimée"],
  ["2,84×", "ROAS sur commandes livrées"]
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9f7]">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm text-white">A</span>
          Adnelyq
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#product">Produit</a>
          <a href="#method">Méthode</a>
          <a href="#markets">Marchés</a>
        </div>
        <a href="http://localhost:3001/register">
          <Button className="min-h-10 px-4">Créer mon espace</Button>
        </a>
      </nav>

      <section className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex rounded-full border border-brand/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-brand shadow-sm">
            Commerce intelligence · Algérie & MENA
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl">
            Vos publicités font des ventes. <span className="text-brand">Faites-les produire du profit.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
            Adnelyq relie vos campagnes, commandes COD, livraisons et coûts pour révéler votre vraie marge — puis transforme chaque signal en action claire.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="http://localhost:3001/register"><Button className="w-full sm:w-auto">Démarrer gratuitement →</Button></a>
            <a href="#product"><Button variant="secondary" className="w-full sm:w-auto">Découvrir le produit</Button></a>
          </div>
          <p className="mt-5 text-sm text-muted">Aucune carte requise · Français, arabe et anglais · Pensé pour le COD</p>
        </div>

        <div id="product" className="relative">
          <div className="absolute -inset-8 rounded-full bg-lime/30 blur-3xl" />
          <div className="relative rounded-[28px] border border-white/80 bg-white p-4 shadow-[0_30px_90px_rgba(21,27,24,.14)]">
            <div className="rounded-2xl bg-ink p-6 text-white">
              <div className="flex items-center justify-between">
                <div><p className="text-xs uppercase tracking-[.16em] text-white/50">Aujourd’hui</p><p className="mt-1 font-semibold">Vue performance</p></div>
                <span className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink">En direct</span>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {metrics.map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[.06] p-4">
                    <p className="text-xl font-semibold">{value}</p><p className="mt-2 text-xs leading-5 text-white/55">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-white p-5 text-ink">
                <div className="flex items-start gap-4"><span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-amber-400" /><div><p className="font-semibold">Fatigue créative détectée</p><p className="mt-1 text-sm leading-6 text-muted">Le CPA livré de “Atlas Video 2” a augmenté de 31 %. Testez deux nouveaux hooks avant d’augmenter le budget.</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-3 lg:px-10">
          {[['01', 'Mesurez le réel', 'Commandes confirmées, livrées, refusées et retournées remplacent les conversions déclaratives.'], ['02', 'Comprenez pourquoi', 'Un moteur déterministe détecte les anomalies avant toute interprétation par l’IA.'], ['03', 'Agissez chaque jour', 'Chaque recommandation devient une action priorisée, mesurable et améliorable.']].map(([number, title, copy]) => (
            <article key={number}><p className="text-sm font-bold text-brand">{number}</p><h2 className="mt-4 text-xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-muted">{copy}</p></article>
          ))}
        </div>
      </section>
      <section id="markets" className="bg-ink text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-12 md:flex-row md:items-center lg:px-10"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-lime">Conçu local, prêt à grandir</p><h2 className="mt-3 text-2xl font-semibold">Algérie d’abord. MENA et Europe ensuite.</h2></div><p className="max-w-xl text-sm leading-6 text-white/55">COD, DZD, français, arabe, RTL et abstraction des paiements sont intégrés à l’architecture dès le premier jour.</p></div></section>
    </main>
  );
}

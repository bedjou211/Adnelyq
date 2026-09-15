import { Button } from "@adnelyq/ui";
import { ArrowDownRight, ArrowUpRight, ChevronDown, CircleAlert, Sparkles } from "lucide-react";

import { PageHeading } from "../../../components/page-heading";

const kpis = [
  { label: "Chiffre d’affaires", value: "38 400 DA", change: "+12,4 %", good: true },
  { label: "Profit estimé", value: "14 200 DA", change: "+8,1 %", good: true },
  { label: "Dépenses Ads", value: "8 900 DA", change: "+4,3 %", good: false },
  { label: "ROAS livré", value: "2,84×", change: "+0,31", good: true }
];

const chart = [34, 48, 39, 63, 57, 72, 66, 88, 78, 94, 84, 100];

export default function DashboardPage() {
  return <>
    <PageHeading eyebrow="Lundi 14 septembre" title="Bonjour Celina, voici l’essentiel." description="Les chiffres ci-dessous reposent sur les commandes livrées et les coûts réels, pas uniquement sur l’attribution publicitaire." actions={<button className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold">7 derniers jours <ChevronDown size={15} /></button>} />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{kpis.map((kpi) => <article key={kpi.label} className="rounded-2xl border border-line bg-white p-5 shadow-card"><p className="text-sm text-muted">{kpi.label}</p><div className="mt-4 flex items-end justify-between gap-3"><p className="text-2xl font-semibold tracking-tight">{kpi.value}</p><span className={`flex items-center gap-1 text-xs font-bold ${kpi.good ? "text-emerald-700" : "text-amber-700"}`}>{kpi.good ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{kpi.change}</span></div><p className="mt-2 text-xs text-muted">vs. période précédente</p></article>)}</section>
    <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.75fr]">
      <article className="rounded-2xl border border-line bg-white p-5 shadow-card"><div className="flex items-start justify-between"><div><p className="font-semibold">Profit quotidien</p><p className="mt-1 text-xs text-muted">Revenu livré moins produit, livraison et publicité</p></div><span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">+18,2 %</span></div><div className="mt-10 flex h-56 items-end gap-2 border-b border-line px-2">{chart.map((height, index) => <div key={index} className="group relative flex-1"><div className="rounded-t-md bg-brand/15 transition group-hover:bg-brand" style={{ height: `${height * 1.9}px` }} /></div>)}</div><div className="mt-3 flex justify-between text-[10px] text-muted"><span>3 sept.</span><span>6 sept.</span><span>9 sept.</span><span>12 sept.</span><span>Aujourd’hui</span></div></article>
      <article className="rounded-2xl bg-ink p-6 text-white shadow-card"><div className="flex items-center gap-2 text-lime"><Sparkles size={17} /><p className="text-xs font-bold uppercase tracking-[.15em]">Analyse Adnelyq</p></div><h2 className="mt-6 text-2xl font-semibold leading-tight">Votre meilleur levier n’est pas le budget.</h2><p className="mt-4 text-sm leading-6 text-white/60">La fréquence de “Atlas Video 2” atteint 4,7 et son CPA livré a progressé de 31 % en quatre jours.</p><div className="mt-6 rounded-xl border border-white/10 bg-white/[.06] p-4"><div className="flex gap-3"><CircleAlert className="mt-0.5 shrink-0 text-amber-300" size={18} /><div><p className="text-sm font-semibold">Action prioritaire</p><p className="mt-1 text-xs leading-5 text-white/55">Créer deux variations de hook avant d’augmenter les dépenses.</p></div></div></div><Button className="mt-5 w-full bg-lime text-ink hover:bg-lime/90">Voir le plan d’action</Button></article>
    </section>
    <section className="mt-5 grid gap-5 md:grid-cols-3"><article className="rounded-2xl border border-line bg-white p-5 shadow-card"><p className="text-sm text-muted">Commandes</p><p className="mt-3 text-3xl font-semibold">42</p><div className="mt-5 h-2 rounded-full bg-stone-100"><div className="h-full w-[71%] rounded-full bg-brand" /></div><div className="mt-3 flex justify-between text-xs"><span className="text-muted">Confirmées</span><strong>71 %</strong></div></article><article className="rounded-2xl border border-line bg-white p-5 shadow-card"><p className="text-sm text-muted">Taux de livraison</p><p className="mt-3 text-3xl font-semibold">63,8 %</p><p className="mt-5 text-xs leading-5 text-muted">Objectif conseillé : <strong className="text-ink">70 % ou plus</strong></p></article><article className="rounded-2xl border border-line bg-white p-5 shadow-card"><p className="text-sm text-muted">CPA livré</p><p className="mt-3 text-3xl font-semibold">1 122 DA</p><p className="mt-5 text-xs leading-5 text-muted">Sous votre seuil de rentabilité de <strong className="text-ink">1 380 DA</strong></p></article></section>
  </>;
}

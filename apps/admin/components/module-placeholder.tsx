import { Button } from "@adnelyq/ui";

import { PageHeading } from "./page-heading";

export function ModulePlaceholder({ title, description, action, items }: { title: string; description: string; action: string; items: string[] }) {
  return <><PageHeading title={title} description={description} actions={<Button>{action}</Button>} /><section className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"><div className="grid grid-cols-[1.4fr_1fr_.7fr] border-b border-line bg-[#FAFBFA] px-5 py-3 text-xs font-semibold uppercase tracking-[.1em] text-muted"><span>Élément</span><span>État</span><span className="text-right">Action</span></div>{items.map((item, index) => <div key={item} className="grid grid-cols-[1.4fr_1fr_.7fr] items-center border-b border-line px-5 py-4 last:border-0"><div><p className="text-sm font-semibold">{item}</p><p className="mt-1 text-xs text-muted">Dernière activité aujourd’hui</p></div><span><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${index === 0 ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-600"}`}>{index === 0 ? "Actif" : "Brouillon"}</span></span><button className="text-right text-sm font-semibold text-brand">Ouvrir</button></div>)}</section></>;
}

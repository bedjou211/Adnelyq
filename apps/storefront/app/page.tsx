import Link from "next/link";

export default function StorefrontIndex() {
  return <main className="grid min-h-screen place-items-center p-8 text-center"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-brand">Adnelyq Storefront</p><h1 className="mt-4 text-4xl font-semibold">Une boutique commence par son adresse.</h1><p className="mt-4 text-muted">Ouvrez la boutique de démonstration pour valider le rendu local.</p><Link className="mt-8 inline-flex rounded-xl bg-ink px-5 py-3 font-semibold text-white" href="/atlas-belt">Voir la démo →</Link></div></main>;
}

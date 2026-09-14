import { Button } from "@adnelyq/ui";

interface StorePageProps { params: Promise<{ storeSlug: string }> }

function displayName(slug: string) {
  return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export default async function StorePage({ params }: StorePageProps) {
  const { storeSlug } = await params;
  const storeName = displayName(storeSlug);

  return (
    <main className="min-h-screen">
      <div className="bg-ink px-5 py-2 text-center text-xs font-semibold text-white">Livraison disponible dans les 58 wilayas</div>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6"><p className="text-xl font-black tracking-tight">{storeName}</p><span className="text-sm text-muted">Panier · 0</span></nav>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:py-20">
        <div className="aspect-square rounded-[2rem] bg-[radial-gradient(circle_at_65%_35%,#dce8de,transparent_35%),linear-gradient(135deg,#dde6df,#f4efe5)] p-10"><div className="flex h-full items-center justify-center rounded-full border border-white/70 bg-white/30 text-center text-sm font-semibold uppercase tracking-[.2em] text-brand">Visuel produit</div></div>
        <div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand">Nouveau · Best-seller</p><h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight">Le produit qui simplifie votre quotidien.</h1><p className="mt-6 text-lg leading-8 text-muted">Une vitrine rapide, claire et optimisée pour la commande avec paiement à la livraison.</p><div className="mt-8 flex items-end gap-3"><span className="text-3xl font-bold">4 900 DA</span><span className="pb-1 text-muted line-through">6 200 DA</span></div><Button className="mt-8 w-full sm:w-auto">Commander maintenant</Button><div className="mt-7 grid grid-cols-3 gap-3 text-center text-xs text-muted"><span>✓ Paiement à la livraison</span><span>✓ Livraison suivie</span><span>✓ Support local</span></div></div>
      </section>
    </main>
  );
}

"use client";

import { Button } from "@adnelyq/ui";
import { ArrowLeft, Check, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { createClient } from "../../lib/supabase/client";

const steps = ["Bienvenue", "Entreprise", "Marché", "Boutique", "Confirmation"];
const inputClass = "mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [country, setCountry] = useState("DZ");
  const [currency, setCurrency] = useState("DZD");
  const [locale, setLocale] = useState("fr");
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const slug = useMemo(() => slugify(storeName) || "ma-boutique", [storeName]);

  function canContinue() {
    if (step === 1) return businessName.trim().length >= 2;
    if (step === 3) return storeName.trim().length >= 2;
    return true;
  }

  async function finish() {
    setLoading(true); setError("");
    const supabase = createClient();
    if (!supabase) { setError("Supabase n’est pas configuré. Complétez votre fichier .env."); setLoading(false); return; }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) { setError("Votre session a expiré. Reconnectez-vous."); setLoading(false); return; }

    const uniqueSlug = `${slug}-${user.id.slice(0, 6)}`;
    const { error: onboardingError } = await supabase.rpc("complete_merchant_onboarding", {
      business_name: businessName.trim(),
      store_name: storeName.trim(),
      store_slug: uniqueSlug,
      country_code: country,
      currency_code: currency,
      timezone_name: Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Algiers",
      locale_code: locale
    });

    if (onboardingError) { setError(onboardingError.message); setLoading(false); return; }
    router.push("/dashboard"); router.refresh();
  }

  return <div className="w-full max-w-2xl">
    <div className="mb-10 flex items-center justify-between gap-2">{steps.map((label, index) => <div key={label} className="flex flex-1 items-center last:flex-none"><div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${index < step ? "bg-brand text-white" : index === step ? "bg-lime text-ink ring-4 ring-lime/20" : "bg-stone-200 text-muted"}`}>{index < step ? <Check size={14} /> : index + 1}</div>{index < steps.length - 1 && <div className={`mx-2 h-px flex-1 ${index < step ? "bg-brand" : "bg-line"}`} />}</div>)}</div>

    <section className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-9">
      {step === 0 && <div className="text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#E4EFE9] text-brand"><Store size={28} /></span><p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-brand">Bienvenue sur Adnelyq</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Créons votre première boutique.</h1><p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted">Quelques informations suffisent pour préparer votre espace, votre devise et votre future adresse publique.</p></div>}
      {step === 1 && <div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand">Votre activité</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Comment s’appelle votre entreprise ?</h1><p className="mt-3 text-sm leading-6 text-muted">Ce nom sera visible par les membres de votre organisation.</p><label className="mt-8 block text-sm font-semibold">Nom de l’entreprise<input autoFocus className={inputClass} value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Ex. Atlas Company" /></label></div>}
      {step === 2 && <div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand">Votre marché</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Adaptons les réglages locaux.</h1><div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Pays<select className={inputClass} value={country} onChange={(event) => { setCountry(event.target.value); if (event.target.value === "DZ") setCurrency("DZD"); }}><option value="DZ">Algérie</option><option value="FR">France</option><option value="SA">Arabie saoudite</option><option value="AE">Émirats arabes unis</option></select></label><label className="text-sm font-semibold">Devise<select className={inputClass} value={currency} onChange={(event) => setCurrency(event.target.value)}><option>DZD</option><option>EUR</option><option>USD</option><option>SAR</option><option>AED</option></select></label><label className="text-sm font-semibold sm:col-span-2">Langue principale<select className={inputClass} value={locale} onChange={(event) => setLocale(event.target.value)}><option value="fr">Français</option><option value="ar">العربية</option><option value="en">English</option></select></label></div></div>}
      {step === 3 && <div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand">Votre boutique</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Donnez-lui un nom mémorable.</h1><label className="mt-8 block text-sm font-semibold">Nom de la boutique<input autoFocus className={inputClass} value={storeName} onChange={(event) => setStoreName(event.target.value)} placeholder="Ex. Atlas Belt" /></label><div className="mt-5 rounded-xl bg-canvas p-4"><p className="text-xs text-muted">Adresse proposée</p><p className="mt-1 break-all text-sm font-semibold text-brand">{slug}.shop.adnelyq.com</p></div></div>}
      {step === 4 && <div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand">Confirmation</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Tout est prêt.</h1><div className="mt-7 divide-y divide-line rounded-2xl border border-line">{[["Entreprise", businessName], ["Boutique", storeName], ["Marché", `${country} · ${currency}`], ["Langue", locale.toUpperCase()]].map(([label, value]) => <div key={label} className="flex justify-between gap-5 px-5 py-4 text-sm"><span className="text-muted">{label}</span><strong>{value}</strong></div>)}</div></div>}

      {error && <p role="alert" className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="mt-9 flex items-center justify-between gap-3">{step > 0 ? <Button variant="ghost" onClick={() => setStep((current) => current - 1)}><ArrowLeft className="mr-2" size={16} /> Retour</Button> : <span />}<Button disabled={!canContinue() || loading} onClick={() => step === steps.length - 1 ? void finish() : setStep((current) => current + 1)}>{loading ? "Création…" : step === steps.length - 1 ? "Créer ma boutique" : "Continuer →"}</Button></div>
    </section>
  </div>;
}

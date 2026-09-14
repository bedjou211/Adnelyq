"use client";

import { Button } from "@adnelyq/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { createClient } from "../../lib/supabase/client";

type AuthMode = "login" | "register" | "forgot" | "reset";

const inputClass = "mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    const supabase = createClient();
    if (!supabase) { setError("Supabase n’est pas configuré. Renseignez les variables NEXT_PUBLIC_SUPABASE_*."); setLoading(false); return; }

    try {
      if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        const { data: membership } = await supabase
          .from("organization_members")
          .select("organizations(onboarding_completed_at)")
          .limit(1)
          .maybeSingle();
        const relation = membership?.organizations as
          | { onboarding_completed_at: string | null }
          | { onboarding_completed_at: string | null }[]
          | null
          | undefined;
        const organization = Array.isArray(relation) ? relation[0] : relation;
        router.push(organization?.onboarding_completed_at ? "/dashboard" : "/onboarding");
        router.refresh();
      } else if (mode === "register") {
        const callback = `${window.location.origin}/auth/callback?next=/onboarding`;
        const { error: authError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, business_name: businessName }, emailRedirectTo: callback } });
        if (authError) throw authError;
        setMessage("Compte créé. Consultez votre boîte email pour confirmer votre adresse.");
      } else if (mode === "forgot") {
        const callback = `${window.location.origin}/auth/callback?next=/reset-password`;
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: callback });
        if (authError) throw authError;
        setMessage("Si cette adresse existe, un lien de réinitialisation vient d’être envoyé.");
      } else {
        const { error: authError } = await supabase.auth.updateUser({ password });
        if (authError) throw authError;
        setMessage("Mot de passe mis à jour. Vous pouvez continuer vers votre espace.");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Une erreur inattendue est survenue.");
    } finally { setLoading(false); }
  }

  return <form onSubmit={submit} className="space-y-5">
    {mode === "register" && <><label className="block text-sm font-semibold">Votre nom<input className={inputClass} value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" required /></label><label className="block text-sm font-semibold">Nom de l’entreprise<input className={inputClass} value={businessName} onChange={(event) => setBusinessName(event.target.value)} required minLength={2} /></label></>}
    {mode !== "reset" && <label className="block text-sm font-semibold">Adresse email<input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required /></label>}
    {(mode === "login" || mode === "register" || mode === "reset") && <label className="block text-sm font-semibold">{mode === "reset" ? "Nouveau mot de passe" : "Mot de passe"}<input className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required /></label>}
    {mode === "login" && <div className="text-right"><Link href="/forgot-password" className="text-sm font-semibold text-brand">Mot de passe oublié ?</Link></div>}
    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {message && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
    <Button type="submit" className="w-full" disabled={loading}>{loading ? "Traitement…" : mode === "login" ? "Se connecter" : mode === "register" ? "Créer mon espace" : mode === "forgot" ? "Envoyer le lien" : "Mettre à jour"}</Button>
    {mode === "login" && <p className="text-center text-sm text-muted">Nouveau sur Adnelyq ? <Link href="/register" className="font-semibold text-brand">Créer un compte</Link></p>}
    {mode === "register" && <p className="text-center text-sm text-muted">Déjà inscrit ? <Link href="/login" className="font-semibold text-brand">Se connecter</Link></p>}
    {(mode === "forgot" || mode === "reset") && <p className="text-center text-sm"><Link href="/login" className="font-semibold text-brand">Retour à la connexion</Link></p>}
  </form>;
}

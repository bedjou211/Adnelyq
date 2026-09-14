import Link from "next/link";
import { MailCheck } from "lucide-react";

import { AuthShell } from "../../components/auth/auth-shell";

export default function VerifyEmailPage() { return <AuthShell eyebrow="Vérification" title="Confirmez votre adresse email." description="Cette étape protège votre organisation avant la création de votre boutique."><div className="rounded-2xl border border-line bg-white p-6 text-center shadow-card"><MailCheck className="mx-auto text-brand" size={34} /><p className="mt-4 text-sm leading-6 text-muted">Ouvrez le message envoyé par Adnelyq et cliquez sur le lien de confirmation.</p><Link href="/onboarding" className="mt-6 inline-flex text-sm font-semibold text-brand">Continuer vers ma boutique →</Link></div></AuthShell>; }

import { AuthForm } from "../../components/auth/auth-form";
import { AuthShell } from "../../components/auth/auth-shell";
export default function ForgotPasswordPage() { return <AuthShell eyebrow="Récupération" title="Retrouvez votre accès." description="Nous vous enverrons un lien sécurisé valable pour une durée limitée."><AuthForm mode="forgot" /></AuthShell>; }

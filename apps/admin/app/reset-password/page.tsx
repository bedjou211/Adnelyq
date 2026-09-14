import { AuthForm } from "../../components/auth/auth-form";
import { AuthShell } from "../../components/auth/auth-shell";
export default function ResetPasswordPage() { return <AuthShell eyebrow="Sécurité" title="Choisissez un nouveau mot de passe." description="Utilisez au moins huit caractères et évitez un mot de passe déjà employé ailleurs."><AuthForm mode="reset" /></AuthShell>; }

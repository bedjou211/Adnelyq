import { AuthForm } from "../../components/auth/auth-form";
import { AuthShell } from "../../components/auth/auth-shell";
export default function LoginPage() { return <AuthShell eyebrow="Connexion" title="Ravi de vous revoir." description="Accédez à vos boutiques, vos campagnes et votre marge réelle."><AuthForm mode="login" /></AuthShell>; }

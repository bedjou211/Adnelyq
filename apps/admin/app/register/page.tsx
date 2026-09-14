import { AuthForm } from "../../components/auth/auth-form";
import { AuthShell } from "../../components/auth/auth-shell";
export default function RegisterPage() { return <AuthShell eyebrow="Créer un compte" title="Votre commerce, enfin réuni." description="Créez votre organisation sécurisée. Votre première boutique sera configurée juste après."><AuthForm mode="register" /></AuthShell>; }

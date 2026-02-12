import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      toast({
        title: "Erreur de Validation",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Compte Existant",
              description:
                "Cet email est déjà enregistré. Veuillez vous connecter.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Échec de l'Inscription",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Vérifiez Votre Email",
            description:
              "Nous vous avons envoyé un email de confirmation. Veuillez vérifier votre email pour continuer.",
          });
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Identifiants Invalides",
              description:
                "L'email ou le mot de passe que vous avez entré est incorrect.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Échec de la Connexion",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          navigate("/admin");
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur inattendue s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-nature-gradient p-4">
      <Card className="w-full max-w-md border-0 shadow-elevated">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="/assets/mugix-logo.png" alt="Mugix" className="h-16" />
          </div>
          <CardTitle className="font-display text-2xl">
            {isSignUp ? "Créer un Compte" : "Connexion Admin"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "Inscrivez-vous pour accéder au tableau de bord"
              : "Connectez-vous pour gérer vos produits"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@mugix.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUp ? "Créer un Compte" : "Se Connecter"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isSignUp
                ? "Vous avez déjà un compte ? Se connecter"
                : "Pas de compte ? S'inscrire"}
            </button>
          </div>

          <p className="mt-4 text-xs text-center text-muted-foreground">
            Note : Les nouveaux comptes nécessitent l'attribution du rôle
            administrateur pour accéder au tableau de bord.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

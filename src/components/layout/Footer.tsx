import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img
                src="/assets/mugix-logo.png"
                alt="Mugix"
                className="h-14 brightness-0 invert"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Bouteilles réutilisables et mugs design éco-responsables. Des
              produits durables et stylés, livrés à votre porte.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Liens Rapides
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/products", label: "Produits" },
                { href: "/about", label: "À Propos" },
                { href: "/contact", label: "Nous Contacter" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Nous Contacter
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                +212679545622
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                hello@mugix.com
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                123 Crystal Spring Road,
                <br />
                Mountain Valley, CA 90210
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Restez Informé
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Recevez les dernières nouveautés et offres spéciales.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 bg-background/10 border border-background/20 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Rejoindre
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Mugix. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link
                to="#"
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Politique de Confidentialité
              </Link>
              <Link
                to="#"
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Conditions d'Utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

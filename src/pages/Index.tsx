import { Link } from "react-router-dom";
import {
  ArrowRight,
  Recycle,
  Paintbrush,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const features = [
  {
    icon: Recycle,
    title: "Matériaux Éco-responsables",
    description:
      "Conçus avec des matériaux durables et recyclables pour réduire votre empreinte écologique.",
  },
  {
    icon: ShieldCheck,
    title: "Qualité Certifiée",
    description:
      "Chaque produit est soumis à des contrôles rigoureux pour garantir durabilité et sécurité alimentaire.",
  },
  {
    icon: Paintbrush,
    title: "Design Unique",
    description:
      "Des créations originales alliant esthétique moderne et fonctionnalité au quotidien.",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Une livraison rapide et fiable directement à votre porte.",
  },
];

export default function Index() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.filter((p) => p.available).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end overflow-hidden -mt-14 lg:-mt-16 pb-20 lg:pb-28">
        {/* Hero background image */}
        <img
          src="/assets/heroImage.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle gradient overlay — only at the bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up drop-shadow-lg">
              Collection Premium
              <span className="text-white/70"> Bouteilles & Mugs</span>
            </h1>

            <p
              className="text-base md:text-lg text-white/90 mb-6 max-w-lg animate-fade-in-up drop-shadow-md"
              style={{ animationDelay: "0.1s" }}
            >
              Découvrez des bouteilles et mugs au design exclusif, conçus pour
              allier élégance et durabilité au quotidien.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link to="/products">
                  Explorer la Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Produits Vedettes
              </h2>
              <p className="text-muted-foreground">
                Découvrez nos produits les plus populaires
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/products">Voir Tous les Produits</Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full aspect-square bg-muted rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description || ""}
                  price={Number(product.price)}
                  imageUrl={
                    product.images?.[0] || product.image_url || undefined
                  }
                  category={product.category?.name}
                  available={product.available}
                  colors={product.colors}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-nature-dark text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Prêt à Découvrir Notre Collection ?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Parcourez nos bouteilles et mugs design, et commandez directement
              via WhatsApp pour une livraison rapide et facile.
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link to="/products">
                Commencer vos Achats
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

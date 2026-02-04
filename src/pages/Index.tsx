import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Leaf, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const features = [
  {
    icon: Droplets,
    title: "Pure Source",
    description: "Naturally filtered through ancient mountain springs for exceptional purity.",
  },
  {
    icon: Shield,
    title: "Quality Tested",
    description: "Rigorous testing ensures every drop meets our premium standards.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable practices and recyclable packaging protect our planet.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery right to your doorstep.",
  },
];

export default function Index() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.filter(p => p.available).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-water-gradient overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-water-medium/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border mb-8 animate-fade-in">
              <Droplets className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Premium Mountain Spring Water</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up">
              Pure Water,{" "}
              <span className="text-gradient">Pure Life</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Experience the refreshing taste of nature with Mugix. 
              Sourced from pristine mountain springs, delivered fresh to your door.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="gap-2">
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Born in the heart of crystal-clear mountain springs, Mugix represents our 
              commitment to delivering nature's purest gift directly to you. Every bottle 
              captures the essence of pristine wilderness, filtered naturally through 
              ancient rock formations over centuries. We believe hydration should be an 
              experience—pure, refreshing, and life-affirming.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Mugix?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We go beyond just bottling water. Every aspect of Mugix reflects our dedication to quality and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Discover our most popular hydration options
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description || ""}
                  price={Number(product.price)}
                  imageUrl={product.image_url || undefined}
                  category={product.category?.name}
                  available={product.available}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-water-dark text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Pure Hydration?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Browse our collection and order directly through WhatsApp for quick and easy delivery.
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link to="/products">
                Start Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

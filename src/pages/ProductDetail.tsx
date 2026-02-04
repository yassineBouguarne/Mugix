import { useParams, Link } from "react-router-dom";
import { MessageCircle, ArrowLeft, Droplets, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProduct } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageUrl } from "@/lib/image";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id || "");

  if (isLoading) {
    return (
      <Layout>
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-1/2" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const whatsappNumber =
    import.meta.env.VITE_WHATSAPP_NUMBER || "+212679545622";
  const whatsappMessage = encodeURIComponent(
    `Hi! I want to order: ${product.name} – Price: $${Number(product.price).toFixed(2)} – Quantity: 1 – Link: ${window.location.href}`,
  );
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`;

  const imageUrl = getImageUrl(product.image_url);

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-4 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-square bg-water-gradient rounded-2xl overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Droplets className="h-32 w-32 text-primary/30 animate-float" />
                </div>
              )}
              {product.category && (
                <Badge className="absolute top-6 left-6 bg-card/90 text-foreground backdrop-blur-sm">
                  {product.category.name}
                </Badge>
              )}
              {!product.available && (
                <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                  <span className="text-background text-xl font-semibold">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="flex-1">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  {product.available ? (
                    <Badge
                      variant="outline"
                      className="text-primary border-primary"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      In Stock
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-destructive border-destructive"
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Features */}
                {/* <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-foreground">
                    Product Features
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Natural mountain spring source",
                      "BPA-free recyclable bottle",
                      "Mineral-rich composition",
                      "Crisp, refreshing taste",
                    ].map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>

              {/* Order Button */}
              <div className="pt-6 border-t border-border">
                <Button
                  asChild
                  size="lg"
                  disabled={!product.available}
                  className="w-full sm:w-auto gap-2"
                >
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Order on WhatsApp
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Click to open WhatsApp with your order details pre-filled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

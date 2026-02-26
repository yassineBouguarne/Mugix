import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MessageCircle, Mail, ArrowLeft, Package, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProduct } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageUrls } from "@/lib/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id || "");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      setSelectedIndex(carouselApi.selectedScrollSnap());
    };
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const scrollToImage = (index: number) => {
    carouselApi?.scrollTo(index);
    setSelectedIndex(index);
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="pb-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-[4/3] max-h-[500px] max-w-[600px] mx-auto rounded-2xl" />
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
              Produit Non Trouvé
            </h1>
            <p className="text-muted-foreground mb-8">
              Le produit que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button asChild>
              <Link to="/products">Parcourir les Produits</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const whatsappNumber =
    import.meta.env.VITE_WHATSAPP_NUMBER || "+212679545622";
  const whatsappMessage = encodeURIComponent(
    `Bonjour ! Je souhaite commander : ${product.name} – Prix : ${Number(product.price).toFixed(2)} DH – Quantité : 1 – Lien : ${window.location.href}`,
  );
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent(
    `Commande : ${product.name} – ${Number(product.price).toFixed(2)} DH`,
  );
  const emailBody = encodeURIComponent(
    `Bonjour,\n\nJe souhaite passer une commande pour le produit suivant :\n\nProduit : ${product.name}\nPrix unitaire : ${Number(product.price).toFixed(2)} DH\nQuantité souhaitée : \nLien : ${window.location.href}\n\nMerci de me contacter pour confirmer la commande et les modalités de livraison.\n\nCordialement,`,
  );
  const emailLink = `mailto:mugix.ma@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  const imageUrls = getImageUrls(product.images);
  const hasImages = imageUrls.length > 0;
  const hasMultipleImages = imageUrls.length > 1;

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
            Retour aux Produits
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-4 lg:py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] max-h-[500px] max-w-[600px] mx-auto bg-nature-gradient rounded-2xl overflow-hidden">
                {hasImages ? (
                  hasMultipleImages ? (
                    <Carousel setApi={setCarouselApi} className="w-full h-full">
                      <CarouselContent className="-ml-0">
                        {imageUrls.map((url, index) => (
                          <CarouselItem key={index} className="pl-0">
                            <img
                              src={url}
                              alt={`${product.name} - Image ${index + 1}`}
                              className="w-full h-full object-cover aspect-[4/3]"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm" />
                      <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm" />
                    </Carousel>
                  ) : (
                    <img
                      src={imageUrls[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-32 w-32 text-primary/30 animate-float" />
                  </div>
                )}
                {product.category && (
                  <Badge className="absolute top-6 left-6 bg-card/90 text-foreground backdrop-blur-sm z-10">
                    {product.category.name}
                  </Badge>
                )}
                {!product.available && (
                  <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center z-10">
                    <span className="text-background text-xl font-semibold">
                      Rupture de Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {hasMultipleImages && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {imageUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToImage(index)}
                      className={cn(
                        "w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                        selectedIndex === index
                          ? "border-primary ring-1 ring-primary"
                          : "border-transparent opacity-70 hover:opacity-100",
                      )}
                    >
                      <img
                        src={url}
                        alt={`${product.name} miniature ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    {Number(product.price).toFixed(2)} DH
                  </span>
                  {product.available ? (
                    <Badge
                      variant="outline"
                      className="text-primary border-primary"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      En Stock
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-destructive border-destructive"
                    >
                      Rupture de Stock
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {product.description}
                </p>
              </div>

              {/* Order Buttons */}
              <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
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
                    Commander sur WhatsApp
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  disabled={!product.available}
                  className="w-full sm:w-auto gap-2"
                >
                  <a href={emailLink}>
                    <Mail className="h-5 w-5" />
                    Commander par Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

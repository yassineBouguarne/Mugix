import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MessageCircle, Mail, ArrowLeft, Package, Check, Minus, Plus, Paintbrush } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  const [quantity, setQuantity] = useState(1);
  const [colorCounts, setColorCounts] = useState<Record<string, number>>({});
  const [isCustom, setIsCustom] = useState(false);
  const [customNote, setCustomNote] = useState("");

  // Init carousel sync
  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setSelectedIndex(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    return () => { carouselApi.off("select", onSelect); };
  }, [carouselApi]);

  // Init first color selected when product loads
  useEffect(() => {
    if (product?.colors?.length) {
      setColorCounts({ [product.colors[0].name]: 1 });
    }
  }, [product?.id]);

  const scrollToImage = (index: number) => {
    carouselApi?.scrollTo(index);
    setSelectedIndex(index);
  };

  const totalSelected = Object.values(colorCounts).reduce((a, b) => a + b, 0);

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1 || newQty > 10) return;
    setQuantity(newQty);
    // If new qty < current total selected, trim colors proportionally
    if (newQty < totalSelected) {
      const trimmed: Record<string, number> = {};
      let remaining = newQty;
      for (const [name, count] of Object.entries(colorCounts)) {
        if (remaining <= 0) break;
        const keep = Math.min(count, remaining);
        if (keep > 0) trimmed[name] = keep;
        remaining -= keep;
      }
      setColorCounts(trimmed);
    }
  };

  const handleColorClick = (colorName: string) => {
    if (quantity === 1) {
      // Radio behavior
      setColorCounts({ [colorName]: 1 });
    }
  };

  const handleColorAdd = (colorName: string) => {
    if (totalSelected >= quantity) return;
    setColorCounts((prev) => ({ ...prev, [colorName]: (prev[colorName] || 0) + 1 }));
  };

  const handleColorRemove = (colorName: string) => {
    setColorCounts((prev) => {
      const next = { ...prev };
      if ((next[colorName] || 0) <= 1) {
        delete next[colorName];
      } else {
        next[colorName] -= 1;
      }
      return next;
    });
  };

  const colorSummary = product?.colors
    ?.filter((c) => (colorCounts[c.name] || 0) > 0)
    .map((c) => `${c.name}${quantity > 1 ? ` x${colorCounts[c.name]}` : ""}`)
    .join(", ") || "";

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

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+212679545622";
  const orderDetails = [
    `Produit : ${product.name}`,
    `Prix unitaire : ${Number(product.price).toFixed(2)} DH`,
    `Quantité : ${quantity}`,
    colorSummary ? `Couleur(s) : ${colorSummary}` : null,
    isCustom ? `Personnalisation : Oui — ${customNote || "à préciser"}` : null,
    `Lien : ${window.location.href}`,
  ].filter(Boolean).join("\n");

  const whatsappMessage = encodeURIComponent(
    `Bonjour ! Je souhaite commander :\n\n${orderDetails}\n\nMerci !`,
  );
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent(
    `Commande : ${product.name} – ${Number(product.price).toFixed(2)} DH`,
  );
  const emailBody = encodeURIComponent(
    `Bonjour,\n\nJe souhaite passer une commande pour le produit suivant :\n\n${orderDetails}\n\nMerci de me contacter pour confirmer la commande et les modalités de livraison.\n\nCordialement,`,
  );
  const emailLink = `mailto:mugix.ma@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  const hasColors = (product.colors?.length ?? 0) > 0;
  const colorsComplete = !hasColors || totalSelected === quantity;

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
                    <img src={imageUrls[0]} alt={product.name} className="w-full h-full object-cover" />
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
                    <span className="text-background text-xl font-semibold">Rupture de Stock</span>
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
                      <img src={url} alt={`${product.name} miniature ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {Number(product.price).toFixed(2)} DH
                  </span>
                  {product.available ? (
                    <Badge variant="outline" className="text-primary border-primary">
                      <Check className="h-3 w-3 mr-1" />En Stock
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-destructive border-destructive">
                      Rupture de Stock
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity selector */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Quantité</p>
                <div className="inline-flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-5 py-2 text-base font-semibold text-foreground min-w-[3rem] text-center border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Color selector */}
              {hasColors && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-sm font-semibold text-foreground">
                      {quantity === 1 ? "Couleur" : `Couleurs`}
                    </p>
                    {quantity > 1 && (
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        colorsComplete
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {totalSelected}/{quantity} sélectionnée{quantity > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {quantity === 1 ? (
                    /* Radio mode */
                    <div className="flex flex-wrap gap-3">
                      {product.colors!.map((color) => (
                        <button
                          key={color.name}
                          title={color.name}
                          onClick={() => handleColorClick(color.name)}
                          className={cn(
                            "w-9 h-9 rounded-full border-2 transition-all",
                            colorCounts[color.name]
                              ? "border-primary ring-2 ring-primary ring-offset-2 scale-110"
                              : "border-border hover:scale-105",
                          )}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  ) : (
                    /* Multi-select mode with +/- per color */
                    <div className="flex flex-wrap gap-3">
                      {product.colors!.map((color) => {
                        const count = colorCounts[color.name] || 0;
                        const isActive = count > 0;
                        return (
                          <div key={color.name} className="flex flex-col items-center gap-1">
                            <div className={cn(
                              "relative w-10 h-10 rounded-full border-2 transition-all",
                              isActive
                                ? "border-primary ring-2 ring-primary ring-offset-2"
                                : "border-border",
                            )}
                              style={{ backgroundColor: color.hex }}
                            >
                              {count > 0 && (
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                                  style={{ color: color.hex === "#F5F0E8" || color.hex === "#F0F4F8" || color.hex === "#C0C0C0" || color.hex === "#F4A7B9" || color.hex === "#A8C5DA" || color.hex === "#8FAF8F" || color.hex === "#F2C4CE" ? "#333" : "#fff" }}>
                                  {count}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-0.5">
                              <button
                                onClick={() => handleColorRemove(color.name)}
                                disabled={count === 0}
                                className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <button
                                onClick={() => handleColorAdd(color.name)}
                                disabled={totalSelected >= quantity}
                                className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                            <span className="text-[10px] text-muted-foreground text-center max-w-[56px] leading-tight">
                              {color.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Selected color label (qty=1) */}
                  {quantity === 1 && colorSummary && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Couleur choisie : <span className="font-medium text-foreground">{colorSummary}</span>
                    </p>
                  )}

                  {/* Reminder (qty>1) */}
                  {quantity > 1 && !colorsComplete && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Sélectionnez encore {quantity - totalSelected} couleur{quantity - totalSelected > 1 ? "s" : ""} pour continuer.
                    </p>
                  )}
                </div>
              )}

              {/* Personnalisation */}
              <div className="border border-border rounded-xl p-4 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setIsCustom(!isCustom)}
                    className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                      isCustom
                        ? "bg-primary border-primary"
                        : "border-border group-hover:border-primary/50",
                    )}
                  >
                    {isCustom && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Paintbrush className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      Je veux personnaliser mon produit
                    </span>
                  </div>
                </label>
                <p className="text-xs text-muted-foreground pl-8">
                  Faites imprimer votre logo ou design sur le produit. Nos équipes vous contacteront pour confirmer les détails.
                </p>

                {isCustom && (
                  <div className="pl-8 space-y-2">
                    <Textarea
                      placeholder="Décrivez votre personnalisation : logo, texte, couleurs souhaitées, format du fichier..."
                      rows={3}
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      className="text-sm resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Vous pouvez également envoyer vos fichiers (logo, image) par email ou WhatsApp après la commande.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Buttons */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  disabled={!product.available || !colorsComplete}
                  className="w-full sm:w-auto gap-2"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Commander sur WhatsApp
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  disabled={!product.available || !colorsComplete}
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

import { Link } from "react-router-dom";
import { MessageCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/image";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  available: boolean;
  colors?: { name: string; hex: string }[];
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  available,
  colors,
}: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Bonjour ! Je souhaite commander : ${name} – Prix : ${price.toFixed(
      2,
    )} DH – Quantité : 1 – Lien : ${window.location.origin}/products/${id}`,
  );

  const whatsappLink = `https://wa.me/+212679545622?text=${whatsappMessage}`;
  const fullImageUrl = getImageUrl(imageUrl);

  return (
    <Link to={`/products/${id}`} className="block w-full">
      <div className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-square bg-white overflow-hidden">
          {fullImageUrl ? (
            <img
              src={fullImageUrl}
              alt={name}
              className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-14 w-14 text-primary/30 animate-float" />
            </div>
          )}

          {category && (
            <Badge className="absolute top-3 left-3 bg-white/90 text-foreground shadow-sm text-xs font-medium">
              {category}
            </Badge>
          )}

          {!available && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <span className="text-background font-semibold text-sm">
                Rupture de Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3 border-t border-border">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-muted-foreground text-xs line-clamp-2 mt-1">
              {description}
            </p>
          </div>

          {/* Color dots */}
          {colors && colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {colors.slice(0, 4).map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="w-3.5 h-3.5 rounded-full border border-border flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {colors.length > 4 && (
                <span className="text-[10px] text-muted-foreground font-medium">
                  +{colors.length - 4}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {price.toFixed(2)} DH
            </span>

            <Button
              disabled={!available}
              size="sm"
              className="gap-1.5 text-xs"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(whatsappLink, "_blank", "noopener,noreferrer");
              }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Commander
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

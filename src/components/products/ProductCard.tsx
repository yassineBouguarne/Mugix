import { Link } from "react-router-dom";
import { MessageCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  available,
}: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Bonjour ! Je souhaite commander : ${name} – Prix : ${price.toFixed(
      2,
    )} DH – Quantité : 1 – Lien : ${window.location.origin}/products/${id}`,
  );

  const whatsappLink = `https://wa.me/+212679545622?text=${whatsappMessage}`;
  const fullImageUrl = getImageUrl(imageUrl);

  return (
    <Link to={`/products/${id}`} className="block w-full max-w-[300px]">
      <Card className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer flex flex-col h-[460px]">
        {/* Image */}
        <div className="relative h-[240px] bg-muted flex items-center justify-center overflow-hidden">
          {fullImageUrl ? (
            <img
              src={fullImageUrl}
              alt={name}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Package className="h-14 w-14 text-primary/30 animate-float" />
          )}

          {category && (
            <Badge className="absolute top-3 left-3 bg-card/90 text-foreground backdrop-blur-sm text-xs">
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
        <CardContent className="p-4 flex flex-col flex-1">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-muted-foreground text-xs line-clamp-2">
              {description}
            </p>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between mt-auto pt-4">
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
        </CardContent>
      </Card>
    </Link>
  );
}

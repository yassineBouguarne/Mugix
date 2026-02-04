import { Link } from "react-router-dom";
import { MessageCircle, Droplets } from "lucide-react";
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
    `Hi! I want to order: ${name} – Price: $${price.toFixed(2)} – Quantity: 1 – Link: ${window.location.origin}/products/${id}`,
  );
  const whatsappLink = `https://wa.me/1+2126795456221234567?text=${whatsappMessage}`;

  const fullImageUrl = getImageUrl(imageUrl);

  return (
    <Link to={`/products/${id}`} className="block">
      <Card className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer">
        <div className="relative aspect-square bg-water-gradient overflow-hidden">
          {fullImageUrl ? (
            <img
              src={fullImageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Droplets className="h-20 w-20 text-primary/30 animate-float" />
            </div>
          )}
          {category && (
            <Badge className="absolute top-4 left-4 bg-card/90 text-foreground backdrop-blur-sm">
              {category}
            </Badge>
          )}
          {!available && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <span className="text-background font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            <Button
              disabled={!available}
              className="gap-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(whatsappLink, "_blank", "noopener,noreferrer");
              }}
            >
              <MessageCircle className="h-4 w-4" />
              Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

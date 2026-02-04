import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Products() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products?.filter(
        (p) =>
          p.category?.id === selectedCategory ||
          p.category_id === selectedCategory,
      )
    : products;

  const availableProducts = filteredProducts?.filter((p) => p.available);
  const unavailableProducts = filteredProducts?.filter((p) => !p.available);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-water-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our range of premium bottled water.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Toutes les catégories
            </Button>
            {categoriesLoading ? (
              <>
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </>
            ) : (
              categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {availableProducts && availableProducts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                  {availableProducts.map((product) => (
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

              {unavailableProducts && unavailableProducts.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-muted-foreground mb-6">
                    Currently Unavailable
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-60">
                    {unavailableProducts.map((product) => (
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
                </div>
              )}

              {(!filteredProducts || filteredProducts.length === 0) && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No products found in this category.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

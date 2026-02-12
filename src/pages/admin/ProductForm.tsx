import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, Upload, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import {
  useProduct,
  useCategories,
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

interface ImageItem {
  id: string;
  url: string | null;
  file: File | null;
  preview: string;
}

export default function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAuth();
  const { data: existingProduct, isLoading: productLoading } = useProduct(id || "");
  const { data: categories } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [available, setAvailable] = useState(true);
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setDescription(existingProduct.description || "");
      setPrice(String(existingProduct.price));
      setCategoryId(existingProduct.category_id || "");
      setAvailable(existingProduct.available);

      const existingImages: ImageItem[] = (existingProduct.images || []).map((imgUrl, index) => ({
        id: `existing-${index}-${Date.now()}`,
        url: imgUrl,
        file: null,
        preview: imgUrl.startsWith("http") ? imgUrl : `${SERVER_URL}${imgUrl}`,
      }));
      setImageItems(existingImages);
    }
  }, [existingProduct]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Type de Fichier Invalide",
          description: `"${file.name}" n'est pas un format d'image supporté.`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fichier Trop Volumineux",
          description: `"${file.name}" dépasse la limite de 10 Mo.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: ImageItem = {
          id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          url: null,
          file: file,
          preview: reader.result as string,
        };
        setImageItems(prev => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeImage = (id: string) => {
    setImageItems(prev => prev.filter(item => item.id !== id));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    setImageItems(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Erreur de Validation",
        description: "Le nom du produit est requis.",
        variant: "destructive",
      });
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast({
        title: "Erreur de Validation",
        description: "Veuillez entrer un prix valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const finalImageUrls: string[] = [];

      for (const item of imageItems) {
        if (item.url) {
          finalImageUrls.push(item.url);
        } else if (item.file) {
          const uploadedUrl = await uploadImage(item.file);
          if (uploadedUrl) {
            finalImageUrls.push(uploadedUrl);
          } else {
            toast({
              title: "Échec du Téléchargement",
              description: `Impossible de télécharger "${item.file.name}". Il sera ignoré.`,
              variant: "destructive",
            });
          }
        }
      }

      const productData = {
        name: name.trim(),
        description: description.trim() || null,
        price: Number(price),
        category_id: categoryId || null,
        available,
        images: finalImageUrls,
        image_url: finalImageUrls.length > 0 ? finalImageUrls[0] : null,
      };

      if (isEditing && id) {
        await updateProduct.mutateAsync({ id, ...productData });
        toast({
          title: "Produit Mis à Jour",
          description: `"${name}" a été mis à jour.`,
        });
      } else {
        await createProduct.mutateAsync(productData);
        toast({
          title: "Produit Créé",
          description: `"${name}" a été ajouté.`,
        });
      }

      navigate("/admin");
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le produit. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || (isEditing && productLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au Tableau de Bord
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground">
            {isEditing ? "Modifier le Produit" : "Ajouter un Nouveau Produit"}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Images du Produit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imageItems.map((item, index) => (
                  <div key={item.id} className="relative group aspect-square">
                    <img
                      src={item.preview}
                      alt={`Product image ${index + 1}`}
                      className={cn(
                        "w-full h-full object-cover rounded-lg border",
                        index === 0 && "ring-2 ring-primary"
                      )}
                      onError={() => removeImage(item.id)}
                    />
                    {index === 0 && (
                      <Badge className="absolute top-1 left-1 text-xs">Principal</Badge>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(item.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    {imageItems.length > 1 && (
                      <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => moveImage(index, index - 1)}
                            className="w-6 h-6 bg-background/80 backdrop-blur rounded flex items-center justify-center hover:bg-background"
                          >
                            <ChevronLeft className="h-3 w-3" />
                          </button>
                        )}
                        {index < imageItems.length - 1 && (
                          <button
                            type="button"
                            onClick={() => moveImage(index, index + 1)}
                            className="w-6 h-6 bg-background/80 backdrop-blur rounded flex items-center justify-center hover:bg-background"
                          >
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p className="text-xs text-muted-foreground text-center px-2">
                    Ajouter une Image
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    multiple
                    onChange={handleImagesChange}
                  />
                </label>
              </div>
              {imageItems.length > 0 && (
                <p className="text-xs text-muted-foreground mt-3">
                  La première image sera utilisée comme miniature principale du produit. Utilisez les flèches pour réorganiser.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Détails du Produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du Produit *</Label>
                <Input
                  id="name"
                  placeholder="ex. Bouteille Éco 500ml"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre produit..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (DH) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="available">Disponible à la Commande</Label>
                  <p className="text-sm text-muted-foreground">
                    Désactiver pour marquer comme rupture de stock
                  </p>
                </div>
                <Switch
                  id="available"
                  checked={available}
                  onCheckedChange={setAvailable}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/admin")}
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Mettre à Jour" : "Créer le Produit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

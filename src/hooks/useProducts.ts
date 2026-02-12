import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  images: string[];
  category_id: string | null;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    description: string | null;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json() as Promise<Product[]>;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return response.json() as Promise<Product>;
    },
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json() as Promise<Category[]>;
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      product: Omit<Product, "id" | "createdAt" | "updatedAt" | "category">,
    ) => {
      const token = localStorage.getItem("mugix_token");
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: Object.assign(
          {
            "Content-Type": "application/json",
          },
          token ? { Authorization: `Bearer ${token}` } : {},
        ),
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...product
    }: Partial<Product> & { id: string }) => {
      const token = localStorage.getItem("mugix_token");
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: Object.assign(
          {
            "Content-Type": "application/json",
          },
          token ? { Authorization: `Bearer ${token}` } : {},
        ),
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("mugix_token");
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: {
      name: string;
      description?: string | null;
    }) => {
      const token = localStorage.getItem("mugix_token");
      const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: Object.assign(
          {
            "Content-Type": "application/json",
          },
          token ? { Authorization: `Bearer ${token}` } : {},
        ),
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error("Failed to create category");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("mugix_token");
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const token = localStorage.getItem("mugix_token");
      const response = await fetch(`${API_URL}/contacts`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      return response.json() as Promise<Contact[]>;
    },
  });
}

export function useCreateContact() {
  return useMutation({
    mutationFn: async (contact: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      message: string;
    }) => {
      const response = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      return response.json();
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("mugix_token");
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

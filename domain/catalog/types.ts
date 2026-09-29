export type ProductStatus = "draft" | "active" | "archived";

export type ProductImage = {
  src: string;
  alt: string;
  role: "primary";
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  tags: string[];
  sourceCollection: string;
  sourceFilename: string;
  image: string;
  alt: string;
  status: ProductStatus;
  reviewNote?: string;
  price?: number;
  salePrice?: number;
  currency?: string;
  inventoryQuantity?: number;
  materialIds?: string[];
  craftIds?: string[];
  variants?: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  productId: string;
  sku: string;
  size?: string;
  color?: string;
  price: number;
  currency: string;
  inventoryQuantity: number;
};

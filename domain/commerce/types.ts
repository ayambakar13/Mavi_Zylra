export type CartItem = {
  productId: string;
  sku: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  quantity: number;
  size?: string;
  color?: string;
};

export type Address = {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export type CustomerDetails = {
  email: string;
  phone: string;
};

export type CheckoutDetails = {
  customer: CustomerDetails;
  shippingAddress: Address;
  billingAddress: Address;
  sameBillingAddress: boolean;
  paymentMethod: "whatsapp" | "upi" | "payment-provider";
  notes: string;
};

export type Order = {
  id: string;
  guestSessionId: string;
  createdAt: string;
  status: "pending" | "confirmed" | "paid" | "cancelled";
  items: CartItem[];
  checkout: CheckoutDetails;
  subtotal: number;
  shipping: number | null;
  tax: number | null;
  total: number | null;
  currency: string;
};

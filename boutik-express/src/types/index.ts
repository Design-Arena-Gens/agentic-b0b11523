export type PlanTier = "free" | "premium";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  businessName: string;
  businessDescription?: string;
  storeSlug: string;
  whatsappNumber: string;
  photoURL?: string;
  plan: PlanTier;
  createdAt: number;
  isDisabled?: boolean;
};

export type Product = {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  category?: string;
  createdAt: number;
  updatedAt?: number;
  isArchived?: boolean;
};

export type StoreStats = {
  id: string;
  storeId: string;
  viewsCount: number;
  ordersCount: number;
  lastVisitDate?: number;
  updatedAt?: number;
};


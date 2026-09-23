export type TCategory = {
  _id: string;
  categoryName: string;
  slug: string;
  description: string;
  image: string | null;
  isFeatured: boolean;
  isDeleted: boolean;
  newsCount: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TCreateCategoryPayload = {
  categoryName: string;
  image: string;
  slug: string;
  description: string;
  isFeatured: boolean;
};

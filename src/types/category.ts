export type TCategory = {
  _id: string;
  categoryName: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TCreateCategoryPayload = {
  categoryName: string;
  slug: string;
  description: string;
  isFeatured: boolean;
};

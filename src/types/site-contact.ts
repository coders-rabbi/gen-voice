export type TSiteContact = {
  _id?: string;
  mapLink?: string;
  email?: string;
  phone?: string;
  fax?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  logo?: string;
  logoPublicId?: string;
  shortDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TSiteContactPayload = {
  mapLink?: string;
  email?: string;
  phone?: string;
  fax?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  logo?: string;
  logoPublicId?: string | null;
  shortDescription?: string;
};

export type TAdminPayload = {
  adminName: string;
  email: string;
  profileImage: string | undefined;
  profileImagePublicId: string | undefined;
  role: string;
  password: string;
};

export type TAdmin = {
  _id: string;
  adminName: string;
  email: string;
  profileImage: string | "";
  password: string;
  role: string;
  isDeleted: boolean;
  isActive: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

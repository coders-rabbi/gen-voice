export type TFeature =
  | "categories"
  | "registeredUsers"
  | "allPosts"
  | "allPolls"
  | "usersAndRoll"
  | "websiteConfiguration"
  | "settings";

export type TPermission = {
  feature: TFeature;
  isGranted: boolean;
};

export type TRolePayload = {
  roleName: string;
  permissions: TPermission[];
};

export type TRole = {
  _id: string;
  roleName: string;
  permissions: TPermission[];
  isDeleted: boolean;
  createAt: Date;
  updateAt: Date;
};

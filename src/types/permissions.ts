export type TFeature =
  | "categories"
  | "register-user"
  | "all-news"
  | "all-poll"
  | "user-role"
  | "web-config"
  | "setting";

export type TPermission = {
  feature: TFeature;
  isGranted: boolean;
};

export type TRole = {
  _id: string;
  roleName: string;
  permissions: TPermission[];
  isDeleted: boolean;
};

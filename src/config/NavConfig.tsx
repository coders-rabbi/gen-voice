import { TFeature } from "@/types/permissions";

export const navItems: {
  label: string;
  path: string;
  feature: TFeature | "overview"; // overview সবাই দেখবে
}[] = [
  { label: "Overview", path: "/dashboard", feature: "overview" },
  { label: "Categories", path: "/dashboard/categories", feature: "categories" },
  {
    label: "Register Users",
    path: "/dashboard/register-user",
    feature: "register-user",
  },
  { label: "All News", path: "/dashboard/all-news", feature: "all-news" },
  { label: "All Polls", path: "/dashboard/all-poll", feature: "all-poll" },
  {
    label: "User & Rolls",
    path: "/dashboard/user-role",
    feature: "user-role",
  },
  {
    label: "Website Configuration",
    path: "/dashboard/web-config",
    feature: "web-config",
  },
  { label: "Setting", path: "/dashboard/setting", feature: "setting" },
];

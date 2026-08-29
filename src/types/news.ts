export interface IComment {
  userName: string;
  userImage: string;
  commentDate: string;
  comment: string;
}

export type THomePageNews = {
  Sports: TNews[];
  Politics: TNews[];
  Business: TNews[];
  Technology: TNews[];
  Music: TNews[];
  Entertaiment: TNews[];
};

export type TNewsStatus =
  | "draft"
  | "preview"
  | "approved"
  | "published"
  | "pending"
  | "reject"
  | "archived";

export type TConentType = "Text" | "Video" | "Mixed";

export type TNewsPayload = {
  reporterId: string;
  approvedBy: string;
  categoryId: string;
  title: string;
  slug: string;
  shortDetails: string;
  content: string;
  contentType: TConentType;
  featuredImageUrl: string;
  imageCaption?: string;
  galleryImages?: string;
  videoUrl?: string;
  tags: string[];
  location?: string;
  source?: string;
  sourceUrl?: string;
  status: TNewsStatus;
  isAnonymous: Boolean;
  publishAt?: Date | null;
};
type TCategoryId = {
  _id: string;
  categoryName: string;
};

type TReporterId = {
  _id: string;
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
    _id?: string;
  };
  fullName: string;
};

type TApprovedBy = {
  _id: string;
  email: string;
  role: string;
};

export type TNews = {
  _id: string;
  newsId: string;
  reporterId: TReporterId;
  approvedBy: TApprovedBy;
  categoryId: TCategoryId;
  title: string;
  slug: string;
  shortDetails: string;
  content: string;
  contentType: TConentType;
  featuredImageUrl: string;
  imageCaption?: string;
  galleryImages?: string[];
  videoUrl?: string;
  tags: string[];
  location?: string;
  source?: string;
  sourceUrl?: string;
  status: TNewsStatus;
  isAnonymous: boolean;
  isDeleted: boolean;
  publishAt?: string;
  createdAt: string;
  updatedAt: string;
};

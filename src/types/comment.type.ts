export type TCommentPyaload = {
  newsId: string;
  comment: string;
};

export type TReplay = {
  _id?: string;
  name: string;
  email?: string;
  comment: string;
  createdAt?: string | Date;
};

export type TCommentUser = {
  _id: string;
  email: string;
  role: string;
};

export type TComments = {
  _id: string;
  newsId: string;
  comment: string;
  userId: TCommentUser | null;
  replay?: TReplay[] | null;
  isHidden?: boolean;
  isDeleted?: boolean;
  createdAt: string | Date;
  updatedAt?: string | Date;
};

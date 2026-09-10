export type TCommentPyaload = {
  newsId: string;
  name: string;
  email: string;
  comment: string;
};

export type TReplay = {
  _id?: string;
  name: string;
  email?: string;
  comment: string;
  createdAt?: string | Date;
};

export type TComments = {
  _id: string;
  newsId: string;
  name: string;
  email: string;
  comment: string;
  replay?: TReplay[] | null;
  createdAt: string | Date;
};

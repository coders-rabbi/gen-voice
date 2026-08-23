export interface IComment {
  userName: string;
  userImage: string;
  commentDate: string;
  comment: string;
}

export interface IPost {
  _id: string;
  writers_id?: string;
  postId: number;
  title: string;
  mainImage: string;
  image2: string;
  postDate: string;
  totalCommentsCount: number;
  category: string;

  subtitles: string[];

  postDetails: string;
  specialQuote: string;

  comments: IComment[];

  tags: string[];
  keywords: string;
}

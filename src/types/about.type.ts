export interface IAboutPayload {
  image: string;
  imagePublicId: string | "";
  heading: string;
  description: string;
}

export interface IAbout {
  image: null | string;
  imagePublicId: string  | "",
  heading: string;
  description: string;
  createAt: Date;
  updateAt: Date;
}

export interface IWebFooterPayload {
  navLogo: string;
  footerLogo: string;
  description: string;
  subHeading: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  copyRight: string;
  videos?: string[];
}

export interface IWebFooter extends IWebFooterPayload {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

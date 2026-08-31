export type TReporterName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TReporterUser = {
  _id: string;
  email: string;
  role: string;
  isDeleted: boolean;
  isActive: "active" | "blocked";
};

export type TReporter = {
  _id: string;
  id: string;
  user: TReporterUser;
  name: TReporterName;
  gender: "male" | "female";
  dateOfBirth: string;
  bloodGroup: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  designation: string;
  facebook: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};


export type TReporterQueryParams = {
  searchTerm?: string;
  status?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  [key: string]: unknown; // extra filter fields এর জন্য (dynamic filter() support করার কারণে)
};
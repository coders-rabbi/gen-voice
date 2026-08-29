export type TReporterName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TReporter = {
  _id: string;
  id: string;
  user: string;
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
  createdAt: string;
  updatedAt: string;
  fullName: string;
};

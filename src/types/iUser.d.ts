export interface IAddress {
  line1: string;
  city: string;
  state: string;
  country: string;
  zipCode: number | string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address?: IAddress;
  joiningDate: string;
  designation: string;
  team: string;
  officeLocation: string;
  password: string;
  type: string;
  timestamp: any;
  profileImage?: string;
}

export interface ICompany {
  _id?: string;
  name: string;
  owner: string;
  industryType: string;
  location: string;
  webiste: string;
  contact: {
    email: string;
    countryCode?: string;
    phone?: string;
  };
}
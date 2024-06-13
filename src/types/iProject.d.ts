export interface IProject {
  _id?: string;
  pid: string;
  name: string;
  company: string;
  description: any;
  status: number;
  leader: string;
  developers: Array<string>;
  category: string;
  skills: Array<string>;
  priority: string;
  deadline: string;
}

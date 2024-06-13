export interface IApplyLeave {
  _id?: string;
  userId: string,
  from: string;
  to: string;
  noOfDays: number | any;
  leavetype: string;
  reason: string;
}

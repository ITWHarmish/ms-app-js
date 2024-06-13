export interface ITimelog {
  _id?: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  project?: string;
  description: string;
  billable: boolean;
  task_id?: string;
}

export interface ITask {
  _id?: string;
  tid?: string;
  project?: string;
  title?: string;
  description?: string;
  assignedTo?: string;
  developer?: string;
  startDate?: string;
  dueDate?: string;
  status?: string;
  priority?: string;
  label?: string;
  comment?: Array<ITaskComment>;
  history?: Array<ITaskHistory>;
}

export interface ITaskComment {
  comment: string;
  by: string;
}

export interface ITaskHistory {
  change: string;
  by: string;
}

export interface ITaskCommentPayload {
  id: string;
  comment: string;
  by: string;
}

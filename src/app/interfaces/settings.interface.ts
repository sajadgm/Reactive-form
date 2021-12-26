export interface ITask {
  name: string;
  completed: boolean;
  color: string;
  subtasks?: ITask[];
}

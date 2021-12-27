export interface ITask {
  name: string;
  completed: boolean;
  color: string;
  id: string;
  subtasks?: ITask[];
}

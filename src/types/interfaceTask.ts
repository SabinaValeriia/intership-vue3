export interface Tasks {
  name: string;
  description: string;
}

export enum Types {
  toDo = "To Do",
  inProgress = "In Progress",
  review = "Review",
  done = "Done",
}

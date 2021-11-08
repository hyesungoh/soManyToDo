export interface IToDo {
  id: string;
  fields: {
    name: string;
  };
}

export interface IGetToDos {
  records: IToDo[];
}

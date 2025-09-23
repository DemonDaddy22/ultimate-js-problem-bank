type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

type Todos = Array<Todo>;

type TodoFilter = 'all' | 'active' | 'completed';

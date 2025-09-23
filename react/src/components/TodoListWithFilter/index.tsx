/**
 * Todo List with Filtering
 * Create a todo app with add/delete functionality and filters for **all, active, completed**.
 * Bonus: Persist todos in `localStorage`.
 */

'use client';

import useStorage from '@/hooks/useStorage';
import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import styles from '@/styles/TodoListWithFilter/todolist-with-filter.module.css';
import Todo from './components/Todo';
import Filter from './components/Filter';

const TODOS_STORE_KEY = 'todosWithFilter';

const TODO_FILTERS: Array<TodoFilter> = ['all', 'active', 'completed'];

const TodoListWithFilter: React.FC = () => {
  const store = useStorage<Todos>();

  const [todos, setTodos] = useState<Todos>([]);
  const [activeFilter, setActiveFilter] = useState<TodoFilter>('all');

  useEffect(() => {
    setTodos(store.getItem(TODOS_STORE_KEY) ?? []);
  }, []);

  const updateTodosInStore = (todosToSet: Todos) => {
    store.setItem(TODOS_STORE_KEY, todosToSet);
  };

  const addTodo = (todo: string) => {
    const todosToSet = [
      ...todos,
      {
        id: Date.now(),
        title: todo,
        isDone: false,
      },
    ];
    setTodos(todosToSet);
    updateTodosInStore(todosToSet);
  };

  const removeTodo = (id: number) => {
    const todosToSet = todos.filter(todo => todo.id !== id);
    setTodos(todosToSet);
    updateTodosInStore(todosToSet);
  };

  const toggleCompletedTodo = (id: number) => {
    const todosToSet = todos.map(todo =>
      todo.id !== id
        ? todo
        : {
            ...todo,
            isDone: !todo.isDone,
          }
    );
    setTodos(todosToSet);
    updateTodosInStore(todosToSet);
  };

  const getFilteredTodos = (filterType: TodoFilter = 'all') => {
    return todos.filter(todo => {
      switch (filterType) {
        case 'all':
          return true;
        case 'active':
          return !todo.isDone;
        case 'completed':
          return todo.isDone;
        default:
          return true;
      }
    });
  };

  return (
    <div className={styles.container}>
      <TodoForm handleSubmit={addTodo} />
      <Filter filters={TODO_FILTERS} activeFilter={activeFilter} handleSelect={setActiveFilter} />
      <section className={styles.todos}>
        {getFilteredTodos(activeFilter).map(({ id, title, isDone }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            isDone={isDone}
            handleComplete={toggleCompletedTodo}
            handleDelete={removeTodo}
          />
        ))}
      </section>
    </div>
  );
};

export default TodoListWithFilter;

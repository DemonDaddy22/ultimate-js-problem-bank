import { ChangeEvent, useState } from 'react';
import styles from '@/styles/TodoListWithFilter/todo-form.module.css';

type TodoFormProps = {
  handleSubmit: (todo: string) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ handleSubmit }) => {
  const [todoInput, setTodoInput] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.currentTarget.value);
  };

  const handleAddTodo = () => {
    if (!todoInput) {
      return;
    }
    handleSubmit(todoInput);
    setTodoInput('');
  };

  return (
    <section className={styles.form}>
      <input name='todo' type='text' onChange={handleInputChange} value={todoInput} className={styles.input} />
      <button onClick={handleAddTodo} disabled={!todoInput} className={styles.button}>
        Add
      </button>
    </section>
  );
};

export default TodoForm;

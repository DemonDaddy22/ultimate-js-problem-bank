import styles from '@/styles/TodoListWithFilter/todo.module.css';
import { MouseEvent } from 'react';

type TodoProps = {
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
} & Todo;

const Todo: React.FC<TodoProps> = ({ id, title, isDone, handleComplete, handleDelete }) => {
  const handleDeleteClick = (event: MouseEvent) => {
    event.stopPropagation();
    handleDelete(id);
  };

  return (
    <div className={styles.todo} onClick={() => handleComplete(id)}>
      <p className={isDone ? styles.titleDone : styles.title}>{title}</p>
      <button className={styles.button} onClick={handleDeleteClick}>
        ❌
      </button>
    </div>
  );
};

export default Todo;

import styles from '@/styles/TodoListWithFilter/todo.module.css';
import { KeyboardEvent, MouseEvent } from 'react';

type TodoProps = {
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
} & Todo;

const Todo: React.FC<TodoProps> = ({ id, title, isDone, handleComplete, handleDelete }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleComplete(id);
    }
  };

  const handleDeleteClick = (event: MouseEvent) => {
    event.stopPropagation();
    handleDelete(id);
  };

  return (
    <div
      className={styles.todo}
      onClick={() => handleComplete(id)}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
      aria-pressed={isDone}
      aria-label={`Mark "${title}" as ${isDone ? 'incomplete' : 'complete'}`}
    >
      <p className={isDone ? styles.titleDone : styles.title}>{title}</p>
      <button className={styles.button} onClick={handleDeleteClick} aria-label={`Delete "${title}"`}>
        ❌
      </button>
    </div>
  );
};

export default Todo;

import styles from '@/styles/TodoListWithFilter/filter.module.css';

type FilterProps = {
  filters: Array<TodoFilter>;
  activeFilter: TodoFilter;
  handleSelect: (filter: TodoFilter) => void;
};

const Filter: React.FC<FilterProps> = ({ filters, activeFilter, handleSelect }) => {
  return (
    <section className={styles.filters}>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => handleSelect(filter)}
          className={activeFilter === filter ? styles.buttonActive : styles.button}
        >
          {filter}
        </button>
      ))}
    </section>
  );
};

export default Filter;

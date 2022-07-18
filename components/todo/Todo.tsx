import styles from "./Todo.module.scss";

type TodoProps = {
  completed: boolean;
  appModalActive?: boolean;
  text: string;
};

export default function Todo({ text, completed, appModalActive }: TodoProps) {
  return (
    <div
      className={`${styles.todo} 
            ${completed && styles.completed}
            ${completed && appModalActive && styles.appModalActive}
            `}
    >
      <div className={styles.main}>
        {!completed ? (
          <img
            className={styles.pendingIcon}
            src="pending-todo-icon.svg"
            alt="pending todo icon"
          />
        ) : (
          <img
            className={styles.completedIcon}
            src="completed-todo-icon.svg"
            alt="pending todo icon"
          />
        )}
        <p className={styles.text}>{text}</p>
      </div>
      {!completed && (
        <img
          className={styles.toggleMenuIcon}
          src="toggle-menu-icon.svg"
          alt="toggle menu icon"
        />
      )}
    </div>
  );
}

import { useState } from "react";
import TodoContextMenu from "../todo-context-menu/TodoContextMenu";
import styles from "./Todo.module.scss";

type TodoProps = {
  completed: boolean;
  appModalActive?: boolean;
  text: string;
};

export default function Todo({ text, completed, appModalActive }: TodoProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`${styles.todo} 
            ${completed && styles.completed} `}
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
      <div onClick={() => setMenuOpen(true)} className={styles.toggleMenuIcon}>
        {!completed && (
          <img src="toggle-menu-icon.svg" alt="toggle menu icon" />
        )}
      </div>

      {menuOpen && <TodoContextMenu setMenuOpen={setMenuOpen} />}
    </div>
  );
}

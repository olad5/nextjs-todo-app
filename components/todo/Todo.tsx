import { Dispatch, SetStateAction, useState } from "react";
import { ActionType } from "../app-modal/AppModal";
import TodoContextMenu from "../todo-context-menu/TodoContextMenu";
import styles from "./Todo.module.scss";

type TodoProps = {
  completed: boolean;
  appModalActive?: boolean;
  text: string;
  todoId: number;
  handleContextMenuAction: (action: ActionType, text: string) => void;
  setCurrentTodo: Dispatch<SetStateAction<number>>;
  currentTodo?: number;
};

export default function Todo({
  text,
  completed,

  handleContextMenuAction,
  todoId,
  setCurrentTodo,
  currentTodo,
}: TodoProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTodoOpen, setCurrentTodoOpen] = useState(false);

  function handleContextMenuClick(action: ActionType) {
    setMenuOpen(false);
    handleContextMenuAction(action, text);
  }

  function handleMenuIconClick(e: React.MouseEvent<HTMLDivElement>) {
    setCurrentTodo(todoId);
    setMenuOpen(true);
  }

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
      <div onClick={handleMenuIconClick} className={styles.toggleMenuIcon}>
        {!completed && (
          <img src="toggle-menu-icon.svg" alt="toggle menu icon" />
        )}
      </div>

      {menuOpen && currentTodo === todoId && (
        <TodoContextMenu
          handleContextMenuClick={handleContextMenuClick}
          setMenuOpen={setMenuOpen}
        />
      )}
    </div>
  );
}

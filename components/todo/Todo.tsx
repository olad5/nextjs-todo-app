import { Dispatch, SetStateAction, useState } from "react";
import { ActionType } from "../app-modal/AppModal";
import TodoContextMenu from "../todo-context-menu/TodoContextMenu";
import styles from "./Todo.module.scss";

type TodoProps = {
  completed: boolean;
  appModalActive?: boolean;
  text: string;
  todoId: number;
  handleContextMenuAction: (
    action: ActionType,
    text: string,
    todoId: number
  ) => void;
  setCurrentTodo: Dispatch<SetStateAction<number>>;
  currentTodo?: number;
  toggleCompleted: (todoId: number) => void;
};

export default function Todo({
  text,
  completed,
  handleContextMenuAction,
  todoId,
  setCurrentTodo,
  toggleCompleted,
  currentTodo,
}: TodoProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleContextMenuClick(action: ActionType) {
    setMenuOpen(false);
    handleContextMenuAction(action, text, todoId);
  }

  function handleMenuIconClick(e: React.MouseEvent<HTMLDivElement>) {
    setCurrentTodo(todoId);
    setMenuOpen(true);
  }

  function handleCompletedIconClick(e: React.MouseEvent<HTMLImageElement>) {
    toggleCompleted(todoId);
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
            onClick={handleCompletedIconClick}
          />
        ) : (
          <img
            className={styles.completedIcon}
            src="completed-todo-icon.svg"
            alt="pending todo icon"
          />
        )}
        <p className={styles.text} onDoubleClick={handleCompletedIconClick}>
          {text}
        </p>
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

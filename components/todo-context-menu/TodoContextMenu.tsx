import { Dispatch, SetStateAction } from "react";
import { ActionType } from "../app-modal/AppModal";
import styles from "./TodoContextMenu.module.scss";

type TodoContextMenuProps = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  handleContextMenuClick: (action: ActionType) => void;
};

export default function TodoContextMenu({
  setMenuOpen,
  handleContextMenuClick,
}: TodoContextMenuProps) {
  return (
    <>
      <div className={styles.hoverBg} onClick={() => setMenuOpen(false)} />
      <div>
        <ul className={styles.menu}>
          <li
            className={styles.options}
            onClick={() => handleContextMenuClick(ActionType.UPDATE)}
          >
            Edit
          </li>
          <hr className={styles.lineRule} />

          <li
            className={styles.options}
            onClick={() => handleContextMenuClick(ActionType.DELETE)}
          >
            Delete
          </li>
        </ul>
      </div>
    </>
  );
}

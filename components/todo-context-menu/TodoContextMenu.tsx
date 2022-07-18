import { Dispatch, SetStateAction } from "react";
import styles from "./TodoContextMenu.module.scss";

type TodoContextMenuProps = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TodoContextMenu({ setMenuOpen }: TodoContextMenuProps) {
  return (
    <>
      <div className={styles.hoverBg} onClick={() => setMenuOpen(false)} />
      <div>
        <ul className={styles.menu}>
          <li className={styles.options}>Edit</li>
          <hr className={styles.lineRule} />

          <li className={styles.options}>Delete</li>
        </ul>
      </div>
    </>
  );
}

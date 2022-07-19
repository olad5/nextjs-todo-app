import React, { Dispatch, SetStateAction } from "react";
import styles from "./EntryScreen.module.scss";

type EntryScreenProps = {
  setModalActive: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export default function EntryScreen({ setModalActive }: EntryScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.centered}>
        <img
          src="plus-sign-black-icon.svg"
          onClick={(e) => setModalActive(e)}
          alt="Add new todo"
        />
        <h3>Add a new Todo</h3>
      </div>
    </div>
  );
}

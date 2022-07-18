import { Dispatch, SetStateAction } from "react";
import AppButton from "../app-button/AppButton";
import styles from "./AppModal.module.scss";

type AppModalProps = {
  update: boolean;
  text: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AppModal({ update, text, setIsOpen }: AppModalProps) {
  return (
    <>
      <div className={styles.darkBg} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2 className={styles.heading}>{`${
              !update ? "Add a new " : "Edit"
            } Todo`}</h2>
          </div>

          <div className={styles.inputField}>
            <h3 className={styles.label}>Title</h3>
            <input
              type="text"
              className={styles.input}
              placeholder={`${!update ? "What’s the name of this todo" : ""}`}
              defaultValue={`${update ? text : ""}`}
            />
          </div>
          <div className={styles.appButton}>
            <AppButton onClick={() => console.log()}>
              {`${!update ? "Create" : "Edit"} Todo`}
            </AppButton>
          </div>
        </div>
      </div>
    </>
  );
}

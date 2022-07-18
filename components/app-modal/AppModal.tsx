import { Dispatch, SetStateAction, useState } from "react";
import AppButton from "../app-button/AppButton";
import styles from "./AppModal.module.scss";

export enum ActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

type AppModalProps = {
  update: boolean;
  text: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleModalSubmit: (action: ActionType, text: string) => void;
};

export default function AppModal({
  update,
  text,
  setIsOpen,
  handleModalSubmit,
}: AppModalProps) {
  const [inputText, setInputText] = useState("");
  async function handleClick(action: ActionType, text: string) {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    if (action === ActionType.CREATE) {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          title: text,
          body: "bar",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      handleModalSubmit(action, text);
      setIsOpen(false);
      return;
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.currentTarget.value);
  }

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
              onChange={handleTextChange}
            />
          </div>
          <div className={styles.appButton}>
            <AppButton
              onClick={() =>
                handleClick(
                  !update ? ActionType.CREATE : ActionType.UPDATE,
                  inputText
                )
              }
            >
              {`${!update ? "Create" : "Edit"} Todo`}
            </AppButton>
          </div>
        </div>
      </div>
    </>
  );
}

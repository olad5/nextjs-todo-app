import { Dispatch, SetStateAction, useState } from "react";
import { Todo } from "../../pages";
import AppButton from "../app-button/AppButton";
import styles from "./AppModal.module.scss";

export enum ActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

type AppModalProps = {
  update: boolean;
  text: string;
  todoId: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleCreateTodoModalSubmit: (text: string) => void;
  handleUpdateTodoModalSubmit: (todoId: number, text: string) => void;
};

export default function AppModal({
  update,
  todoId,
  text,
  setIsOpen,
  handleCreateTodoModalSubmit,
  handleUpdateTodoModalSubmit,
}: AppModalProps) {
  const [inputText, setInputText] = useState("");
  const [inputFieldEmpty, setInputFieldEmpty] = useState(false);

  const prevText = text;

  async function handleClick(action: ActionType, text: string) {
    if (!text && text.length < 1) {
      setInputFieldEmpty(true);
      return;
    }

    if (action === ActionType.CREATE) {
      const apiUrl = "https://jsonplaceholder.typicode.com/posts";
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

      const data: Todo = await response.json();

      handleCreateTodoModalSubmit(data.title);
      setIsOpen(false);
      return;
    } else {
      const apiUrl = `https://jsonplaceholder.typicode.com/posts/${todoId}`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        body: JSON.stringify({
          title: text || prevText,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data: Todo = await response.json();
      handleUpdateTodoModalSubmit(todoId, data.title);
      setIsOpen(false);
      return;
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputFieldEmpty(false);
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
            <p
              className={styles.closeModalIcon}
              onClick={() => setIsOpen(false)}
            >
              X
            </p>
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
            {inputFieldEmpty && (
              <div className={styles.errorMessageContainer}>
                <p className={styles.inputErrorMessage}>
                  Input cannot be left blank
                </p>
              </div>
            )}
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

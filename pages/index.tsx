import AppButton from "../components/app-button/AppButton";
import styles from "../styles/Home.module.scss";
import Todo from "../components/todo/Todo";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";

import { useState } from "react";
import AppModal, { ActionType } from "../components/app-modal/AppModal";

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [appModalActive, setAppModalActive] = useState(false);
  const [todos, setTodos] = useState(data);

  const completedTodos = todos.filter((todo) => todo.completed === true);
  const pendingTodos = todos.filter((todo) => todo.completed === false);

  function handleModalSubmit(action: ActionType, text: string) {
    if (action === ActionType.CREATE) {
      let newTodo = {
        id: todos.length + 1,
        userId: 1,
        title: text,
        completed: false,
      };
      setTodos(todos.concat(newTodo));
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.title}>
            <h1 className={styles.mainTitle}>Todo App</h1>
            <p className={styles.secondaryText}>
              by <span className={styles.author}>Francis Shonubi</span>
            </p>
          </div>
          <div className={styles.addTodoBtn}>
            <AppButton onClick={() => setAppModalActive(true)}>
              <div className={styles.btnTextIcon}>
                <img
                  className={styles.addTodoIcon}
                  src="plus-sign-white-icon.svg"
                  alt=" add todo icon"
                />
                <span>Add Todo</span>
              </div>
            </AppButton>
          </div>
        </header>
        <div className={styles.appModal}>
          {appModalActive && (
            <AppModal
              update={false}
              setIsOpen={setAppModalActive}
              handleModalSubmit={handleModalSubmit}
              text="hello"
            />
          )}
        </div>

        <section className={styles.pendingTodosSection}>
          <h3 className={styles.pendingTitle}>PENDING</h3>
          <div className={styles.pendingTodos}>
            {pendingTodos.map((todo) => (
              <div key={todo.id}>
                <Todo text={todo.title} completed={todo.completed} />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.completedTodosSection}>
          <h3 className={styles.pendingTitle}>COMPLETED</h3>
          <div className={styles.pendingTodos}>
            {completedTodos.map((todo) => (
              <div key={todo.id}>
                <Todo text={todo.title} completed={todo.completed} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

type APIResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}[];

type PageProps = {
  data: APIResponse;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PageProps>> {
  const apiUrl = "https://jsonplaceholder.typicode.com/users/1/posts";
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data: APIResponse = await response.json();

  // this attaches a random completed property value to each post
  data.map((post) => {
    post["completed"] = (function () {
      return Math.random() < 0.5;
    })();
  });

  return {
    props: {
      data: data,
    },
  };
}

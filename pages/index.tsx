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
  const [todoText, setTodoText] = useState("");
  const [currentTodo, setCurrentTodo] = useState(0);

  const completedTodos = todos.filter((todo) => todo.completed === true);
  const pendingTodos = todos.filter((todo) => todo.completed === false);

  function handleCreateTodoModalSubmit(text: string) {
    let newTodo = {
      id: todos.length + 1,
      userId: 1,
      title: text,
      completed: false,
    };
    setTodos(todos.concat(newTodo));
    return;
  }

  function handleUpdateTodoModalSubmit(todoId: number, text: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: text,
          };
        }
        return todo;
      })
    );
  }
  function handleContextMenuAction(
    action: ActionType,
    text: string,
    todoId: number
  ) {
    if (action === ActionType.UPDATE) {
      setTodoText(text);
      setAppModalActive(true);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts/${todoId}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.id !== todoId));
    }
  }

  function handleAddTodoClick(e: React.MouseEvent<HTMLButtonElement>) {
    setTodoText("");
    setAppModalActive(true);
  }

  function toggleCompleted(todoId: number) {
    console.log("about to run some stuff");
    if (todos.find((todo) => todo.id === todoId)?.completed === false) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              completed: true,
            };
          }
          return todo;
        })
      );
      return;
    }

    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: false,
          };
        }
        return todo;
      })
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.title}>
            <h1 className={styles.mainTitle}>Todo App</h1>
            <p className={styles.secondaryText}>
              by{" "}
              <span className={styles.author}>
                <a href="https://github.com/olad5">Francis Shonubi</a>
              </span>
            </p>
          </div>
          <div className={styles.addTodoBtn}>
            <AppButton onClick={(e) => handleAddTodoClick(e)}>
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
              update={todoText.length > 0}
              setIsOpen={setAppModalActive}
              handleCreateTodoModalSubmit={handleCreateTodoModalSubmit}
              handleUpdateTodoModalSubmit={handleUpdateTodoModalSubmit}
              text={todoText}
              todoId={currentTodo}
            />
          )}
        </div>

        <section className={styles.pendingTodosSection}>
          <h3 className={styles.pendingTitle}>PENDING</h3>
          <div className={styles.pendingTodos}>
            {pendingTodos.map((todo) => (
              <div key={todo.id}>
                <Todo
                  text={todo.title}
                  completed={todo.completed}
                  handleContextMenuAction={handleContextMenuAction}
                  todoId={todo.id}
                  setCurrentTodo={setCurrentTodo}
                  currentTodo={currentTodo}
                  toggleCompleted={toggleCompleted}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.completedTodosSection}>
          <h3 className={styles.pendingTitle}>COMPLETED</h3>
          <div className={styles.pendingTodos}>
            {completedTodos.map((todo) => (
              <div key={todo.id}>
                <Todo
                  text={todo.title}
                  completed={todo.completed}
                  handleContextMenuAction={handleContextMenuAction}
                  todoId={todo.id}
                  setCurrentTodo={setCurrentTodo}
                  currentTodo={currentTodo}
                  toggleCompleted={toggleCompleted}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type APIResponse = Todo[];

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

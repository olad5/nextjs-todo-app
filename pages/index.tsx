import type { NextPage } from "next";
import AppButton from "../components/app-button/AppButton";
import styles from "../styles/Home.module.scss";
import Todo from "../components/todo/Todo";

const Home: NextPage = () => {
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
            <AppButton>
              <img
                className={styles.addTodoIcon}
                src="plus-sign-white-icon.svg"
                alt=" add todo icon"
              />
              <span>Add Todo</span>
            </AppButton>
          </div>
        </header>

        <section className={styles.pendingTodosSection}>
          <h3 className={styles.pendingTitle}>PENDING</h3>
          <div className={styles.pendingTodos}>
            <Todo text="Walk the dog" completed={false} />
            <Todo text="Wash the car" completed={false} />
          </div>
        </section>

        <section className={styles.completedTodosSection}>
          <h3 className={styles.pendingTitle}>COMPLETED</h3>
          <div className={styles.pendingTodos}>
            <Todo text="Done the dishes" completed={true} />
            <Todo text="clean the floor" completed={true} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

import styles from "./AppButton.module.scss";

type AppButtonProps = {
  children: React.ReactNode;
};

export default function AppButton({ children }: AppButtonProps) {
  return (
    <button className={styles.button} onClick={() => console.log()}>
      {children}
    </button>
  );
}

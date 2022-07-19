import styles from "./AppButton.module.scss";

type AppButtonProps = {
  children: React.ReactNode;
  onClick: VoidFunction | ((e: React.MouseEvent<HTMLButtonElement>) => void);
};

export default function AppButton({ children, onClick }: AppButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

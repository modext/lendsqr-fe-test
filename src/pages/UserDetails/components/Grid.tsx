import styles from "../UserDetails.module.scss";

type GridProps = {
  children: React.ReactNode;
  columns?: 4 | 5;
};

export function Grid({ children, columns = 5 }: GridProps) {
  return (
    <div
      className={columns === 4 ? styles.gridFour : styles.grid}
    >
      {children}
    </div>
  );
}

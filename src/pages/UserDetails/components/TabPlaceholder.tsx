import styles from "../UserDetails.module.scss";

type TabPlaceholderProps = {
  title: string;
  hint: string;
};

export function TabPlaceholder({ title, hint }: TabPlaceholderProps) {
  return (
    <div className={styles.tabPlaceholder}>
      <p>{title}</p>
      <p className={styles.tabPlaceholderHint}>{hint}</p>
    </div>
  );
}

import styles from "./StatCard.module.scss";

type StatCardProps = {
  title: string;
  value: string;
  icon?: React.ReactNode;
};

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon ?? "👥"}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

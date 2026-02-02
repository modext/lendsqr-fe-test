import { useParams } from "react-router-dom";
import styles from "./Placeholder.module.scss";

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function Placeholder() {
  const { name } = useParams<{ name: string }>();
  const title = name ? formatTitle(name) : "Page";

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>This section is coming soon.</p>
    </div>
  );
}

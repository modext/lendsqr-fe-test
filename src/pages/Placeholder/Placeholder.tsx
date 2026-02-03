import { useParams } from "react-router-dom";
import styles from "./Placeholder.module.scss";
import { slugToTitle } from "../../utils/format";

export function Placeholder() {
  const { name } = useParams<{ name: string }>();
  const title = name ? slugToTitle(name) : "Page";

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>This section is coming soon.</p>
    </div>
  );
}

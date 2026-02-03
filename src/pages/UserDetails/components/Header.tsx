import styles from "../UserDetails.module.scss";

export function Header() {
  return (
    <div className={styles.headerRow}>
      <h1 className={styles.title}>User Details</h1>
      <div className={styles.actions}>
        <button type="button" className={styles.blacklist}>
          BLACKLIST USER
        </button>
        <button type="button" className={styles.activate}>
          ACTIVATE USER
        </button>
      </div>
    </div>
  );
}

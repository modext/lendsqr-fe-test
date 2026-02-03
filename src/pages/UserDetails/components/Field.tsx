import styles from "../UserDetails.module.scss";

type FieldProps = {
  k: string;
  v: string;
};

export function Field({ k, v }: FieldProps) {
  return (
    <div>
      <div className={styles.fieldLabel}>{k}</div>
      <div className={styles.fieldValue}>{v}</div>
    </div>
  );
}

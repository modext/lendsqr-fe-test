import clsx from "clsx";
import styles from "../UserDetails.module.scss";

type FieldProps = {
  k: string;
  v: string;
  valueClassName?: string;
};

export function Field({ k, v, valueClassName }: FieldProps) {
  return (
    <div>
      <div className={styles.fieldLabel}>{k}</div>
      <div className={clsx(styles.fieldValue, valueClassName)}>{v}</div>
    </div>
  );
}

import clsx from "clsx";
import type { UserStatus } from "../../types/user";
import styles from "./StatusPill.module.scss";

export function StatusPill({ status }: { status: UserStatus }) {
  return <span className={clsx(styles.pill, styles[status.toLowerCase()])}>{status}</span>;
}

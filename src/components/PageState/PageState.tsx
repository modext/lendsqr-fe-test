import styles from "./PageState.module.scss";

type PageStateProps = {
  loading?: boolean;
  error?: string | null;
  notFound?: boolean;
  notFoundMessage?: string;
};

export function PageState({
  loading,
  error,
  notFound,
  notFoundMessage = "Not found",
}: PageStateProps) {
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (notFound) return <div className={styles.loading}>{notFoundMessage}</div>;
  return null;
}

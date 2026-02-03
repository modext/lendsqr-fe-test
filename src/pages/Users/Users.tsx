import styles from "./Users.module.scss";
import { useUsersList } from "./hooks/useUsersList";
import { initialFilters } from "./constants/filters";
import { PageHeader, StatCardsRow, UsersTableSection } from "./components";

export function Users() {
  const {
    users,
    total,
    page,
    pageSize,
    filters,
    setFilters,
    setPage,
    setPageSize,
    loading,
    error,
    stats,
  } = useUsersList(initialFilters);

  return (
    <div className={styles.wrap}>
      <PageHeader />
      <StatCardsRow stats={stats} />
      <UsersTableSection
        users={users}
        loading={loading}
        error={error}
        filters={filters}
        setFilters={setFilters}
        initialFilters={initialFilters}
        page={page}
        pageSize={pageSize}
        total={total}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
}

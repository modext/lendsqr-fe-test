import { useState } from "react";
import type { User } from "../../../types/user";
import type { FilterState } from "../../../components/FilterDrawer/FilterDrawer";
import { FilterDrawer } from "../../../components/FilterDrawer/FilterDrawer";
import { UsersTable } from "../../../components/UsersTable/UsersTable";
import { PageState } from "../../../components/PageState/PageState";
import { Pagination } from "../../../components/Pagination/Pagination";
import styles from "../Users.module.scss";

type UsersTableSectionProps = {
  users: User[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  setFilters: (next: FilterState) => void;
  initialFilters: FilterState;
  page: number;
  pageSize: number;
  total: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
};

export function UsersTableSection({
  users,
  loading,
  error,
  filters,
  setFilters,
  initialFilters,
  page,
  pageSize,
  total,
  setPage,
  setPageSize,
}: UsersTableSectionProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className={styles.tableArea}>
      <FilterDrawer
        open={filtersOpen}
        value={filters}
        onChange={setFilters}
        onReset={() => {
          setFilters(initialFilters);
          setPage(1);
        }}
        onApply={() => {
          setFiltersOpen(false);
          setPage(1);
        }}
        onClose={() => setFiltersOpen(false)}
      />

      <PageState loading={loading} error={error} />

      {!loading && !error && (
        <UsersTable
          users={users}
          onOpenFilters={() => setFiltersOpen((v) => !v)}
        />
      )}

      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
}

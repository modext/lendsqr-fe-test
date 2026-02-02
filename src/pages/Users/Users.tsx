import { useEffect, useMemo, useState } from "react";
import styles from "./Users.module.scss";
import { StatCard } from "../../components/StatCard/StatCard";
import { UsersTable } from "../../components/UsersTable/UsersTable";
import { FilterDrawer, type FilterState } from "../../components/FilterDrawer/FilterDrawer";
import { fetchUsers } from "../../services/api/users.api";
import { fetchUsers as fetchUsersStats } from "../../services/api";
import { cacheUsers } from "../../services/storage/users.store";
import type { User } from "../../types/user";
import iconUsers from "../../assets/users.svg";
import iconActiveUsers from "../../assets/active users.svg";
import iconUsersWithLoan from "../../assets/usersWithLoan.svg";
import iconUsersWithSavings from "../../assets/users with savings.svg";
import iconBack from "../../assets/back.svg";
import iconNext from "../../assets/next.svg";

const PAGE_SIZES = [10, 25, 50, 100];

const initialFilters: FilterState = {
  organization: "",
  username: "",
  email: "",
  date: "",
  phone: "",
  status: "",
};

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ users: 0, active: 0, loans: 0, savings: 0 });

  const query = useMemo(
    () => ({
      page,
      limit: pageSize,
      organization: filters.organization,
      username: filters.username,
      email: filters.email,
      phone: filters.phone,
      status: filters.status,
    }),
    [page, pageSize, filters]
  );

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchUsers(query);
      setUsers(res.data);
      setTotal(res.total);
      await cacheUsers(res.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(total / pageSize) || 1;

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, query.organization, query.username, query.email, query.phone, query.status]);

  useEffect(() => {
    fetchUsersStats({ limit: 500 })
      .then((res) => {
        const active = res.users.filter((u) => u.status === "active").length;
        const loans = res.users.filter((u) => u.hasLoan === true).length;
        const savings = res.users.filter((u) => u.hasSavings === true).length;
        setStats({ users: res.total, active, loans, savings });
      })
      .catch(() => setStats({ users: 500, active: 0, loans: 0, savings: 0 }));
  }, []);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Users</h1>

      <div className={styles.cards}>
        <StatCard title="USERS" value={stats.users.toLocaleString()} icon={<img src={iconUsers} alt="" width={40} height={40} />} />
        <StatCard title="ACTIVE USERS" value={stats.active.toLocaleString()} icon={<img src={iconActiveUsers} alt="" width={40} height={40} />} />
        <StatCard title="USERS WITH LOANS" value={stats.loans.toLocaleString()} icon={<img src={iconUsersWithLoan} alt="" width={40} height={40} />} />
        <StatCard title="USERS WITH SAVINGS" value={stats.savings.toLocaleString()} icon={<img src={iconUsersWithSavings} alt="" width={40} height={40} />} />
      </div>

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

        {loading && <div className={styles.state}>Loading...</div>}
        {error && <div className={styles.stateError}>{error}</div>}

        {!loading && !error && (
          <UsersTable users={users} onOpenFilters={() => setFiltersOpen((v) => !v)} />
        )}

        {/* <div className={styles.pagination}>
          <span>Showing</span>
          <select value={limit} disabled>
            <option value={10}>10</option>
          </select>
          <span>out of {total || 0}</span>

          <div className={styles.pager}>
            <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              {"<"}
            </button>
            <span>{page}</span>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={users.length < limit}
            >
              {">"}
            </button>
          </div>
        </div> */}
            <div className={styles.pagination}>
          <div className={styles.paginationLeft}>
            Showing{' '}
            <select
              className={styles.pageSizeSelect}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>{' '}
            out of {total.toLocaleString()}
          </div>
          <div className={styles.paginationRight}>
            <button
              type="button"
              className={styles.pageBtnArrow}
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <img src={iconBack} alt="" className={styles.pageArrowIcon} />
            </button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            {totalPages > 3 && (
              <>
                <span className={styles.pageEllipsis}>...</span>
                <button
                  type="button"
                  className={`${styles.pageBtn} ${page === totalPages ? styles.pageBtnActive : ''}`}
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              type="button"
              className={styles.pageBtnArrow}
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <img src={iconNext} alt="" className={styles.pageArrowIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

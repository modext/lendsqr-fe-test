import { useEffect, useMemo, useState } from "react";
import type { User } from "../../../types/user";
import type { FilterState } from "../../../components/FilterDrawer/FilterDrawer";
import { fetchUsers } from "../../../services/api/users.api";
import { fetchUsers as fetchUsersStats } from "../../../services/api";
import { cacheUsers } from "../../../services/storage/users.store";
import { PAGE_SIZES } from "../../../constants";
import type { StatCardKey } from "../../../constants";

export type UsersListQuery = {
  page: number;
  pageSize: number;
  filters: FilterState;
};

export type UsersStats = Record<StatCardKey, number>;

export function useUsersList(initialFiltersState: FilterState) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZES[0]);
  const [filters, setFilters] = useState<FilterState>(initialFiltersState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<UsersStats>({
    users: 0,
    active: 0,
    loans: 0,
    savings: 0,
  });

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

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchUsers(query);
        if (!cancelled) {
          setUsers(res.data);
          setTotal(res.total);
          await cacheUsers(res.data);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load users");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page, pageSize, query.organization, query.username, query.email, query.phone, query.status]);

  useEffect(() => {
    fetchUsersStats({ limit: 500 })
      .then((res) => {
        const active = res.users.filter((u) => u.status === "active").length;
        const loans = res.users.filter((u) => u.hasLoan === true).length;
        const savings = res.users.filter((u) => u.hasSavings === true).length;
        setStats({
          users: res.total,
          active,
          loans,
          savings,
        });
      })
      .catch(() =>
        setStats({ users: 500, active: 0, loans: 0, savings: 0 })
      );
  }, []);

  const totalPages = Math.ceil(total / pageSize) || 1;

  return {
    users,
    total,
    page,
    pageSize,
    totalPages,
    filters,
    setFilters,
    setPage,
    setPageSize,
    loading,
    error,
    stats,
  };
}

import { useEffect, useState } from "react";
import type { User } from "../../../types/user";
import { getCachedUser, cacheUser } from "../../../services/storage/users.store";
import { fetchUserById } from "../../../services/api/users.api";

export function useUserDetails(id: string | undefined) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const cached = await getCachedUser(id);
        if (cached) {
          setUser(cached);
          return;
        }

        const fresh = await fetchUserById(id);
        setUser(fresh);
        await cacheUser(fresh);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load user");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { user, loading, error };
}

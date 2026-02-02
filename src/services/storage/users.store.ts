import { openDB } from "idb";
import type { User } from "../../types/user";

const DB_NAME = "lendsqr-db";
const STORE = "users";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE)) {
      db.createObjectStore(STORE, { keyPath: "id" });
    }
  },
});

export async function cacheUsers(users: User[]) {
  const db = await dbPromise;
  const tx = db.transaction(STORE, "readwrite");
  for (const u of users) tx.store.put(u);
  await tx.done;
}

export async function getCachedUser(id: string) {
  const db = await dbPromise;
  return db.get(STORE, id) as Promise<User | undefined>;
}

export async function cacheUser(user: User) {
  const db = await dbPromise;
  await db.put(STORE, user);
}

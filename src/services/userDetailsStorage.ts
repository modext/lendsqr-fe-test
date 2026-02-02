/**
 * Store and retrieve user details using IndexedDB.
 * Falls back to localStorage if IndexedDB is unavailable.
 */

import type { UserDetails } from '@/types/user';

const DB_NAME = 'lendsqr-user-details';
const DB_VERSION = 1;
const STORE_NAME = 'users';
const LOCAL_STORAGE_KEY_PREFIX = 'lendsqr_user_';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

export async function saveUserDetails(user: UserDetails): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(user);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
      tx.oncomplete = () => db.close();
    });
  } catch {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + user.id, JSON.stringify(user));
  }
}

export async function getUserDetails(userId: string): Promise<UserDetails | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(userId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        db.close();
        resolve((request.result as UserDetails) ?? null);
      };
    });
  } catch {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + userId);
    return raw ? (JSON.parse(raw) as UserDetails) : null;
  }
}

export async function removeUserDetails(userId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(userId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
      tx.oncomplete = () => db.close();
    });
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_KEY_PREFIX + userId);
  }
}

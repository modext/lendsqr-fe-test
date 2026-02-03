/**
 * Stat card config shared by Dashboard and Users pages.
 * Icon paths are relative to src/assets.
 */
export const STAT_CARD_KEYS = ["users", "active", "loans", "savings"] as const;
export type StatCardKey = (typeof STAT_CARD_KEYS)[number];

export const STAT_CARDS: Record<StatCardKey, { title: string; icon: string }> = {
  users: { title: "USERS", icon: "users.svg" },
  active: { title: "ACTIVE USERS", icon: "active users.svg" },
  loans: { title: "USERS WITH LOANS", icon: "usersWithLoan.svg" },
  savings: { title: "USERS WITH SAVINGS", icon: "users with savings.svg" },
};

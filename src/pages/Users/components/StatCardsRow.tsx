import { StatCard } from "../../../components/StatCard/StatCard";
import { STAT_CARDS } from "../../../constants";
import type { StatCardKey } from "../../../constants";
import styles from "../Users.module.scss";
import iconUsers from "../../../assets/users.svg";
import iconActiveUsers from "../../../assets/active users.svg";
import iconUsersWithLoan from "../../../assets/usersWithLoan.svg";
import iconUsersWithSavings from "../../../assets/users with savings.svg";

const statCardIconImgs = {
  users: iconUsers,
  active: iconActiveUsers,
  loans: iconUsersWithLoan,
  savings: iconUsersWithSavings,
} as const;

type StatCardsRowProps = {
  stats: Record<StatCardKey, number>;
};

export function StatCardsRow({ stats }: StatCardsRowProps) {
  return (
    <div className={styles.cards}>
      {(Object.keys(STAT_CARDS) as Array<StatCardKey>).map((key) => (
        <StatCard
          key={key}
          title={STAT_CARDS[key].title}
          value={stats[key].toLocaleString()}
          icon={
            <img
              src={statCardIconImgs[key]}
              alt=""
              width={40}
              height={40}
            />
          }
        />
      ))}
    </div>
  );
}

import styles from "./Dashboard.module.scss";
import { StatCard } from "../../components/StatCard/StatCard";
import { STAT_CARDS } from "../../constants";
import iconUsers from "../../assets/users.svg";
import iconActiveUsers from "../../assets/active users.svg";
import iconUsersWithLoan from "../../assets/usersWithLoan.svg";
import iconUsersWithSavings from "../../assets/users with savings.svg";

const statCardIconImgs = {
  users: iconUsers,
  active: iconActiveUsers,
  loans: iconUsersWithLoan,
  savings: iconUsersWithSavings,
} as const;

const DASHBOARD_VALUES: Record<keyof typeof STAT_CARDS, string> = {
  users: "2,453",
  active: "2,453",
  loans: "12,453",
  savings: "102,453",
};

export function Dashboard() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.cards}>
        {(Object.keys(STAT_CARDS) as Array<keyof typeof STAT_CARDS>).map(
          (key) => (
            <StatCard
              key={key}
              title={STAT_CARDS[key].title}
              value={DASHBOARD_VALUES[key]}
              icon={
                <img
                  src={statCardIconImgs[key]}
                  alt=""
                  width={40}
                  height={40}
                />
              }
            />
          )
        )}
      </div>
    </div>
  );
}

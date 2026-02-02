import styles from "./Dashboard.module.scss";
import { StatCard } from "../../components/StatCard/StatCard";
import iconUsers from "../../assets/users 1.svg";
import iconActiveUsers from "../../assets/active users.svg";
import iconUsersWithLoan from "../../assets/usersWithLoan.svg";
import iconUsersWithSavings from "../../assets/users with savings.svg";

export function Dashboard() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.cards}>
        <StatCard
          title="USERS"
          value="2,453"
          icon={<img src={iconUsers} alt="" width={40} height={40} />}
        />
        <StatCard
          title="ACTIVE USERS"
          value="2,453"
          icon={<img src={iconActiveUsers} alt="" width={40} height={40} />}
        />
        <StatCard
          title="USERS WITH LOANS"
          value="12,453"
          icon={<img src={iconUsersWithLoan} alt="" width={40} height={40} />}
        />
        <StatCard
          title="USERS WITH SAVINGS"
          value="102,453"
          icon={<img src={iconUsersWithSavings} alt="" width={40} height={40} />}
        />
      </div>
    </div>
  );
}

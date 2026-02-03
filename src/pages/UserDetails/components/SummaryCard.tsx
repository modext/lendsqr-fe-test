import type { User } from "../../../types/user";
import type { TabId } from "../constants/tabs";
import { TAB_LIST } from "../constants/tabs";
import styles from "../UserDetails.module.scss";
import userAvatarImg from "../../../assets/user-avatar.svg";
import starFullIcon from "../../../assets/star rating full.svg";
import starEmptyIcon from "../../../assets/start rating empty.svg";
import { formatNGN } from "../../../utils/format";

type SummaryCardProps = {
  user: User;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export function SummaryCard({ user, activeTab, onTabChange }: SummaryCardProps) {
  const balance = user.account?.balance ?? 200000;
  const bankName = user.account?.bankName ?? "Providus Bank";
  const acct = user.account?.accountNumber ?? "9912345678";

  return (
    <div className={styles.summaryCard}>
      <div className={styles.summary}>
        <div className={styles.profile}>
          <img
            src={userAvatarImg}
            alt=""
            className={styles.avatar}
            width={100}
            height={100}
          />
          <div>
            <div className={styles.name}>{user.fullName ?? user.username}</div>
            <div className={styles.code}>
              LSQF{String(user.id).padStart(6, "0")}
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div>
          <div className={styles.label}>User's Tier</div>
          <div
            className={styles.stars}
            role="img"
            aria-label="3 out of 5 stars"
          >
            <img src={starFullIcon} alt="" width={20} height={20} aria-hidden />
            <img src={starFullIcon} alt="" width={20} height={20} aria-hidden />
            <img src={starFullIcon} alt="" width={20} height={20} aria-hidden />
            <img src={starEmptyIcon} alt="" width={20} height={20} aria-hidden />
            <img src={starEmptyIcon} alt="" width={20} height={20} aria-hidden />
          </div>
        </div>

        <div className={styles.divider} />

        <div>
          <div className={styles.balance}>{formatNGN(balance)}</div>
          <div className={styles.bank}>
            {acct}/{bankName}
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        {TAB_LIST.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={activeTab === id ? styles.tabActive : styles.tab}
            onClick={() => onTabChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

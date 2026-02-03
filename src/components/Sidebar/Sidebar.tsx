import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";

import iconHome from "../../assets/home 1.svg";
import iconUsers from "../../assets/users 1.svg";
import iconUserFriends from "../../assets/user-friends 1.svg";
import iconBriefcase from "../../assets/briefcase 1.svg";
import iconSliders from "../../assets/sliders-h 1.svg";
import iconSack from "../../assets/sack 1.svg";
import iconHandshake from "../../assets/handshake-regular 1.svg";
import iconUserCheck from "../../assets/user-check 1.svg";
import iconLoanRequests from "../../assets/home request icon.svg";
import iconKarma from "../../assets/karma icon.svg";
import iconGalaxy from "../../assets/galaxy 1.svg";
import iconBank from "../../assets/np_bank_148501_000000 1.svg";
import iconCoins from "../../assets/coins-solid 1.svg";
import iconPiggyBank from "../../assets/piggy-bank 1.svg";
import iconScroll from "../../assets/scroll 1.svg";
import iconTransactions from "../../assets/transactions.svg";
import iconUserCog from "../../assets/user-cog 1.svg";
import iconClipboard from "../../assets/clipboard-list 1.svg";
import iconChartBar from "../../assets/chart-bar 2.svg";
import iconBadgePercent from "../../assets/badge-percent 1.svg";
import iconSystemMessages from "../../assets/system messages.svg";
import iconLogout from "../../assets/logout.svg";
import iconArrowDown from "../../assets/arrow down.svg";

type NavItem = { label: string; to: string; icon: string };

function SidebarIcon({ src, alt = "" }: { src: string; alt?: string }) {
  return <img src={src} alt={alt} className={styles.iconImg} width={16} height={16} />;
}

const customers: NavItem[] = [
  { label: "Users", to: "/users", icon: iconUserFriends },
  { label: "Guarantors", to: "/section/guarantors", icon: iconUsers },
  { label: "Loans", to: "/section/loans", icon: iconSack },
  { label: "Decision Models", to: "/section/decision-models", icon: iconHandshake },
  { label: "Savings", to: "/section/savings", icon: iconPiggyBank },
  { label: "Loan Requests", to: "/section/loan-requests", icon: iconLoanRequests },
  { label: "Whitelist", to: "/section/whitelist", icon: iconUserCheck },
  { label: "Karma", to: "/section/karma", icon: iconKarma },
];

const businesses: NavItem[] = [
  { label: "Organization", to: "/section/organization", icon: iconBriefcase },
  { label: "Loan Products", to: "/section/loan-products", icon: iconLoanRequests },
  { label: "Savings Products", to: "/section/savings-products", icon: iconBank },
  { label: "Fees and Charges", to: "/section/fees-and-charges", icon: iconCoins },
  { label: "Transactions", to: "/section/transactions", icon: iconTransactions },
  { label: "Services", to: "/section/services", icon: iconGalaxy },
  { label: "Service Account", to: "/section/service-account", icon: iconUserCog },
  { label: "Settlements", to: "/section/settlements", icon: iconScroll },
  { label: "Reports", to: "/section/reports", icon: iconChartBar },
];

const settings: NavItem[] = [
  { label: "Preferences", to: "/section/preferences", icon: iconSliders },
  { label: "Fees and Pricing", to: "/section/fees-and-pricing", icon: iconBadgePercent },
  { label: "Audit Logs", to: "/section/audit-logs", icon: iconClipboard },
  { label: "Systems Messages", to: "/section/systems-messages", icon: iconSystemMessages },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const linkProps = onClose ? { onClick: onClose } : {};

  return (
    <>
      {open && (
        <button
          type="button"
          className={styles.overlay}
          onClick={onClose}
          aria-label="Close menu"
        />
      )}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <div className={styles.inner}>
          <div className={styles.switchOrg}>
            <div className={styles.switchLeft}>
              <img src={iconBriefcase} alt="" className={styles.switchIcon} width={16} height={16} />
              <span>Switch Organization</span>
            </div>
            <img src={iconArrowDown} alt="" className={styles.chev} width={14} height={14} aria-hidden />
          </div>

          <NavLink
            to="/dashboard"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
            {...linkProps}
          >
            <span className={styles.iconWrap}>
              <SidebarIcon src={iconHome} alt="" />
            </span>
            <span className={styles.label}>Dashboard</span>
          </NavLink>

          <div className={styles.sectionTitle}>CUSTOMERS</div>
          {customers.map((it) => (
            <NavLink
              key={it.label}
              to={it.to}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? `${styles.item} ${styles.active}` : styles.item
              }
              {...linkProps}
            >
              <span className={styles.iconWrap}>
                <SidebarIcon src={it.icon} alt="" />
              </span>
              <span className={styles.label}>{it.label}</span>
            </NavLink>
          ))}

          <div className={styles.sectionTitle}>BUSINESSES</div>
          {businesses.map((it) => (
            <NavLink
              key={it.label}
              to={it.to}
              className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.active}` : styles.item
              }
              {...linkProps}
            >
              <span className={styles.iconWrap}>
                <SidebarIcon src={it.icon} alt="" />
              </span>
              <span className={styles.label}>{it.label}</span>
            </NavLink>
          ))}

          <div className={styles.sectionTitle}>SETTINGS</div>
          {settings.map((it) => (
            <NavLink
              key={it.label}
              to={it.to}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? `${styles.item} ${styles.active}` : styles.item
              }
              {...linkProps}
            >
              <span className={styles.iconWrap}>
                <SidebarIcon src={it.icon} alt="" />
              </span>
              <span className={styles.label}>{it.label}</span>
            </NavLink>
          ))}

          <div className={styles.footer}>
            <button
              className={styles.logout}
              onClick={() => {
                localStorage.removeItem("lendsqr_auth");
                window.location.href = "/login";
              }}
              type="button"
            >
              <span className={styles.iconWrap}>
                <SidebarIcon src={iconLogout} alt="" />
              </span>
              <span className={styles.label}>Logout</span>
            </button>

            <div className={styles.version}>v1.2.0</div>
          </div>
        </div>
      </aside>
    </>
  );
}

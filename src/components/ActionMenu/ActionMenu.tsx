import { useEffect, useRef } from "react";
import styles from "./ActionMenu.module.scss";
import iconActivateUser from "../../assets/activate user.svg";
import iconBlacklistUser from "../../assets/blacklist user.svg";
import iconViewDetails from "../../assets/view details.svg";

const iconSize = 14;

export function ActionMenu({
  open,
  onClose,
  onViewDetails,
  onBlacklist,
  onActivate,
}: {
  open: boolean;
  onClose: () => void;
  onViewDetails: () => void;
  onBlacklist: () => void;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      onClose();
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className={styles.menu} role="menu">
      <button type="button" onClick={onViewDetails} className={styles.menuItem}>
        <img src={iconViewDetails} alt="" className={styles.menuIcon} width={iconSize} height={iconSize} />
        <span>View Details</span>
      </button>
      <button type="button" onClick={onBlacklist} className={styles.menuItem}>
        <img src={iconBlacklistUser} alt="" className={styles.menuIcon} width={iconSize} height={iconSize} />
        <span>Blacklist User</span>
      </button>
      <button type="button" onClick={onActivate} className={styles.menuItem}>
        <img src={iconActivateUser} alt="" className={styles.menuIcon} width={iconSize} height={iconSize} />
        <span>Activate User</span>
      </button>
    </div>
  );
}

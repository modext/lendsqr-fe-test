import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user";
import { StatusPill } from "../StatusPill/StatusPill";
import { ActionMenu } from "../ActionMenu/ActionMenu";
import { formatDateJoined } from "../../utils/format";
import styles from "./UsersTable.module.scss";
import filterIcon from "../../assets/filter-results-button.svg";

export function UsersTable({
  users,
  onOpenFilters,
}: {
  users: User[];
  onOpenFilters: () => void;
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const nav = useNavigate();

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              ORGANIZATION <button type="button" onClick={onOpenFilters} className={styles.filterBtn} aria-label="Filter"><img src={filterIcon} alt="" className={styles.filterIconImg} width={16} height={16} /></button>
            </th>
            <th>
              USERNAME <button type="button" onClick={onOpenFilters} className={styles.filterBtn} aria-label="Filter"><img src={filterIcon} alt="" className={styles.filterIconImg} width={16} height={16} /></button>
            </th>
            <th>
              EMAIL <button type="button" onClick={onOpenFilters} className={styles.filterBtn} aria-label="Filter"><img src={filterIcon} alt="" className={styles.filterIconImg} width={16} height={16} /></button>
            </th>
            <th>
              PHONE NUMBER <button type="button" onClick={onOpenFilters} className={styles.filterBtn} aria-label="Filter"><img src={filterIcon} alt="" className={styles.filterIconImg} width={16} height={16} /></button>
            </th>
            <th>
              DATE JOINED <button type="button" onClick={onOpenFilters} className={styles.filterBtn} aria-label="Filter"><img src={filterIcon} alt="" className={styles.filterIconImg} width={16} height={16} /></button>
            </th>
            <th>
              STATUS <button type="button" onClick={onOpenFilters} className={styles.filterBtn} aria-label="Filter"><img src={filterIcon} alt="" className={styles.filterIconImg} width={16} height={16} /></button>
            </th>
            <th />
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.organization}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{formatDateJoined(u.dateJoined)}</td>
              <td><StatusPill status={u.status} /></td>
              <td className={styles.menuCell}>
                <button type="button" className={styles.kebab} onClick={() => setOpenMenuId(openMenuId === u.id ? null : u.id)}>
                  ⋮
                </button>

                <div className={styles.menuAnchor}>
                  <ActionMenu
                    open={openMenuId === u.id}
                    onClose={() => setOpenMenuId(null)}
                    onViewDetails={() => nav(`/users/${u.id}`)}
                    onBlacklist={() => setOpenMenuId(null)}
                    onActivate={() => setOpenMenuId(null)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

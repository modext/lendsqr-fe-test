import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <div className={styles.headerRow}>
        <Header
          onMenuClick={() => setSidebarOpen((o) => !o)}
          isMenuOpen={sidebarOpen}
        />
      </div>
      <div className={styles.body}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className={styles.main}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

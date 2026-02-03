import type { User } from "../../../types/user";
import type { TabId } from "../constants/tabs";
import styles from "../UserDetails.module.scss";
import { GeneralTab } from "./GeneralTab";
import { TabPlaceholder } from "./TabPlaceholder";

type DetailPanelProps = {
  user: User;
  activeTab: TabId;
};

export function DetailPanel({ user, activeTab }: DetailPanelProps) {
  const acct = user.account?.accountNumber ?? "9912345678";
  const bankName = user.account?.bankName ?? "Providus Bank";

  return (
    <div className={styles.panel}>
      {activeTab === "general" && <GeneralTab user={user} />}

      {activeTab === "documents" && (
        <TabPlaceholder
          title="Documents"
          hint="No documents uploaded yet."
        />
      )}

      {activeTab === "bank" && (
        <TabPlaceholder
          title="Bank Details"
          hint={`Account: ${acct} · ${bankName}`}
        />
      )}

      {activeTab === "loans" && (
        <TabPlaceholder title="Loans" hint="No active loans." />
      )}

      {activeTab === "savings" && (
        <TabPlaceholder
          title="Savings"
          hint="No savings products."
        />
      )}

      {activeTab === "app" && (
        <TabPlaceholder
          title="App and System"
          hint="System information will appear here."
        />
      )}
    </div>
  );
}

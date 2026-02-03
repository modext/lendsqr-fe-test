import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { TabId } from "./constants/tabs";
import { useUserDetails } from "./hooks/useUserDetails";
import { Header, SummaryCard, DetailPanel } from "./components";
import { PageState } from "../../components/PageState/PageState";
import styles from "./UserDetails.module.scss";
import backToUsersIcon from "../../assets/back to users icon.svg";

export function UserDetails() {
  const { id } = useParams();
  const { user, loading, error } = useUserDetails(id);
  const [activeTab, setActiveTab] = useState<TabId>("general");

  if (loading) return <PageState loading />;
  if (error) return <PageState error={error} />;
  if (!user) return <PageState notFound notFoundMessage="User not found" />;

  return (
    <div className={styles.wrap}>
      <Link to="/users" className={styles.back}>
        <img src={backToUsersIcon} alt="" className={styles.backIcon} aria-hidden />
        Back to Users
      </Link>
      <Header />
      <SummaryCard
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <DetailPanel user={user} activeTab={activeTab} />
    </div>
  );
}

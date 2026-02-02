import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./UserDetails.module.scss";
import type { User } from "../../types/user";
import userAvatarImg from "../../assets/user-avatar.svg";
import backToUsersIcon from "../../assets/back to users icon.svg";
import starFullIcon from "../../assets/star rating full.svg";
import starEmptyIcon from "../../assets/start rating empty.svg";
import { getCachedUser, cacheUser } from "../../services/storage/users.store";
import { fetchUserById } from "../../services/api/users.api";
import { formatNGN } from "../../utils/format";

type TabId = "general" | "documents" | "bank" | "loans" | "savings" | "app";

const TAB_LIST: { id: TabId; label: string }[] = [
  { id: "general", label: "General Details" },
  { id: "documents", label: "Documents" },
  { id: "bank", label: "Bank Details" },
  { id: "loans", label: "Loans" },
  { id: "savings", label: "Savings" },
  { id: "app", label: "App and System" },
];

export function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("general");

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const cached = await getCachedUser(id);
        if (cached) {
          setUser(cached);
          return;
        }

        const fresh = await fetchUserById(id);
        setUser(fresh);
        await cacheUser(fresh);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load user");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <div className={styles.state}>Loading...</div>;
  if (error) return <div className={styles.stateError}>{error}</div>;
  if (!user) return <div className={styles.state}>User not found</div>;

  const balance = user.account?.balance ?? 200000;
  const bankName = user.account?.bankName ?? "Providus Bank";
  const acct = user.account?.accountNumber ?? "9912345678";

  return (
    <div className={styles.wrap}>
      <Link to="/users" className={styles.back}>
        <img src={backToUsersIcon} alt="" className={styles.backIcon} aria-hidden />
        Back to Users
      </Link>

      <div className={styles.headerRow}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.actions}>
          <button type="button" className={styles.blacklist}>BLACKLIST USER</button>
          <button type="button" className={styles.activate}>ACTIVATE USER</button>
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.profile}>
          <img src={userAvatarImg} alt="" className={styles.avatar} width={100} height={100} />
          <div>
            <div className={styles.name}>{user.fullName ?? user.username}</div>
            <div className={styles.code}>LSQF{String(user.id).padStart(6, "0")}</div>
          </div>
        </div>

        <div className={styles.divider} />

        <div>
          <div className={styles.label}>User's Tier</div>
          <div className={styles.stars} role="img" aria-label="3 out of 5 stars">
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
          <div className={styles.bank}>{acct}/{bankName}</div>
        </div>
      </div>

      <div className={styles.tabs}>
        {TAB_LIST.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={activeTab === id ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {activeTab === "general" && (
          <>
        <Section title="Personal Information">
          <Grid>
            <Field k="FULL NAME" v={user.fullName ?? user.username} />
            <Field k="PHONE NUMBER" v={user.phone} />
            <Field k="EMAIL ADDRESS" v={user.email} />
            <Field k="BVN" v={user.profile?.bvn ?? user.phone} />
            <Field k="GENDER" v={user.profile?.gender ?? "Female"} />
          </Grid>

          <Grid>
            <Field k="MARITAL STATUS" v={user.profile?.maritalStatus ?? "Single"} />
            <Field k="CHILDREN" v={user.profile?.children ?? "None"} />
            <Field k="TYPE OF RESIDENCE" v={user.profile?.residenceType ?? "Parent's Apartment"} />
          </Grid>
        </Section>

        <Divider />

        <Section title="Education and Employment">
          <Grid>
            <Field k="LEVEL OF EDUCATION" v={user.education?.level ?? "B.Sc"} />
            <Field k="EMPLOYMENT STATUS" v={user.education?.employmentStatus ?? "Employed"} />
            <Field k="SECTOR OF EMPLOYMENT" v={user.education?.sector ?? "FinTech"} />
            <Field k="DURATION OF EMPLOYMENT" v={user.education?.duration ?? "2 years"} />
          </Grid>

          <Grid>
            <Field k="OFFICE EMAIL" v={user.education?.officeEmail ?? "grace@lendsqr.com"} />
            <Field k="MONTHLY INCOME" v={user.education?.monthlyIncomeRange ?? "₦200,000.00 - ₦400,000.00"} />
            <Field k="LOAN REPAYMENT" v={user.education?.loanRepayment ?? "40,000"} />
          </Grid>
        </Section>

        <Divider />

        <Section title="Socials">
          <Grid>
            <Field k="TWITTER" v={user.socials?.twitter ?? "@grace_effiom"} />
            <Field k="FACEBOOK" v={user.socials?.facebook ?? "Grace Effiom"} />
            <Field k="INSTAGRAM" v={user.socials?.instagram ?? "@grace_effiom"} />
          </Grid>
        </Section>

        <Divider />

        <Section title="Guarantor">
          <Grid>
            <Field k="FULL NAME" v={user.guarantors?.[0]?.fullName ?? "Debby Ogana"} />
            <Field k="PHONE NUMBER" v={user.guarantors?.[0]?.phone ?? user.phone} />
            <Field k="EMAIL ADDRESS" v={user.guarantors?.[0]?.email ?? "debby@gmail.com"} />
            <Field k="RELATIONSHIP" v={user.guarantors?.[0]?.relationship ?? "Sister"} />
          </Grid>
        </Section>
          </>
        )}

        {activeTab === "documents" && (
          <div className={styles.tabPlaceholder}>
            <p>Documents</p>
            <p className={styles.tabPlaceholderHint}>No documents uploaded yet.</p>
          </div>
        )}

        {activeTab === "bank" && (
          <div className={styles.tabPlaceholder}>
            <p>Bank Details</p>
            <p className={styles.tabPlaceholderHint}>Account: {acct} · {bankName}</p>
          </div>
        )}

        {activeTab === "loans" && (
          <div className={styles.tabPlaceholder}>
            <p>Loans</p>
            <p className={styles.tabPlaceholderHint}>No active loans.</p>
          </div>
        )}

        {activeTab === "savings" && (
          <div className={styles.tabPlaceholder}>
            <p>Savings</p>
            <p className={styles.tabPlaceholderHint}>No savings products.</p>
          </div>
        )}

        {activeTab === "app" && (
          <div className={styles.tabPlaceholder}>
            <p>App and System</p>
            <p className={styles.tabPlaceholderHint}>System information will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className={styles.sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className={styles.fieldLabel}>{k}</div>
      <div className={styles.fieldValue}>{v}</div>
    </div>
  );
}

function Divider() {
  return <div className={styles.panelDivider} />;
}

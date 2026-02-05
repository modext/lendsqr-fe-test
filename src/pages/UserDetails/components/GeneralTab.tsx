import type { User } from "../../../types/user";
import { Section } from "./Section";
import { Grid } from "./Grid";
import { Field } from "./Field";
import styles from "../UserDetails.module.scss";

type GeneralTabProps = {
  user: User;
};

export function GeneralTab({ user }: GeneralTabProps) {
  const monthlyIncome =
    (user.education?.monthlyIncomeRange ?? "₦200,000.00 - ₦400,000.00").replace(
      /\s*-\s*/g,
      "\u00A0-\u00A0"
    );

  return (
    <>
      <Section title="Personal Information">
        <Grid>
          <Field k="FULL NAME" v={user.fullName ?? user.username} />
          <Field k="PHONE NUMBER" v={user.phone} />
          <Field
            k="EMAIL ADDRESS"
            v={user.email ?? ""}
            valueClassName={styles.fieldValueNoWrap}
          />
          <Field k="BVN" v={user.profile?.bvn ?? user.phone} />
          <Field k="GENDER" v={user.profile?.gender ?? "Female"} />
          <Field k="MARITAL STATUS" v={user.profile?.maritalStatus ?? "Single"} />
          <Field k="CHILDREN" v={user.profile?.children ?? "None"} />
          <Field
            k="TYPE OF RESIDENCE"
            v={user.profile?.residenceType ?? "Parent's Apartment"}
          />
        </Grid>
      </Section>

      <div className={styles.panelDivider} />

      <Section title="Education and Employment">
        <Grid columns={4}>
          <Field
            k="LEVEL OF EDUCATION"
            v={user.education?.level ?? "B.Sc"}
          />
          <Field
            k="EMPLOYMENT STATUS"
            v={user.education?.employmentStatus ?? "Employed"}
          />
          <Field
            k="SECTOR OF EMPLOYMENT"
            v={user.education?.sector ?? "FinTech"}
          />
          <Field
            k="DURATION OF EMPLOYMENT"
            v={user.education?.duration ?? "2 years"}
          />
        </Grid>

        <Grid columns={4}>
          <Field
            k="OFFICE EMAIL"
            v={user.education?.officeEmail ?? "grace@lendsqr.com"}
            valueClassName={styles.fieldValueNoWrap}
          />
          <Field
            k="MONTHLY INCOME"
            v={monthlyIncome}
            valueClassName={styles.fieldValueNoWrap}
          />
          <Field
            k="LOAN REPAYMENT"
            v={user.education?.loanRepayment ?? "40,000"}
          />
        </Grid>
      </Section>

      <div className={styles.panelDivider} />

      <Section title="Socials">
        <Grid>
          <Field k="TWITTER" v={user.socials?.twitter ?? "@grace_effiom"} />
          <Field k="FACEBOOK" v={user.socials?.facebook ?? "Grace Effiom"} />
          <Field k="INSTAGRAM" v={user.socials?.instagram ?? "@grace_effiom"} />
        </Grid>
      </Section>

      <div className={styles.panelDivider} />

      <Section title="Guarantor">
        <Grid>
          <Field
            k="FULL NAME"
            v={user.guarantors?.[0]?.fullName ?? "Debby Ogana"}
          />
          <Field
            k="PHONE NUMBER"
            v={user.guarantors?.[0]?.phone ?? user.phone}
          />
          <Field
            k="EMAIL ADDRESS"
            v={user.guarantors?.[0]?.email ?? "debby@gmail.com"}
            valueClassName={styles.fieldValueNoWrap}
          />
          <Field
            k="RELATIONSHIP"
            v={user.guarantors?.[0]?.relationship ?? "Sister"}
          />
        </Grid>
      </Section>
    </>
  );
}

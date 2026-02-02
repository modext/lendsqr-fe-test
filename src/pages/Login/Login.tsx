import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import logoImg from "../../assets/Group (4).svg";
import pabloIllustration from "../../assets/pablo-sign-in 1.png";

export function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError("Email is required");
    if (!password.trim()) return setError("Password is required");

    localStorage.setItem("lendsqr_auth", "true");
    nav("/users");
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src={logoImg} alt="Lendsqr" className={styles.logoImg} />
        </div>
        <div className={styles.illustrationWrap}>
          <img
            src={pabloIllustration}
            alt=""
            className={styles.illustration}
            aria-hidden
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.logoMobile} aria-hidden>
          <img src={logoImg} alt="Lendsqr" className={styles.logoImgMobile} />
        </div>
        <div className={styles.formBox}>
          <h1 className={styles.welcome}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <form onSubmit={onSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              autoComplete="email"
            />
            <div className={styles.passwordWrap}>
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.passwordInput}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.showToggle}
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <a href="#" className={styles.forgotLink}>
              FORGOT PASSWORD?
            </a>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submitBtn}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

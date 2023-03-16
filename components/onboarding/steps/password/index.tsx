import genericStyles from '../index.module.css';
import styles from './index.module.css';
import { Roboto } from 'next/font/google';
import useOnboarding from '@/hooks/onboarding-manager';
import { useEffect, useRef, useState } from 'react';

const roboto700 = Roboto({ weight: '700', subsets: ['latin'] });

export default function PasswordStep() {
  const { executeInstance, currentStep } = useOnboarding();
  const [submitted, setSubmitted] = useState(false);
  const [extraData, setExtraData] = useState<any>({});
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentStep?.extra) {
      const json = JSON.parse(currentStep.extra);
      setExtraData(json);
    }
  }, [currentStep]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    executeInstance(formData);
  };

  return (
    <section>
      <header>
        <p className={`${genericStyles.title} ${roboto700.className}`}>
          ✨ Congratulations ✨🎉
        </p>
        <p className={genericStyles.subTitle}>Your process was approved</p>
      </header>
      <p className={styles.accessCodeHelper}>
        For future logins, use this access code and define a new password
      </p>
      <p className={styles.accessCode}>{extraData.accessCode}</p>
      <form
        className={`${genericStyles.form} ${
          submitted && genericStyles.submitted
        }`}
        onSubmit={onSubmit}
      >
        <section className={genericStyles.formItem}>
          <label htmlFor="password">
            Password <span aria-label="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            required
            ref={passwordRef}
          />
        </section>
        <section className={genericStyles.formItem}>
          <label htmlFor="confirmpassword">
            Confirm password <span aria-label="required">*</span>
          </label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            autoComplete="off"
            required
            onChange={(e) =>
              e.target.setCustomValidity(
                e.target.value !== passwordRef.current?.value
                  ? "Passwords don't match"
                  : '',
              )
            }
          />
        </section>
        <button
          className={genericStyles.button}
          type="submit"
          onClick={() => setSubmitted(true)}
        >
          Finish
        </button>
      </form>
    </section>
  );
}

import genericStyles from '../index.module.css';
import { Roboto } from 'next/font/google';
import useOnboarding from '@/hooks/onboarding-manager';
import { useState } from 'react';

const roboto700 = Roboto({ weight: '700', subsets: ['latin'] });

export default function PasswordStep() {
  const { executeInstance } = useOnboarding();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    executeInstance(formData);
  };

  return (
    <section>
      <header>
        <p className={`${genericStyles.title} ${roboto700.className}`}>
          Everything is set up
        </p>
        <p className={genericStyles.subTitle}>
          Please, create a password for future logins
        </p>
      </header>
      <br />
      <form
        className={`${genericStyles.form} ${
          submitted && genericStyles.submitted
        }`}
        onSubmit={onSubmit}
      >
        <section className={genericStyles.formItem}>
          <label htmlFor="password">
            Passowrd <span aria-label="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            required
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

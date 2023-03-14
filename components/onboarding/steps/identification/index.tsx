import genericStyles from '../index.module.css';
import { Roboto } from 'next/font/google';
import useOnboarding from '@/hooks/onboarding-manager';

const roboto700 = Roboto({ weight: '700', subsets: ['latin'] });

export default function IdentificationStep() {
  const { executeInstance } = useOnboarding();

  const onSubmit = (e: any) => {
    e.preventDefault();
    executeInstance();
  };

  return (
    <section>
      <header>
        <p className={`${genericStyles.title} ${roboto700.className}`}>
          Identification
        </p>
        <p className={genericStyles.subTitle}>
          We want to know more about you!
        </p>
      </header>
      <br />
      <form className={genericStyles.form} onSubmit={onSubmit}>
        <section className={genericStyles.group}>
          <section className={genericStyles.formItem}>
            <label htmlFor="documentType">
              Document type <span aria-label="required">*</span>
            </label>
            <select id="documentType" name="documentType" required>
              <option value="1">ID</option>
              <option value="2">Passport</option>
              <option value="3">Driver license</option>
            </select>
          </section>
          <section className={genericStyles.formItem}>
            <label htmlFor="documentNumber">
              Doc. Number <span aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="documentNumber"
              name="documentNumber"
              // required
            />
          </section>
          <section className={genericStyles.formItem}>
            <label htmlFor="birthdate">
              Birthdate <span aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="birthdate"
              name="birthdate"
              // placeholder="00/00/0000"
              // required
            />
          </section>
        </section>
        <section className={genericStyles.formItem}>
          <label htmlFor="firstName">
            First name <span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="off"
            // pattern="[a-zA-Z]+"
            // required
          />
        </section>
        <section className={genericStyles.formItem}>
          <label htmlFor="familyName">
            Family name <span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="familyName"
            name="familyName"
            autoComplete="off"
            // required
            // pattern="[a-zA-Z]+"
          />
        </section>
        <button className={genericStyles.button} type="submit">
          Next
        </button>
      </form>
    </section>
  );
}

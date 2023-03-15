import genericStyles from '../index.module.css';
import { Roboto } from 'next/font/google';
import useOnboarding from '@/hooks/onboarding-manager';

const roboto700 = Roboto({ weight: '700', subsets: ['latin'] });

export default function PasswordStep() {
  const { executeInstance } = useOnboarding();

  const onSubmit = (e: any) => {
    e.preventDefault();
    executeInstance(new FormData());
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
      <form className={genericStyles.form} onSubmit={onSubmit}>
        <button className={genericStyles.button} type="submit">
          Finish
        </button>
      </form>
    </section>
  );
}

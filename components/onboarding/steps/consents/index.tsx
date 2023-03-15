import genericStyles from '../index.module.css';
import { Roboto } from 'next/font/google';
import useOnboarding from '@/hooks/onboarding-manager';

const roboto700 = Roboto({ weight: '700', subsets: ['latin'] });

export default function ConsentsStep() {
  const { executeInstance } = useOnboarding();

  const onSubmit = (e: any) => {
    e.preventDefault();
    executeInstance({});
  };

  return (
    <section>
      <header>
        <p className={`${genericStyles.title} ${roboto700.className}`}>
          Consents
        </p>
        <p className={genericStyles.subTitle}>
          Read everything before continuing
        </p>
      </header>
      <br />
      <form className={genericStyles.form} onSubmit={onSubmit}>
        <button className={genericStyles.button} type="submit">
          Next
        </button>
      </form>
    </section>
  );
}

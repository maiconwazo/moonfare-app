import { useEffect } from 'react';
import styles from './index.module.css';
import genericStyles from '../index.module.css';
import useOnboarding from '@/hooks/onboarding-manager';
import { Roboto } from 'next/font/google';

const roboto900 = Roboto({ weight: '900', subsets: ['latin'] });

export function WelcomeStep() {
  const { startInstance } = useOnboarding();

  useEffect(() => {
    import('@lottiefiles/lottie-player');
  });

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <p className={`${styles.title} ${roboto900.className}`}>
          Account Opening
        </p>
        <p className={styles.subTitle}>Welcome to Imaginary Bank</p>
      </header>
      <main className={styles.main}>
        <figure className={styles.rocket}>
          <lottie-player
            id="firstLottie"
            autoplay
            mode="normal"
            loop
            src="./rocket.json"
          />
        </figure>
        <button onClick={startInstance} className={genericStyles.button}>
          Let's start 😊
        </button>
      </main>
    </section>
  );
}

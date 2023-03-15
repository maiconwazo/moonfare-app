import useOnboarding from '@/hooks/onboarding-manager';
import { Roboto } from 'next/font/google';
import { useEffect } from 'react';
import genericStyles from '../../index.module.css';
import styles from './index.module.css';

const roboto700 = Roboto({ weight: '700', subsets: ['latin'] });

export default function OutputDocumentPartial() {
  const { refreshInstanceSilently } = useOnboarding();
  useEffect(() => {
    import('@lottiefiles/lottie-player');
  });

  useEffect(() => {
    const timer = setInterval(refreshInstanceSilently, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section>
      <header>
        <p className={`${genericStyles.title} ${roboto700.className}`}>
          Almost there!
        </p>
        <p className={genericStyles.subTitle}>We are processing your request</p>
      </header>
      <lottie-player
        id="firstLottie"
        autoplay
        mode="normal"
        loop
        src="./cat.json"
      />
      <p className={styles.footerText}>
        Relax and enjoy this cute cat gif while you wait :)
      </p>
    </section>
  );
}

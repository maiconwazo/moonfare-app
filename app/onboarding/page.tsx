import styles from './page.module.css';
import { OnboardingContainer } from '@/components/onboarding/container';
import { OnboardingManagerProvider } from '@/hooks/onboarding-manager';

export default function OnboardingPage() {
  return (
    <article className={styles.card}>
      <OnboardingManagerProvider>
        <OnboardingContainer />
      </OnboardingManagerProvider>
    </article>
  );
}

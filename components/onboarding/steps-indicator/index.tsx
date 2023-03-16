'use client';

import useOnboarding from '@/hooks/onboarding-manager';
import { LeftOutlined } from '@ant-design/icons';
import styles from './index.module.css';

export function OnboardingStepsIndicator(props: {
  currentStepStatus: string;
  currentStepOrder: number;
  totalSteps: number;
}) {
  const { currentStepStatus, currentStepOrder, totalSteps } = props;
  const { rollbackInstance, loading } = useOnboarding();

  const stepArray = [];
  for (let i = 0; i < totalSteps; i++) {
    stepArray.push(i);
  }

  return (
    <header className={styles.header}>
      {currentStepOrder > 1 &&
        !loading &&
        ['started', 'failed'].indexOf(currentStepStatus) > -1 && (
          <button onClick={rollbackInstance} className={styles.rollbackButton}>
            <LeftOutlined style={{ fontSize: '30px' }} />
            Back
          </button>
        )}
      <div className={styles.container}>
        {stepArray.map((step) => {
          const isActive = currentStepOrder > step || currentStepOrder === -1;
          return (
            <div
              key={step}
              className={`${styles.step} ${isActive && styles.active}`}
            ></div>
          );
        })}
      </div>
    </header>
  );
}

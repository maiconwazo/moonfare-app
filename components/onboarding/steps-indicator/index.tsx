import styles from './index.module.css';

export function OnboardingStepsIndicator(props: {
  currentStepOrder: number;
  totalSteps: number;
}) {
  const { currentStepOrder, totalSteps } = props;

  const stepArray = [];
  for (let i = 0; i < totalSteps; i++) {
    stepArray.push(i);
  }

  return (
    <header className={styles.header}>
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

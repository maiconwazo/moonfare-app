'use client';

import {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useState,
} from 'react';

interface OnboardingType {
  currentStep: string;
  setCurrentStep(value: string): void;
}

const OnboardingContext = createContext({} as OnboardingType);

export function OnboardingProvider(props: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState('');
  const { children } = props;

  return (
    <OnboardingContext.Provider value={{ currentStep, setCurrentStep }}>
      <Suspense>{children}</Suspense>
    </OnboardingContext.Provider>
  );
}

const useOnboarding = (): OnboardingType => {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding provider must be configured.');
  }

  return context;
};

export default useOnboarding;

'use client';

import OnboardingContainer from '@/components/onboarding/container';
import useOnboarding, { OnboardingProvider } from '@/providers/onboarding';

export default function OnboardingPage() {
  const { currentStep } = useOnboarding();

  return (
    <article>
      <OnboardingProvider>
        <h1>Onboarding Process</h1>
        <OnboardingContainer stepName={currentStep}></OnboardingContainer>
      </OnboardingProvider>
    </article>
  );
}

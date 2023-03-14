'use client';

import useOnboarding from '@/hooks/onboarding-manager';
import ConsentsStep from '../steps/consents';
import DocumentStep from '../steps/document';
import IdentificationStep from '../steps/identification';
import { WelcomeStep } from '../steps/welcome';
import 'antd/dist/reset.css';
import ResultStep from '../steps/result/indext';
import PasswordStep from '../steps/password';

export function OnboardingContainer() {
  const { currentStep } = useOnboarding();

  function renderContent(stepName: string) {
    switch (stepName) {
      case 'identification':
        return <IdentificationStep />;
      case 'document':
        return <DocumentStep />;
      case 'consents':
        return <ConsentsStep />;
      case 'password':
        return <PasswordStep />;
      case 'result':
        return <ResultStep />;
      case 'welcome':
        return <WelcomeStep />;
      default:
        return <section></section>;
    }
  }

  return renderContent(currentStep.name);
}

import useOnboarding from '@/hooks/onboarding-manager';
import InputDocumentPartial from './partials/input';
import OutputDocumentPartial from './partials/output';

export default function DocumentStep() {
  const { currentStep } = useOnboarding();

  function renderPartial() {
    switch (currentStep.status) {
      case 'started':
      case 'failed':
        return <InputDocumentPartial />;
      case 'processing':
        return <OutputDocumentPartial />;
    }
  }

  return <section>{renderPartial()}</section>;
}

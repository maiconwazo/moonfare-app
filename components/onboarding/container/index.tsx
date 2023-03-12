"use client";

import ConsentsStep from "../steps/consents";
import DocumentStep from "../steps/document";
import IdentificationStep from "../steps/identification";

interface OnboardingContainerProps {
  stepName: string;
}

export default function OnboardingContainer(props: OnboardingContainerProps) {
  const { stepName } = props;

  function renderContent() {
    switch (stepName) {
      case "identificationStep":
        return <IdentificationStep />;
      case "documentStep":
        return <DocumentStep />;
      case "consentsStep":
        return <ConsentsStep />;
      default:
        return <span>Step not found</span>;
    }
  }

  return (
    <section>
      <h2>{stepName}</h2>
      {renderContent()}
    </section>
  );
}

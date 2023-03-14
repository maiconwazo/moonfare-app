interface StepInformation {
  name: string;
  order: number;
}

export interface DataResponse {
  currentStep: StepInformation;
  isCompleted: boolean;
}

export interface ErrorResponse {
  code: number;
  details: string;
}

export interface OnboardingResponse {
  success: boolean;
  error: ErrorResponse;
  data: DataResponse;
}

export interface FlowInformationDataResponse {
  totalStepCount: number;
}

export interface FlowInformationResponse {
  success: boolean;
  error: ErrorResponse;
  data: FlowInformationDataResponse;
}

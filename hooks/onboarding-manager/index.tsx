'use client';

import {
  ErrorResponse,
  FlowInformationResponse,
  OnboardingResponse,
} from '@/app/api/onboarding/interfaces';
import { OnboardingStepsIndicator } from '@/components/onboarding/steps-indicator';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface OnboardingType {
  currentStep: StepInformation;
  stepCount: number;
  loading: boolean;
  startInstance(): void;
  refreshInstanceSilently(): void;
  executeInstance(data: any): void;
  rollbackInstance(): void;
  deleteInstance(): void;
}

interface StepInformation {
  name: string;
  order: number;
  status: string;
  extra: string;
}

const OnboardingContext = createContext({} as OnboardingType);

export function OnboardingManagerProvider(props: { children: ReactNode }) {
  const { children } = props;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepInformation>({
    name: 'welcome',
    order: 0,
    status: '',
    extra: '',
  });
  const [loading, setLoading] = useState(true);
  const [stepCount, setStepCount] = useState(0);

  function resetOnboarding() {
    setCurrentStep({
      name: 'welcome',
      order: 0,
      status: '',
      extra: '',
    });
  }

  function handleError(err: ErrorResponse) {
    switch (err.code) {
      case 10: {
        toast('Session expired, please try again', {
          hideProgressBar: true,
          autoClose: 4000,
          type: 'error',
          style: { top: '80px' },
        });
        resetOnboarding();
        break;
      }
      default:
        toast(err.details, {
          hideProgressBar: true,
          autoClose: 4000,
          type: 'error',
          style: { top: '80px' },
        });
        break;
    }
  }

  const refreshInstanceSilently = useCallback(async () => {
    try {
      await fetch('/api/onboarding/start', {
        method: 'post',
        credentials: 'include',
        cache: 'no-cache',
      })
        .then(async (res) => {
          const jsonResponse = (await res.json()) as OnboardingResponse;
          if (!jsonResponse.success) return handleError(jsonResponse.error);

          if (jsonResponse.data.isCompleted) return router.push('/onboarding');

          setCurrentStep({
            name: jsonResponse.data.currentStep.name,
            order: jsonResponse.data.currentStep.order,
            status: jsonResponse.data.currentStep.status,
            extra: jsonResponse.data.currentStep.extra,
          });
        })
        .catch((err) => {
          handleError(err);
        });
    } catch {}
  }, []);

  const getFlowInformation = useCallback(async () => {
    setLoading(true);
    try {
      await fetch('/api/onboarding/getInformation', {
        method: 'post',
        credentials: 'include',
        cache: 'no-cache',
      })
        .then(async (res) => {
          const jsonResponse = (await res.json()) as FlowInformationResponse;
          if (!jsonResponse.success) return handleError(jsonResponse.error);

          setStepCount(jsonResponse.data.totalStepCount);
        })
        .catch((err) => {
          handleError(err);
        });
    } finally {
      setLoading(false);
    }
  }, []);

  const startInstance = useCallback(async () => {
    setLoading(true);
    try {
      await fetch('/api/onboarding/start', {
        method: 'post',
        credentials: 'include',
        cache: 'no-cache',
      })
        .then(async (res) => {
          const jsonResponse = (await res.json()) as OnboardingResponse;
          if (!jsonResponse.success) return handleError(jsonResponse.error);

          if (jsonResponse.data.isCompleted) return router.push('/onboarding');

          setCurrentStep((prev) => ({
            name: jsonResponse.data.currentStep.name,
            order: jsonResponse.data.currentStep.order,
            status: jsonResponse.data.currentStep.status,
            extra: jsonResponse.data.currentStep.extra,
          }));
        })
        .catch((err) => {
          handleError(err);
        });
    } finally {
      setLoading(false);
    }
  }, []);

  const executeInstance = useCallback(async (data: any) => {
    setLoading(true);
    try {
      await fetch('/api/onboarding/execute', {
        method: 'put',
        credentials: 'include',
        cache: 'no-cache',
        body: data,
      })
        .then(async (res) => {
          const jsonResponse = (await res.json()) as OnboardingResponse;
          if (!jsonResponse.success) return handleError(jsonResponse.error);

          if (jsonResponse.data.isCompleted) {
            setCurrentStep({
              name: '',
              order: -1,
              status: '',
              extra: '',
            });

            return router.push('/');
          }

          setCurrentStep({
            name: jsonResponse.data.currentStep.name,
            order: jsonResponse.data.currentStep.order,
            status: jsonResponse.data.currentStep.status,
            extra: jsonResponse.data.currentStep.extra,
          });
        })
        .catch((err) => {
          handleError(err);
        });
    } finally {
      setLoading(false);
    }
  }, []);

  const rollbackInstance = useCallback(async () => {
    setLoading(true);
    try {
      await fetch('/api/onboarding/rollback', {
        method: 'post',
        credentials: 'include',
        cache: 'no-cache',
      })
        .then(async (res) => {
          const jsonResponse = (await res.json()) as OnboardingResponse;
          if (!jsonResponse.success) return handleError(jsonResponse.error);

          setCurrentStep({
            name: jsonResponse.data.currentStep.name,
            order: jsonResponse.data.currentStep.order,
            status: jsonResponse.data.currentStep.status,
            extra: jsonResponse.data.currentStep.extra,
          });
        })
        .catch((err) => {
          handleError(err);
        });
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteInstance = useCallback(async () => {
    setLoading(true);
    try {
      await fetch('/api/onboarding/delete', {
        method: 'delete',
        cache: 'no-cache',
        credentials: 'include',
      })
        .then(async (res) => {
          resetOnboarding();
        })
        .catch((err) => {
          handleError(err);
        });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getFlowInformation();
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        loading,
        stepCount,
        startInstance,
        executeInstance,
        refreshInstanceSilently,
        rollbackInstance,
        deleteInstance,
      }}
    >
      <ToastContainer />
      <OnboardingStepsIndicator
        currentStepStatus={currentStep.status}
        currentStepOrder={currentStep.order}
        totalSteps={stepCount}
      />
      {loading ? (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            minHeight: '500px',
          }}
        >
          <Spin
            style={{ margin: 'auto' }}
            indicator={
              <Loading3QuartersOutlined
                style={{
                  fontSize: 150,
                  color: 'var(--primary-color)',
                }}
                spin
              />
            }
          ></Spin>
        </div>
      ) : (
        children
      )}
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

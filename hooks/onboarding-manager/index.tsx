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
}

interface StepInformation {
  name: string;
  order: number;
  status: string;
}

const OnboardingContext = createContext({} as OnboardingType);

export function OnboardingManagerProvider(props: { children: ReactNode }) {
  const { children } = props;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepInformation>({
    name: 'welcome',
    order: 0,
    status: '',
  });
  const [loading, setLoading] = useState(true);
  const [stepCount, setStepCount] = useState(0);

  function resetOnboarding() {
    setCurrentStep({
      name: 'welcome',
      order: 0,
      status: '',
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
      await fetch('/api/onboarding/', {
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
      await fetch('/api/onboarding/', { method: 'get', cache: 'no-cache' })
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
      await fetch('/api/onboarding/', {
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
      await fetch('/api/onboarding/', {
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
            });

            return router.push('/');
          }

          setCurrentStep((prev) => ({
            name: jsonResponse.data.currentStep.name,
            order: jsonResponse.data.currentStep.order,
            status: jsonResponse.data.currentStep.status,
          }));
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
      await fetch('/api/onboarding/', { method: 'delete', cache: 'no-cache' })
        .then(async (res) => {
          //
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
      }}
    >
      <ToastContainer />
      <OnboardingStepsIndicator
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

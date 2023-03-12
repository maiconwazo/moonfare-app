import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import OnboardingEngine from "@/services/onboarding/onboardingEngine";

export async function POST(request: Request) {
  const formData = await request.formData();
  const cookieStore = cookies();
  const instanceId = cookieStore.get("instanceId")?.value;

  const onboardingEngine = new OnboardingEngine();
  const result = onboardingEngine.send(instanceId, formData);

  return redirect(`/onboarding/${result.nextPage}`);
}

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { OnboardingResponse } from '../interfaces';

export async function DELETE() {
  try {
    const instanceId = cookies().get('onboarding_instance_id');
    const response = await fetch(
      `${process.env.GATEWAY}/v1/api/onboarding/delete`,
      {
        method: 'delete',
        credentials: 'include',
        headers: [['Cookie', `${instanceId?.name}=${instanceId?.value}`]],
        cache: 'no-cache',
      },
    );

    const json = (await response.json()) as OnboardingResponse;
    const newCookie =
      'onboarding_instance_id=;Max-Age=86400; Path=/; HttpOnly; Secure; SameSite=None';

    return NextResponse.json(json, {
      headers: [['set-cookie', newCookie]],
    });
  } catch (err: any) {
    if (err?.response?.data) return NextResponse.json(err.response.data);

    return NextResponse.json(err);
  }
}

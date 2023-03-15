import { NextResponse } from 'next/server';
import { OnboardingResponse } from '../interfaces';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST() {
  try {
    const instanceId = cookies().get('onboarding_instance_id');
    const response = await fetch(
      `${process.env.GATEWAY}/v1/api/onboarding/rollback`,
      {
        method: 'post',
        credentials: 'include',
        headers: [['Cookie', `${instanceId?.name}=${instanceId?.value}`]],
        cache: 'no-cache',
      },
    );

    const json = (await response.json()) as OnboardingResponse;
    const instanceIdCookie = response.headers
      .get('set-cookie')
      ?.split(';')
      .find((c) => c.startsWith('onboarding_instance_id'));

    let newCookie = `${instanceIdCookie}; Max-Age=86400; Path=/; HttpOnly; Secure; SameSite=None`;

    if (json.data.isCompleted) {
      newCookie =
        'onboarding_instance_id=;Max-Age=86400; Path=/; HttpOnly; Secure; SameSite=None';
      redirect('/');
    }

    return NextResponse.json(json, {
      headers: [['set-cookie', newCookie]],
    });
  } catch (err: any) {
    if (err?.response?.data) return NextResponse.json(err.response.data);

    return NextResponse.json(err);
  }
}

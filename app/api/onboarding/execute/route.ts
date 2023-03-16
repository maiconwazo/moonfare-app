import { NextRequest, NextResponse } from 'next/server';
import { OnboardingResponse } from '../interfaces';
import { cookies } from 'next/headers';

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const instanceId = cookies().get('onboarding_instance_id');
    const response = await fetch(
      `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}/v1/api/onboarding/execute`,
      {
        method: 'put',
        credentials: 'include',
        headers: [['Cookie', `${instanceId?.name}=${instanceId?.value}`]],
        cache: 'no-cache',
        body: formData,
      },
    );

    const json = (await response.json()) as OnboardingResponse;

    if (!json.success) return NextResponse.json(json.error);

    const instanceIdCookie = response.headers
      .get('set-cookie')
      ?.split(';')
      .find((c) => c.startsWith('onboarding_instance_id'));

    let newCookie = `${instanceIdCookie}; Max-Age=86400; Path=/; HttpOnly; Secure; SameSite=None`;
    if (json.data.isCompleted) {
      newCookie =
        'onboarding_instance_id=;Max-Age=86400; Path=/; HttpOnly; Secure; SameSite=None';
    }

    return NextResponse.json(json, {
      headers: [['set-cookie', newCookie]],
    });
  } catch (err: any) {
    if (err?.response?.data) return NextResponse.json(err.response.data);

    return NextResponse.json(err);
  }
}

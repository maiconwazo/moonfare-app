import { NextRequest, NextResponse } from 'next/server';
import { FlowInformationResponse, OnboardingResponse } from './interfaces';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.GATEWAY}/v1/api/onboarding/getInformation`,
      { cache: 'no-cache' },
    );

    const data = (await response.json()) as FlowInformationResponse;
    return NextResponse.json(data);
  } catch (err: any) {
    if (err?.response?.data) return NextResponse.json(err.response.data);

    return NextResponse.json(err);
  }
}

export async function POST() {
  try {
    const instanceId = cookies().get('onboarding_instance_id');
    const response = await fetch(
      `${process.env.GATEWAY}/v1/api/onboarding/start`,
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

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const instanceId = cookies().get('onboarding_instance_id');
    const response = await fetch(
      `${process.env.GATEWAY}/v1/api/onboarding/execute`,
      {
        method: 'put',
        credentials: 'include',
        headers: [
          ['Cookie', `${instanceId?.name}=${instanceId?.value}`],
          // ['Content-Type', 'multipart/form-data'],
        ],
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

export async function DELETE() {
  try {
    const response = await fetch(
      `${process.env.GATEWAY}/v1/api/onboarding/delete`,
      {
        method: 'delete',
        credentials: 'include',
        cache: 'no-cache',
      },
    );

    const data = (await response.json()) as OnboardingResponse;
    return NextResponse.json(data, { headers: response.headers });
  } catch (err: any) {
    if (err?.response?.data) return NextResponse.json(err.response.data);

    return NextResponse.json(err);
  }
}

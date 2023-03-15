import { NextResponse } from 'next/server';
import { OnboardingResponse } from '../interfaces';

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

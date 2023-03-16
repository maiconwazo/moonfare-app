import { NextResponse } from 'next/server';
import { FlowInformationResponse } from '../interfaces';

export async function POST() {
  try {
    const response = await fetch(
      `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}/v1/api/onboarding/getInformation`,
      {
        cache: 'no-cache',
        credentials: 'include',
        method: 'get',
      },
    );

    const data = (await response.json()) as FlowInformationResponse;
    return NextResponse.json(data);
  } catch (err: any) {
    if (err?.response?.data) return NextResponse.json(err.response.data);

    return NextResponse.json(err);
  }
}

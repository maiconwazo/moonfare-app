import { NextResponse } from 'next/server';
import { FlowInformationResponse } from '../interfaces';

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

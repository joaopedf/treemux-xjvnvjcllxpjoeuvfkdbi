import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from './jwt';

export async function getAuthUser(request: NextRequest): Promise<JWTPayload | null> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  return await verifyToken(token);
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}

export async function requireAuth(
  request: NextRequest
): Promise<{ user: JWTPayload } | NextResponse> {
  const user = await getAuthUser(request);

  if (!user) {
    return unauthorizedResponse();
  }

  return { user };
}

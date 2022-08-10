import { NextRequest, NextResponse } from 'next/server';

import { redis } from './lib/redis';

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const { url, ip, geo, method } = req;
  const logData = {
    time: new Date(Date.now()).toLocaleDateString('pt-BR'),
    method,
    url,
    ip,
    geo,
  };

  await redis.lpush('api-request-log', logData);

  return response;
}

export const config = {
  matcher: '/',
};

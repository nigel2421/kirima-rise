import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Ensure NEXT_LOCALE cookie is persisted for at least 30 days
  const localeCookie = response.cookies.get('NEXT_LOCALE');
  if (localeCookie) {
    response.cookies.set({
      name: 'NEXT_LOCALE',
      value: localeCookie.value,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

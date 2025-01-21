import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (session && req.nextUrl.pathname === '/auth/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/auth/login']
};

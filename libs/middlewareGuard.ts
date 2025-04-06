import { NextRequest, NextResponse } from "next/server";

export function protectAppointmentSteps(request: NextRequest): NextResponse | void {
    const url = request.nextUrl;
    const step = url.pathname.split('/').pop();

    const protectedSteps = ['datetime', 'confirmation'];

    if (protectedSteps.includes(step || '')) {
        const cookie = request.cookies.get('selectedServices')?.value;
        const selected = cookie ? JSON.parse(cookie) : [];

        if (!Array.isArray(selected) || selected.length === 0) {
            url.pathname = '/appointments/step/services';
            const response = NextResponse.redirect(url);
            response.cookies.set('redirectReason', 'missing-services', {
                maxAge: 10,
                path: '/',
            });

            return response;
        }
    }
}
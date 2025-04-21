import { NextRequest, NextResponse } from "next/server";

export function protectAppointmentSteps(request: NextRequest): NextResponse | void {
    const url = request.nextUrl;
    const step = url.pathname.split('/').pop();

    const protectedSteps = ['datetime', 'confirmation'];

    if (protectedSteps.includes(step || '')) {
        const cookie = request.cookies.get('selectedServices')?.value;
        const selected = cookie ? JSON.parse(cookie) : [];

        if (!Array.isArray(selected) || selected.length === 0) {
            console.log(selected)
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

export function protectOwnerPages(request: NextRequest): NextResponse | void {
    const url = request.nextUrl;

    if (url.pathname.startsWith("/owner")) {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            url.pathname = "/login"
            const response = NextResponse.redirect(url);

            response.cookies.set("redirectReason", "login-required", {
                maxAge: 10,
                path: "/",
            });

            return response;
        }

        try {
            const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
            if (payload.role !== "Salon Owner") {
                url.pathname = "/unauthorized"
                return NextResponse.redirect(url);
            }
        } catch (err) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
    }
}
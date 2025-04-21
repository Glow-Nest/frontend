import { protectAppointmentSteps, protectOwnerPages } from "libs/middlewareGuard";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const guards = [protectAppointmentSteps, protectOwnerPages];

    for (const guard of guards) {
        const response = guard(request);
        if (response) return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/appointments/step/:step*',
        '/owner/:path*'
    ],
};
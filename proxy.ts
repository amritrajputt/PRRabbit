import type { NextRequest } from "next/server";
import { handleAuthProxy } from "./features/auth/utils/auth-proxy";

export async function proxy(request: NextRequest) {
    return handleAuthProxy(request)
}
// why we are doing this because we want check authenticated use only on these routes else are public routes.
export const config = {
    matcher: ["/sign-in", "/dashboard", "/dashboard/:path*"]
}
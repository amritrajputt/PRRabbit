import { auth } from "@/lib/auth";
import { getSafeCallbackPath, SIGN_IN_PATH } from "./index"
import { NextRequest, NextResponse } from "next/server";
import { url } from "inspector";








function redirectToSignIn(request: NextRequest, pathname: string) {
    const signInUrl = new URL(SIGN_IN_PATH, request.url);
    signInUrl.searchParams.set("callbackUrl", `${pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(signInUrl)
}







function getPostAuthRedirectUrl(request: NextRequest) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl")
    return getSafeCallbackPath(callbackUrl);
}




export async function handleAuthProxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname === "/") return NextResponse.next();

    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (pathname === SIGN_IN_PATH) {
        if (session) {
            const redirectPath = getPostAuthRedirectUrl(request);
            return NextResponse.redirect(new URL(redirectPath, request.url));
        }
        else return NextResponse.next();
    }
    if (!session){
         return redirectToSignIn(request, pathname);
    }
    return NextResponse.next();
}
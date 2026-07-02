import { auth } from "@/lib/auth";
import { getSafeCallbackPath, SIGN_IN_PATH } from "./index"
import { NextRequest, NextResponse } from "next/server";
import { url } from "inspector";

// it is incoming middleware request it is protected path the user tries to reach
// if the user is not authenticated then we redirect to signin page
// we store the url the user was trying to reach in the callbackUrl query parameter
// so that after the login we can redirect the user to the path it was trying to reach
// if user tries to reach signin page we save it in callbackUrl and then redirect to signin page
// but after the login we need to redirect the user to the path it was trying to reach

function redirectToSignIn(request: NextRequest, pathname: string) {
    const signInUrl = new URL(SIGN_IN_PATH, request.url);
    signInUrl.searchParams.set("callbackUrl", `${pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(signInUrl)
}

// after the login we need to redirect the user to the path it was trying to reach, 
// but we need to make sure that the path is not signin page
// so we create a function getSafeCallbackPath which will return the path 
// that is not signin page
// if the user was trying to reach signin page then we redirect to dashboard

function getPostAuthRedirectUrl(request: NextRequest) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl")
    return getSafeCallbackPath(callbackUrl);
}

//middleware handler 
// "/" is always public
// "/sign-in": logged in users redirect away;guest request 
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
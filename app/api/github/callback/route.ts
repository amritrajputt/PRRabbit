import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { saveInstallation} from "@/features/github/server/installation";
import {getServerSession} from "@/features/auth/actions";
import {redirect} from "next/navigation";



function buildSignInCallBackUrl(installationId:string){
    
    if(installationId){
       return `/api/github/callback?installation_id=${installationId}`
    }
    return DASHBOARD_ROUTES.github
}
export async function GET(req:Request) {
    const url = new URL(req.url);
    const installationId = url.searchParams.get("installation_id");
    const session = await getServerSession();

    if(!session){
        const callbackUrl = buildSignInCallBackUrl(installationId)
        redirect(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`)
    }

    
    if(installationId) await saveInstallation(session.user.id, Number(installationId))
    redirect(DASHBOARD_ROUTES.github)
}
"use server"

import { prisma } from "@/lib/db";
import { getServerSession } from "../../auth/actions";
import { redirect } from "next/navigation";
import { DASHBOARD_ROUTES } from "../../dashboard/lib/routes";
import { triggerRepoSync } from "../server/repo-sync";
import {getUserInstallationId} from "../../github/server/installation"

export async function syncRepoCodebase(repoFullName: string,branch:string){
    const session = await getServerSession()
    if (!session){
        redirect("/sign-in");
    }
    const installationId = await getUserInstallationId(session.user.id)

    if (!installationId){
        redirect(DASHBOARD_ROUTES.github)
    }
   await triggerRepoSync(installationId,repoFullName,branch)
}
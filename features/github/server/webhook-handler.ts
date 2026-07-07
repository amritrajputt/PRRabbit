import { savePullRequest } from "@/features/reviews/server/save-pull-request";
import { getGithubApp } from "../utils/github-app"
import { getUserIdByInstallationId } from "./installation";
import { canUserReview } from "@/features/billing/server/usage";
import { prisma } from "@/lib/db";
import { inngest } from "@/features/inngest/client";

const REVIEWABLE_ACTIONS =["opened", "reopened", "synchronize"]
export type pullRequestWebhookPayload = {
    action: string;
    installation: {
        id: number;
    };
    repository:{
        full_name: string;
    }
    pull_request: {
        number: number;
        title: string;
        user: {
            login: string | null;
        };
        head: {
            sha: string;
        };
        base: {
            ref: string;
        };
    };
};


async function isSignatureValid(payload: string, signature: string) {
    if (!signature) return false
    const app = getGithubApp();
    return app.webhooks.verify(signature, payload);

}
export async function handleGithubWebhook(request: Request) {
    const payload = await request.text();
    const signature = request.headers.get("X-Hub-Signature-256") as string;
    const eventName = request.headers.get("X-Github-Event") as string;

    const isValid = await isSignatureValid(payload, signature)
    if (!isValid) {
        return Response.json({ error: "Invalid webhook signature" }, { status: 400 })
    }
    if (eventName !== "pull_request") {
        return Response.json({ received: true })
    }
    const event = JSON.parse(payload) as pullRequestWebhookPayload
    if (!REVIEWABLE_ACTIONS.includes(event.action)) {
        return Response.json({ received: true })
    }
const pullRequest = await savePullRequest(event)
const userId = await getUserIdByInstallationId(event.installation.id);
if(userId){
    const allowed = await canUserReview(userId)
    if(!allowed){
        await prisma.pullRequest.update({
            where:{
                id: pullRequest.id
            },
            data:{
                status:"rate_limited"
            }
        })
        return Response.json({received:true,rateLimited:true})
    }
}
await inngest.send({
    name:"github/pr.received",
    data: {
        pullRequestId:pullRequest.id
    }
})

//todo:trigger review jon
return Response.json({received:true})

}
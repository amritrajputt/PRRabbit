import { prisma } from "@/lib/db"
import { pullRequestWebhookPayload } from "@/features/github/server/webhook-handler";

function getAuthorLogin(user:{login:string|null}):string|null{
    if(!user) return null;
    return user.login;
}

export async function savePullRequest(payload: pullRequestWebhookPayload) {
    const prNumber = payload.pull_request.number;
    const repoFullName = payload.repository.full_name;
    const pullRequest = await prisma.pullRequest.upsert({
        where: {
            repoFullName_prNumber: {
                repoFullName: repoFullName,
                prNumber: prNumber,
            },
        },
        create: {
            installationId: payload.installation.id,
            repoFullName: repoFullName,
            prNumber: prNumber,
            title: payload.pull_request.title,
            authorLogin: getAuthorLogin(payload.pull_request.user),
            baseBranch: payload.pull_request.base.ref,
            headSha: payload.pull_request.head.sha,
            status: "pending",

        },
        update: {
            title: payload.pull_request.title,
            headSha: payload.pull_request.head.sha,
            status: "pending"
        },
    });
    return pullRequest;
}
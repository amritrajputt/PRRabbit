import { inngest } from "@/features/inngest/client";
import { prisma } from "@/lib/db";
import {
    buildRepoNamespace,
    chunkRepoFiles,
    deleteRepoNamespace,
    getRepoFiles,
    saveRepoChunks,
} from "@/features/repo-sync/server/repo-sync";


export const syncRepoCodebaseFunction = inngest.createFunction({
    id: "sync-repo-codebase",
    triggers: {
        event: "repo/sync.requested",
    },
    onFailure: async ({ event, error }) => {
        await prisma.repoSync.update({
            where: {
                id: event.data.event.data.repoSyncId
            },
            data: {
                status: "FAILED"
            }

        })
    },
}, async ({ event, step }) => {
    const { repoSyncId } = event.data;

    // mark as running
    const repoSync = await step.run("mark-syncing", async () => {
        return prisma.repoSync.update({
            where: {
                id: repoSyncId
            },
            data: {
                status: "syncing"
            }
        })

    })
    const chunks = await step.run("fetch-add-chunk-code", async () => {
        const files = await getRepoFiles(
            repoSync.installationId,
            repoSync.repoFullName,
            repoSync.branch
        )

        // chunk the files
        return chunkRepoFiles(files)
    })
    const namespace = buildRepoNamespace(repoSync.repoFullName)
    if (repoSync.syncedAt) {
        await step.run("delete-old-vectors", async () => {
            await deleteRepoNamespace(namespace)
        })
    }
    await step.run("save-vectors-to-pinecone", async () => {
        return saveRepoChunks(namespace, chunks)
    })
    await step.run("mark-synced", async () => {
        return prisma.repoSync.update({
            where: {
                id: repoSyncId
            },
            data: {
                status: "synced",
                syncedAt: new Date()
            }
        })
    })
    return {
        repoSyncId, status: "synced", chunkCount: chunks.length
    }
})

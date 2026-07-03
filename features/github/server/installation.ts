import { getServerSession } from "@/features/auth/actions";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import type { GithubInstallationStatus } from "@/features/dashboard/lib/types";
import { getGithubApp } from "@/features/github/utils/github-app";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

function getAccountLogin(account: any): string | null {
    if (!account) {
        return null;
    }
    if (typeof account.login === "string" && account.login) {
        return account.login;
    }
    if (typeof account.slug === "string" && account.slug) {
        return account.slug;
    }
    return null;
}

function buildDisconnectedStatus(): GithubInstallationStatus {
    return {
        connected: false,
        accountLogin: null,
        installedAt: null,
    }
}

export async function getInstallationStatus(userId: string) {
    const installation = await prisma.githubInstallation.findUnique({
        where: { userId },
    });
    if (!installation) {
        return buildDisconnectedStatus();
    }
    return {
        connected: true,
        accountLogin: installation.accountLogin,
        installedAt: installation.createdAt.toISOString(),
    }
}

export async function saveInstallation(userId: string, installationId: number) {
    const app = getGithubApp();
    const { data } = await app.octokit.request("GET /app/installations/{installation_id}", {
        installation_id: installationId,
    });
    const accountLogin = getAccountLogin(data.account);
    if (!accountLogin) {
        throw new Error("Could not determine GitHub account login.");
    }
    const now = new Date();
    await prisma.githubInstallation.upsert({
        where: { userId },
        update: {
            installationId: Number(installationId),
            accountLogin: accountLogin,
            accountType: data.target_type ?? null,
            updatedAt: now,
        },
        create: {
            userId: userId,
            installationId: Number(installationId),
            accountLogin: accountLogin,
            accountType: data.target_type ?? null,
            createdAt: now,
            updatedAt: now,
        },
    });
    return {
        connected: true,
        accountLogin: accountLogin,
        installedAt: now.toISOString(),
    };
}

export async function deleteInstallation(userId: string) {
    await prisma.githubInstallation.delete({
        where: { userId },
    });

}
export async function getUserIdByInstallationId(installationId: number) {
    const installation = await prisma.githubInstallation.findFirst({
        where: { installationId },
        select: { userId: true }
    });
    if (!installation) {
        return null
    }
    return installation.userId;
}

export async function getUserInstallationId(userId: string) {
    const installation = await prisma.githubInstallation.findUnique({
        where: { userId },
        select: { installationId: true }
    });
    if (!installation) {
        return null
    }
    return installation.installationId;
}

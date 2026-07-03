import {App} from "octokit";

let githubApp: App | null = null;


export function getGithubApp(){
    if (!githubApp){
        const APP_ID = process.env.GITHUB_APP_ID;
        const PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, "\n");
        if(!APP_ID || !PRIVATE_KEY){
            throw new Error("MISSING_GITHUB_APP_CONFIG");
        }
        githubApp = new App({
            appId: Number(APP_ID),
            privateKey: PRIVATE_KEY,
            webhooks: {
                secret: process.env.GITHUB_WEBHOOK_SECRET!,
            }
        });
    }
    return githubApp;
}

export function getGithubInstallUrl(userId:string){
    const url = new URL (`https://github.com/apps/prrabbit/installations/new`)
    url.searchParams.set("state", userId);
    return url.toString();
}
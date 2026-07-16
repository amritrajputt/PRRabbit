import * as dotenv from "dotenv";
dotenv.config();

import * as crypto from "crypto";

async function test() {
  const { handleGithubWebhook } = await import("../features/github/server/webhook-handler");

  const mockPayload = {
    action: "opened",
    repository: {
      full_name: "amritrajputt/agentic-ai",
    },
    pull_request: {
      number: 1,
      title: "Add test.py example",
      user: {
        login: "amritrajputt",
      },
      head: {
        sha: "47ef77e",
      },
      base: {
        ref: "main",
      },
    },
    installation: {
      id: 144221534,
    },
  };

  const payloadString = JSON.stringify(mockPayload);
  
  
  const hmac = crypto.createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET || "");
  const signature = "sha256=" + hmac.update(payloadString).digest("hex");

  
  const request = new Request("http://localhost:3000/api/webhooks/github", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-github-event": "pull_request",
      "x-hub-signature-256": signature,
    },
    body: payloadString,
  });

  try {
    console.log("Invoking handleGithubWebhook...");
    const response = await handleGithubWebhook(request);
    console.log("Webhook Response status:", response.status);
    const body = await response.json();
    console.log("Webhook Response body:", body);
  } catch (error: any) {
    console.error("Webhook handler threw an error:");
    console.error(error.stack || error);
  }
}

test();

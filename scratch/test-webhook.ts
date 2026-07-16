import * as dotenv from "dotenv";
dotenv.config();

async function test() {
  const { savePullRequest } = await import("../features/reviews/server/save-pull-request");

  const mockPayload: any = {
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

  try {
    console.log("Saving pull request...");
    const pr = await savePullRequest(mockPayload);
    console.log("Saved PR successfully:", pr);
  } catch (error) {
    console.error("Database save failed with error:", error);
  }
}

test();

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const { prisma } = await import("../lib/db");
  
  const syncs = await prisma.repoSync.findMany();
  console.log("Current RepoSync records in DB:");
  console.log(JSON.stringify(syncs, null, 2));

  const prs = await prisma.pullRequest.findMany();
  console.log("\nCurrent PullRequest records in DB:");
  console.log(JSON.stringify(prs, null, 2));
}

main()
  .catch(console.error);

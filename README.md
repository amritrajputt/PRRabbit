# PRRabbit 🐰

An AI-powered, self-hosted GitHub Pull Request Reviewer built using **Next.js**, **Pinecone Vector Database**, **OpenRouter**, **Prisma**, **Better Auth**, and **Inngest**. 

PRRabbit automates code reviews by listening to GitHub pull request webhooks, fetching the changes, retrieving relevant codebase context using **Retrieval-Augmented Generation (RAG)**, and posting descriptive, constructive feedback comments directly back to the pull request on GitHub.

---

## 🚀 Key Features

*   **🤖 AI-Powered PR Reviews:** Automatically analyzes unified diffs of incoming pull requests. Uses custom prompts tailored to correctness, security, performance, reliability, readability, and maintainability.
*   **🔍 Codebase Context (RAG):** Synchronizes full repositories to a Pinecone vector store. When a PR is reviewed, relevant context from the wider codebase is retrieved to provide accurate, context-aware comments.
*   **⚡ Event-Driven Architecture:** Utilizes **Inngest** to queue, wait, retry, and manage background workflows for codebase indexing and pull request processing asynchronously.
*   **🛡️ Secure Authentication:** Secured using **Better Auth** with GitHub OAuth integration.
*   **💳 Billing & Usage Management:** Integrated with **Razorpay** to support Free vs Pro tiers. Free users are limited to 5 reviews per month, while Pro users have unlimited reviews.
*   **📊 Interactive Dashboard:** A premium, modern dashboard to connect/disconnect GitHub accounts, view accessible repositories, trigger manual codebase syncing, and manage billing profiles and subscriptions.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Core Framework** | [Next.js 16](https://nextjs.org/) (App Router, React 19) |
| **Database ORM** | [Prisma](https://www.prisma.io/) (PostgreSQL client) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) (GitHub Social Login) |
| **Workflows & Background Jobs** | [Inngest](https://www.inngest.com/) |
| **AI Orchestration** | [Vercel AI SDK](https://sdk.vercel.ai/docs) |
| **LLM Provider** | [OpenRouter](https://openrouter.ai/) (configured for `openrouter/free` models) |
| **Vector Indexing** | [Pinecone Database](https://www.pinecone.io/) |
| **Payment Gateway** | [Razorpay](https://razorpay.com/) (Subscriptions) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), `@base-ui/react`, `@phosphor-icons/react` |

---

## 📂 Repository Structure

The project follows a feature-driven folder structure located inside `/features`:

```
├── app/
│   ├── (auth)/                # Sign-in and authentication UI routes
│   ├── (protected)/dashboard/ # Protected dashboard (GitHub, repos, settings)
│   ├── api/
│   │   ├── auth/              # Better Auth endpoints
│   │   ├── github/            # Callback, repository query, and webhook handlers
│   │   ├── inngest/           # Inngest background event handlers/routes
│   │   └── razorpay/          # Razorpay payment gateway webhooks
│   ├── globals.css            # Tailwind custom global stylesheets
│   ├── layout.tsx             # Root template layout
│   └── page.tsx               # Landing page
├── components/
│   ├── providers/             # React-Query and Theme providers
│   └── ui/                    # Base UI and layout components
├── features/                  # Core feature-based modules
│   ├── ai/                    # OpenRouter AI SDK instance initialization
│   ├── auth/                  # Better Auth actions, wrappers, and User Menu components
│   ├── billing/               # Razorpay API integrations, subscriptions, and usage limits
│   ├── dashboard/             # Dashboard header, sidebar, navigation, and settings views
│   ├── github/                # GitHub client, installations, repo queries, and webhooks
│   ├── inngest/               # Background task scheduler client
│   ├── pinecone/              # Pinecone index client initializer
│   ├── repo-sync/             # Codebase vectorization, chunking, and sync state functions
│   ├── reviews/               # PR file parsing, Vector search, review prompts, and commenting
│   └── settings/              # Settings retrieval functions
├── lib/
│   ├── generated/prisma/      # Prisma Client build outputs
│   ├── auth.ts                # Better Auth server configuration
│   ├── billing.ts             # Subscription server actions
│   ├── db.ts                  # Shared Prisma client database instance
│   └── utils.ts               # Helper utilities (clsx, tailwind-merge)
└── prisma/
    └── schema.prisma          # PostgreSQL database schema definition
```

---

## 🗄️ Database Models

PRRabbit uses PostgreSQL with the following core entities defined in [schema.prisma](file:///d:/prrabbit/prisma/schema.prisma):

*   **`User`**: Manages auth profiles, active billing plans (`free` or `pro`), Razorpay subscription IDs, and renew/expiry timestamps.
*   **`Session` & `Account` & `Verification`**: Stores social login sessions and credentials handled by Better Auth.
*   **`GithubInstallation`**: Links a registered user to their installed GitHub App installation ID.
*   **`PullRequest`**: Tracks reviewed PR metadata, installation details, base branch, head SHA, generated AI review comment, status (`processing`, `reviewed`, `rate_limited`), and timestamps.
*   **`RepoSync`**: Keeps track of full repository synchronization status (`pending`, `syncing`, `synced`, `failed`), branch, total chunks indexed, and timestamps.

---

## ⚙️ Environment Variables

Copy `.env.example` (or create a `.env` file) in your root directory and supply the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/prrabbit"

# Better Auth Configuration
BETTER_AUTH_SECRET="your_better_auth_secret_here"
BETTER_AUTH_URL="http://localhost:3000" # Base URL of your app

# GitHub OAuth App credentials (used for user authentication)
GITHUB_CLIENT_ID="your_github_oauth_client_id"
GITHUB_CLIENT_SECRET="your_github_oauth_client_secret"

# GitHub App Configuration (used for PR Webhooks and Repository sync)
GITHUB_APP_ID="your_github_app_id"
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET="your_github_webhook_secret"

# Pinecone Vector Database
PINECONE_API_KEY="your_pinecone_api_key"
PINECONE_INDEX="your_pinecone_index_name"

# AI / LLM Configuration
OPENROUTER_API_KEY="your_openrouter_api_key"

# Razorpay Subscriptions
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_public_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret_key"
RAZORPAY_PLAN_ID="plan_xxxxxxxxx" # Razorpay Plan ID for subscriptions
RAZORPAY_WEBHOOK_SECRET="your_razorpay_webhook_secret"

# Inngest Dev Server (Optional for local development)
INNGEST_EVENT_KEY="your_inngest_event_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"
```

---

## 🛠️ Local Development Setup

Follow these steps to run the application locally:

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Generate Prisma Clients and Run Migrations
Ensure you have a running PostgreSQL database configured in `DATABASE_URL`.
```bash
npx prisma generate
npx prisma db push
```

### 3. Start the Local Server
```bash
npm run dev
# or
pnpm dev
```
The application will start at `http://localhost:3000`.

### 4. Run the Inngest Dev Server
Inngest is used to orchestrate codebase syncing and PR reviewing workflows. Run the local dev server:
```bash
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```
This starts the local Inngest Dashboard (usually at `http://127.0.0.1:8288`), which listens to the Next.js API endpoint.

### 5. Tunnel for Webhooks (e.g., ngrok)
GitHub and Razorpay need to send webhook requests to your local development machine. Use a tunneling tool like **ngrok** to expose your local environment:
```bash
ngrok http 3000
```
Add the generated tunnel domain (e.g. `your-domain.ngrok-free.dev`) as an allowed origin inside `next.config.mjs`:
```javascript
allowedDevOrigins: ["your-domain.ngrok-free.dev"]
```

---

## ⚓ Webhook Configuration

### A. GitHub App Webhooks
Set the **Webhook URL** in your GitHub App settings to:
`https://<your-tunnel-domain>/api/github/webhook`

Ensure the App has the following permissions:
- **Pull Requests**: Read & Write (triggers `pull_request` events and allows writing comments)
- **Repository Contents**: Read (allows reading files for codebase sync)
- **Metadata**: Read (default dependency)

Select the following events:
- **Pull request**

### B. Razorpay Webhooks
Set the **Webhook URL** in your Razorpay Dashboard settings to:
`https://<your-tunnel-domain>/api/razorpay/webhook`

Select the following active events:
- `subscription.activated`
- `subscription.charged`
- `subscription.cancelled`
- `subscription.halted`
- `subscription.completed`

---

## 📝 Code Review Flow

1. A developer opens or syncs a **Pull Request** on an installation-enabled repository.
2. GitHub sends a webhook POST request to `/api/github/webhook`.
3. The event triggers an Inngest background process: `github/pr.received` / `review-pull-request`.
4. The file changes (diffs) are chunked and temporary vector embeddings are stored in Pinecone under a unique PR namespace.
5. If the repository was previously synced (`RepoSync`), the workflow performs a vector context lookup on the full codebase namespace.
6. A review prompt containing the **diff chunks**, **PR details**, and **codebase context** is built.
7. Vercel AI SDK requests the review output from **OpenRouter**.
8. The reviewer posts a detailed review comment directly to the PR on GitHub, and marks the record status as `reviewed`.

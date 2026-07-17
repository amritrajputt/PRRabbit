import Image from "next/image";
import Link from "next/link";
import {
  FolderGit2,
  GitPullRequest,
  Sparkles,
  ArrowRight,
  Check,
  Zap,
  MessageSquare,
  Lock,
  Shield,
  Activity,
  Code,
  Terminal,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon } from "@/features/dashboard/components/icons/github-icon";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans overflow-x-hidden selection:bg-accent-green/20 selection:text-accent-green">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.08),transparent_60%)] pointer-events-none -z-10" />
      <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden bg-transparent transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo2.svg"
                  alt="PRRabbit Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </span>
              <span className="font-heading font-semibold text-text-primary tracking-tight transition-colors duration-200 group-hover:text-accent-green">
                PRRabbit
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-5">
              <Link href="#features" className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/sign-in" />}
              variant="ghost"
              className="h-8 px-3 border border-border-subtle text-text-primary bg-transparent hover:bg-bg-surface hover:text-text-primary"
            >
              Login
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/sign-in" />}
              className="h-8 px-3 bg-accent-green hover:bg-accent-green-hover text-black font-semibold border-none shadow-[0_0_15px_rgba(34,197,94,0.15)] transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.25)]"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </header>
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 text-center md:pt-28 md:pb-20">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-green/20 bg-badge-approved-bg px-3 py-1 text-[11px] font-medium text-badge-approved-text tracking-wide uppercase mb-6 animate-fade-in">
          <Sparkles className="size-3" />
          AI-Powered Pull Request Reviews
        </div>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-[1.1] mb-6">
          Merge Confidently.
          <span className="block text-accent-green">Ship Fearlessly.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm md:text-base text-text-secondary leading-relaxed mb-8">
          PRRabbit reviews every pull request with full repository context, flags bugs and security issues before they ship, and leaves inline comments your team will actually read.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <Button
            nativeButton={false}
            render={<Link href="/sign-in" />}
            className="h-10 px-5 text-xs bg-accent-green hover:bg-accent-green-hover text-black font-bold border-none rounded-md shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.35)] transition-all scale-100 hover:scale-[1.02] active:scale-95"
          >
            Start Free Trial
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/sign-in" />}
            variant="ghost"
            className="h-10 px-5 text-xs border border-border-subtle text-text-primary bg-transparent hover:bg-bg-surface-hover rounded-md"
          >
            Login
          </Button>
        </div>
        <p className="text-[11px] text-text-tertiary">
          Free for open source <span className="mx-1.5">·</span> No credit card required <span className="mx-1.5">·</span> Setup in under 2 minutes
        </p>
        <div className="mt-16 md:mt-24 mx-auto max-w-5xl">
          <p className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-6">
            Directly Powered by our Developer Platform
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
            <Card className="bg-bg-surface border-border-subtle rounded-xl hover:border-accent-blue/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  Repositories
                </CardTitle>
                <FolderGit2 className="size-4 text-accent-blue" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tracking-tight text-accent-blue">
                  12
                </p>
                <p className="text-[11px] text-text-secondary">
                  connected across your org
                </p>
              </CardContent>
            </Card>
            <Card className="bg-bg-surface border-border-subtle rounded-xl hover:border-text-primary/10 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  Reviews this month
                </CardTitle>
                <GitPullRequest className="size-4 text-text-tertiary" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tracking-tight text-text-primary">
                  148
                </p>
                <p className="text-[11px] text-text-secondary">
                  Unlimited on Pro
                </p>
              </CardContent>
            </Card>
            <Card className="bg-bg-surface border-accent-green/25 rounded-xl hover:border-accent-green/45 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  GitHub App
                </CardTitle>
                <GithubIcon className="size-4 text-accent-green" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tracking-tight text-accent-green">
                  Connected
                </p>
                <p className="text-[11px] text-text-secondary">
                  One-click install
                </p>
              </CardContent>
            </Card>
            <Card className="bg-bg-surface border-accent-green/25 rounded-xl hover:border-accent-green/45 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  Current plan
                </CardTitle>
                <Sparkles className="size-4 text-accent-green" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tracking-tight text-accent-green">
                  Pro
                </p>
                <p className="text-[11px] text-text-secondary">
                  Free / Pro / Enterprise
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section id="features" className="border-t border-border-subtle bg-bg-primary py-20 md:py-28 relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-accent-blue/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-72 h-72 bg-accent-green/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-accent-green font-bold mb-3">
              Built for speed and precision
            </h2>
            <p className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Code reviews that don't slow you down
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            
            <Card className="bg-bg-surface border-border-subtle rounded-xl hover:border-border-subtle/80 hover:bg-bg-surface-hover transition-all duration-300">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue shrink-0">
                  <Code className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-text-primary mb-1">
                    Context-Aware Reviews
                  </CardTitle>
                  <CardDescription className="text-text-secondary text-xs leading-relaxed">
                    PRRabbit does RAG (Retrieval-Augmented Generation) over your entire codebase, not just the code diff. It understands how your new code fits together with existing systems, components, and design libraries.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            
            <Card className="bg-bg-surface border-border-subtle rounded-xl hover:border-border-subtle/80 hover:bg-bg-surface-hover transition-all duration-300">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent-green/10 text-accent-green shrink-0">
                  <Zap className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-text-primary mb-1">
                    Async, Not In-the-Way
                  </CardTitle>
                  <CardDescription className="text-text-secondary text-xs leading-relaxed">
                    Event-driven background jobs pick up pull requests instantly. Reviews land inline on your PR inside GitHub within 2 minutes without blocking local CI resources or manual workflows.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            
            <Card className="bg-bg-surface border-border-subtle rounded-xl hover:border-border-subtle/80 hover:bg-bg-surface-hover transition-all duration-300">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-text-primary mb-1">
                    Inline, Actionable Comments
                  </CardTitle>
                  <CardDescription className="text-text-secondary text-xs leading-relaxed">
                    Structured feedback is mapped directly to changed lines using the native GitHub Reviews API. You get concrete code fixes and line comments rather than a wall of generic summary text.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            
            <Card className="bg-bg-surface border-border-subtle rounded-xl hover:border-border-subtle/80 hover:bg-bg-surface-hover transition-all duration-300">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <Lock className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-text-primary mb-1">
                    Your Code Stays Yours
                  </CardTitle>
                  <CardDescription className="text-text-secondary text-xs leading-relaxed">
                    We request strictly scoped GitHub App permissions. Code is accessed on-demand for analysis and never stored or used to train public LLMs. Perfect for security-minded teams.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      
      <section id="how-it-works" className="border-t border-border-subtle bg-bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-accent-green font-bold mb-3">
              Frictionless setup
            </h2>
            <p className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Get reviews in 3 simple steps
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl">
            
            <div className="absolute top-10 left-[16.66%] right-[16.66%] h-0.5 bg-border-subtle hidden md:block" />

            <div className="grid gap-12 md:grid-cols-3 relative">
              
              <div className="text-center flex flex-col items-center group">
                <div className="flex size-20 items-center justify-center rounded-full bg-accent-green text-black font-heading text-2xl font-bold mb-6 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.15)] group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                  1
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2">Connect</h3>
                <p className="text-text-secondary text-xs leading-relaxed max-w-xs">
                  Install the PRRabbit GitHub App on your selected organizations or repositories in one click.
                </p>
              </div>

              
              <div className="text-center flex flex-col items-center group">
                <div className="flex size-20 items-center justify-center rounded-full bg-accent-green text-black font-heading text-2xl font-bold mb-6 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.15)] group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                  2
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2">Push</h3>
                <p className="text-text-secondary text-xs leading-relaxed max-w-xs">
                  Push your code changes and open a pull request as you normally would in your development cycle.
                </p>
              </div>

              
              <div className="text-center flex flex-col items-center group">
                <div className="flex size-20 items-center justify-center rounded-full bg-accent-green text-black font-heading text-2xl font-bold mb-6 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.15)] group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                  3
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2">Review</h3>
                <p className="text-text-secondary text-xs leading-relaxed max-w-xs">
                  PRRabbit analyzes details, compares context, and outputs comments directly inside GitHub within 2 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="border-t border-border-subtle bg-bg-primary py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest text-accent-green font-bold mb-3">
              Live Feed
            </h2>
            <p className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              See what PRRabbit is catching
            </p>
          </div>

          <Card className="bg-bg-surface border-border-subtle rounded-xl overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-border-subtle/80 bg-bg-surface-hover/50 py-4 px-6 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-text-tertiary" />
                <span className="text-xs font-mono font-medium text-text-secondary">active-reviews-feed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                </span>
                <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-semibold">Live</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border-subtle">
                
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 transition-colors hover:bg-bg-surface-hover/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-text-primary">acme-corp/payment-gateway</span>
                      <span className="text-[11px] font-mono text-text-tertiary">#244</span>
                    </div>
                    <p className="text-xs text-text-secondary">Optimized pg-client connection pool size and added logging handles</p>
                    <p className="text-[10px] text-text-tertiary">Reviewed 2 minutes ago</p>
                  </div>
                  <span className="inline-flex items-center rounded-none border px-2.5 py-0.5 text-[10px] font-bold uppercase border-green-500/40 bg-green-500/15 text-accent-green">
                    Approved
                  </span>
                </div>

                
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 transition-colors hover:bg-bg-surface-hover/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-text-primary">globex-io/auth-service</span>
                      <span className="text-[11px] font-mono text-text-tertiary">#189</span>
                    </div>
                    <p className="text-xs text-text-secondary">Refactored JWT verification logic to prevent token timing attacks</p>
                    <p className="text-[10px] text-text-tertiary">Reviewed 15 minutes ago</p>
                  </div>
                  <span className="inline-flex items-center rounded-none border px-2.5 py-0.5 text-[10px] font-bold uppercase border-amber-500/40 bg-amber-500/15 text-amber-400">
                    Changes requested
                  </span>
                </div>

                
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 transition-colors hover:bg-bg-surface-hover/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-text-primary">hooli-inc/mobile-client</span>
                      <span className="text-[11px] font-mono text-text-tertiary">#91</span>
                    </div>
                    <p className="text-xs text-text-secondary">Added caching handles on catalog list fetches to reduce loading states</p>
                    <p className="text-[10px] text-text-tertiary">Reviewed 1 hour ago</p>
                  </div>
                  <span className="inline-flex items-center rounded-none border px-2.5 py-0.5 text-[10px] font-bold uppercase border-green-500/40 bg-green-500/15 text-accent-green">
                    Approved
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      
      <section id="pricing" className="border-t border-border-subtle bg-bg-surface py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-accent-green font-bold mb-3">
              Simple, transparent pricing
            </h2>
            <p className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Plans that scale with your team
            </p>
          </div>

          <div className="grid gap-8 max-w-3xl mx-auto md:grid-cols-2 items-stretch">
            
            <Card className="bg-bg-primary border-border-subtle rounded-xl flex flex-col justify-between p-6">
              <div>
                <h3 className="text-base font-bold text-text-primary mb-1">Free Plan</h3>
                <p className="text-xs text-text-secondary mb-4">Great for open source and small personal projects.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-text-primary">₹0</span>
                  <span className="text-xs text-text-tertiary">/ month</span>
                </div>
                <ul className="space-y-3 mb-8 text-xs text-text-secondary">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-accent-green shrink-0" />
                    5 AI reviews / month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-accent-green shrink-0" />
                    Public repositories only
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-accent-green shrink-0" />
                    Standard review speed (3-5 mins)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-accent-green shrink-0" />
                    Community support
                  </li>
                </ul>
              </div>
              <Button
                nativeButton={false}
                render={<Link href="/sign-in" />}
                variant="ghost"
                className="w-full h-9 text-xs border border-border-subtle hover:bg-bg-surface-hover rounded-md text-text-primary"
              >
                Get Started
              </Button>
            </Card>

            
            <Card className="bg-bg-primary border-accent-green rounded-xl flex flex-col justify-between p-6 relative shadow-[0_0_30px_rgba(34,197,94,0.05)]">
              <div className="absolute -top-3 right-6 rounded-full bg-accent-green text-black font-semibold text-[9px] uppercase tracking-wider px-2.5 py-0.5">
                Popular
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-1">Pro Plan</h3>
                <p className="text-xs text-text-secondary mb-4">Perfect for startup teams and growing businesses.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-text-primary">₹599</span>
                  <span className="text-xs text-text-tertiary">/ month</span>
                </div>
                <ul className="space-y-3 mb-8 text-xs text-text-secondary">
                  <li className="flex items-center gap-2 font-medium text-text-primary">
                    <Check className="size-4 text-accent-green shrink-0" />
                    Unlimited reviews
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-accent-green shrink-0" />
                    Public & Private repositories
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-accent-green shrink-0" />
                    Priority review queue (&lt; 2 mins)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-accent-green shrink-0" />
                    Full codebase context (RAG)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-accent-green shrink-0" />
                    Email & Discord priority support
                  </li>
                </ul>
              </div>
              <Button
                nativeButton={false}
                render={<Link href="/sign-in" />}
                className="w-full h-9 text-xs bg-accent-green hover:bg-accent-green-hover text-black font-bold border-none rounded-md"
              >
                Start 14-Day Free Trial
              </Button>
            </Card>
          </div>
        </div>
      </section>

      
      <section className="border-t border-border-subtle bg-bg-surface py-20 relative overflow-hidden">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05),transparent_60%)] pointer-events-none -z-10" />

        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
            Ready to merge with confidence?
          </h2>
          <p className="mx-auto max-w-xl text-xs text-text-secondary mb-8">
            Install the PRRabbit GitHub App in under 2 minutes. Start getting fast, high-quality, context-aware reviews on your pull requests today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              nativeButton={false}
              render={<Link href="/sign-in" />}
              className="h-10 px-5 text-xs bg-accent-green hover:bg-accent-green-hover text-black font-bold border-none rounded-md"
            >
              Start Free Trial
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/sign-in" />}
              variant="ghost"
              className="h-10 px-5 text-xs border border-border-subtle text-text-primary bg-transparent hover:bg-bg-surface-hover rounded-md"
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      
      <footer className="border-t border-border-subtle bg-bg-primary py-12 text-center">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="flex size-5 shrink-0 items-center justify-center bg-transparent">
              <Image
                src="/logo2.svg"
                alt="PRRabbit Logo"
                width={20}
                height={20}
                className="object-contain"
              />
            </span>
            <span className="text-xs font-heading font-semibold text-text-primary tracking-tight">
              PRRabbit
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-text-tertiary">
            <Link href="#features" className="hover:text-text-secondary transition-colors">Docs</Link>
            <Link href="https://github.com" target="_blank" className="hover:text-text-secondary transition-colors inline-flex items-center gap-0.5">
              GitHub <ExternalLink className="size-2.5" />
            </Link>
            <Link href="#pricing" className="hover:text-text-secondary transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-text-secondary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-text-secondary transition-colors">Terms</Link>
          </div>
          <p className="text-[11px] text-text-tertiary">
            © {new Date().getFullYear()} PRRabbit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

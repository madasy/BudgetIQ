import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { DocPage } from "./doc-page";

const releaseChecklist = [
  { label: "Run type check + lint", value: "npm run lint" },
  { label: "Generate production build", value: "npm run build" },
  { label: "Verify preview bundle", value: "npm run preview" },
  { label: "Smoke test core pages", value: "/, /budget, /expenses, /settings" },
];

const deploymentPlatforms = [
  {
    name: "Vercel",
    description: "Zero-config deployment with automatic HTTPS and global CDN",
    command: "vercel",
  },
  {
    name: "Netlify",
    description: "Deploy with continuous integration and form handling",
    command: "netlify deploy --prod",
  },
  {
    name: "GitHub Pages",
    description: "Free hosting for static sites with custom domains",
    command: "npm run build && gh-pages -d dist",
  },
  {
    name: "Cloudflare Pages",
    description: "Fast global deployment with edge computing",
    command: "wrangler pages deploy dist",
  },
];

export default function ReleasePage() {
  return (
    <DocPage
      title="Release"
      description="Prepare your application for deployment."
    >
      <div className="space-y-10 pb-16">
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Production Build
            </h2>
            <p className="text-muted-foreground mb-4">
              Vite creates an optimized production build in the <code>dist</code> directory. The build process includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>TypeScript compilation and type checking</li>
              <li>Code minification and tree-shaking</li>
              <li>Asset optimization and chunk splitting</li>
              <li>Source map generation (optional)</li>
            </ul>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Release checklist</CardTitle>
                <CardDescription>
                  Keep every deployment consistent and auditable.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {releaseChecklist.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-2xl border p-4"
                  >
                    <Shield className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
              <CardHeader>
                <CardTitle>Need more?</CardTitle>
                <CardDescription>
                  Extend the toolkit with additional layouts, charts, or content.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Duplicate any page under `src/pages`, wire it in `App.tsx`, and
                  leverage the same UI primitives. For bespoke data, co-locate
                  hooks under `src/hooks` or fetch via TanStack Query.
                </p>
                <Separator />
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" asChild>
                    <Link to="/settings">See settings system</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/accounts">Inspect cards</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Deployment Platforms
            </h2>
            <p className="text-muted-foreground mb-4">
              BudgetIQ React can be deployed to any static hosting service. Here are some popular options:
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {deploymentPlatforms.map((platform) => (
              <Card key={platform.name}>
                <CardHeader>
                  <CardTitle className="text-base">{platform.name}</CardTitle>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-xs">{platform.command}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Environment Variables
            </h2>
            <p className="text-muted-foreground mb-4">
              For production deployments, ensure environment variables are properly configured:
            </p>
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm font-medium mb-2">Important Notes:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                <li>All Vite env variables must be prefixed with <code>VITE_</code></li>
                <li>Set environment variables in your hosting platform's dashboard</li>
                <li>Never commit sensitive keys to version control</li>
                <li>Use different values for development and production</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DocPage>
  );
}

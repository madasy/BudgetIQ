import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { DocPage } from "./doc-page";

export default function ConfigurationPage() {
  return (
    <DocPage
      title="Configuration"
      description="Customize the look and feel of your application."
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            Unlock the full potential of BudgetIQ by customizing its appearance and
            behavior to perfectly suit your needs and brand identity.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Theme Configuration
              </CardTitle>
              <CardDescription>
                Tailor the visual appearance of your BudgetIQ application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Dive into how to configure the layout, typography, icons, and
                overall color theme of your BudgetIQ application. Make it truly
                yours!
              </p>
              <Button variant="outline" asChild>
                <Link to="/docs/configuration/theme-config">View Details</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Vite Configuration
              </CardTitle>
              <CardDescription>
                Customize build settings and development server.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configure Vite settings including path aliases, plugins, server options, and build optimizations in <code>vite.config.ts</code>.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Path aliases: <code>@/</code> → <code>./src</code></p>
                <p>• Plugins: React, Tailwind CSS, SVGR</p>
                <p>• HMR: Enabled with overlay disabled</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                TypeScript Configuration
              </CardTitle>
              <CardDescription>
                Type safety and compiler options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                TypeScript is configured with strict mode enabled. Configuration files:
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• <code>tsconfig.json</code> - Base configuration</p>
                <p>• <code>tsconfig.app.json</code> - App-specific settings</p>
                <p>• <code>tsconfig.node.json</code> - Node/build tools</p>
                <p>• Strict mode, path aliases, and modern ES features</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Build & Scripts
              </CardTitle>
              <CardDescription>
                Available npm scripts and build options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Available scripts in <code>package.json</code>:
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• <code>npm run dev</code> - Start development server</p>
                <p>• <code>npm run build</code> - Type check + production build</p>
                <p>• <code>npm run lint</code> - Run ESLint</p>
                <p>• <code>npm run preview</code> - Preview production build</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DocPage>
  );
}

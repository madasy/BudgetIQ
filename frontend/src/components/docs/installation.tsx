import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { DocPage } from "./doc-page";

export default function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Get up and running with BudgetIQ React."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-muted-foreground">
            Follow these steps to set up the BudgetIQ React dashboard template locally.
          </p>
        </div>

        <div className="space-y-4">
          <h2
            id="prerequisites"
            className="scroll-m-20 text-2xl font-semibold tracking-tight pt-4"
          >
            Prerequisites
          </h2>
          <p>Ensure you have the following installed:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Node.js 18.0.0</strong> or later
            </li>
            <li>
              <strong>npm</strong>, <strong>yarn</strong>, or{" "}
              <strong>pnpm</strong> package manager
            </li>
          </ul>

          <h2
            id="getting-started"
            className="scroll-m-20 text-2xl font-semibold tracking-tight pt-6"
          >
            Getting Started
          </h2>
          <p>
            Install dependencies and start the development server:
          </p>

          <Tabs defaultValue="npm">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="yarn">Yarn</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            </TabsList>

            {/* NPM Instructions */}
            <TabsContent value="npm" className="space-y-4 mt-4">
              <h3 className="text-xl font-semibold">Using npm</h3>
              <p>Install dependencies:</p>
              <CodeBlock command="npm install" />
              <p>Start dev server:</p>
              <CodeBlock command="npm run dev" />
              <p>Build for production:</p>
              <CodeBlock command="npm run build" />
            </TabsContent>

            {/* Yarn Instructions */}
            <TabsContent value="yarn" className="space-y-4 mt-4">
              <h3 className="text-xl font-semibold">Using Yarn</h3>
              <p>Install dependencies:</p>
              <CodeBlock command="yarn install" />
              <p>Start dev server:</p>
              <CodeBlock command="yarn dev" />
              <p>Build for production:</p>
              <CodeBlock command="yarn build" />
            </TabsContent>

            {/* pnpm Instructions */}
            <TabsContent value="pnpm" className="space-y-4 mt-4">
              <h3 className="text-xl font-semibold">Using pnpm</h3>
              <p>Install dependencies:</p>
              <CodeBlock command="pnpm install" />
              <p>Start dev server:</p>
              <CodeBlock command="pnpm dev" />
              <p>Build for production:</p>
              <CodeBlock command="pnpm build" />
            </TabsContent>
          </Tabs>

          <div className="mt-6">
             <p>
                Visit{" "}
                <a
                  href="http://localhost:5173"
                  className="text-primary underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  http://localhost:5173
                </a>{" "}
                in your browser to preview the dashboard.
              </p>
          </div>

          <h2
            id="development-server"
            className="scroll-m-20 text-2xl font-semibold tracking-tight pt-6"
          >
            Development Server
          </h2>
          <p>
            Vite provides a lightning-fast development experience with:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Hot Module Replacement (HMR):</strong> Instant updates without full page reload</li>
            <li><strong>Fast Refresh:</strong> Preserves component state during development</li>
            <li><strong>Native ES Modules:</strong> No bundling required in development</li>
            <li><strong>Optimized Builds:</strong> Production builds use Rollup for optimal performance</li>
          </ul>

          <h2
            id="environment-setup"
            className="scroll-m-20 text-2xl font-semibold tracking-tight pt-6"
          >
            Environment Setup
          </h2>
          <p>
            Create a <code>.env</code> file in the root directory for environment variables:
          </p>
          <CodeBlock command="# .env.example\n# Add your environment variables here\nVITE_API_URL=http://localhost:3000" />
          <p className="text-sm text-muted-foreground mt-2">
            Note: All Vite environment variables must be prefixed with <code>VITE_</code> to be accessible in the browser.
          </p>

          <h2
            id="next-steps"
            className="scroll-m-20 text-2xl font-semibold tracking-tight pt-6"
          >
            Next Steps
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <Link
                to="/docs/configuration"
                className="text-primary hover:underline"
              >
                Configure the application
              </Link>
            </li>
            <li>
              <Link
                to="/docs/configuration/theme-config"
                className="text-primary hover:underline"
              >
                Customize the theme
              </Link>
            </li>
            <li>
              <Link
                to="/docs/components"
                className="text-primary hover:underline"
              >
                Explore components
              </Link>
            </li>
            <li>
              <Link
                to="/docs/routing"
                className="text-primary hover:underline"
              >
                Understand routing structure
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </DocPage>
  );
}

// Reusable copyable code block
function CodeBlock({ command }: { command: string }) {
  return (
    <div className="relative my-4 rounded-md bg-muted p-4">
      <pre className="text-sm font-mono">
        <code>{command}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => {
          navigator.clipboard.writeText(command);
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  );
}

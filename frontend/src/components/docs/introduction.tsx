import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DocPage } from "./doc-page";

export default function IntroductionPage() {
  return (
    <DocPage
      title="Introduction"
      description="Welcome to the BudgetIQ React documentation."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-muted-foreground text-lg">
            BudgetIQ React is a premium finance dashboard template built with <strong>React 19</strong>, <strong>Vite</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS 4</strong>. 
            It provides a robust foundation for building modern fintech applications with a focus on developer experience and performance.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            What is BudgetIQ React?
          </h2>
          <p className="leading-7">
            BudgetIQ React is a developer-first dashboard template. It is not a fully functional banking application but rather a comprehensive UI kit and design system. 
            It comes with pre-built pages for dashboards, accounts, budgets, and more, along with a rich library of reusable components.
          </p>

          <h2 className="text-2xl font-semibold tracking-tight pt-4">
            Key Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Tech Stack:</strong> Built with React 19, Vite, TypeScript, and Tailwind CSS 4 for blazing fast development and production performance.
            </li>
            <li>
              <strong className="text-foreground">Vite Build Tool:</strong> Lightning-fast HMR (Hot Module Replacement), optimized production builds, and native ES modules support.
            </li>
            <li>
              <strong className="text-foreground">Component Library:</strong> Includes 50+ UI primitives (Shadcn UI) and 15+ specialized financial widgets.
            </li>
            <li>
              <strong className="text-foreground">Routing:</strong> React Router DOM v7 with nested routes, layout grouping, and programmatic navigation.
            </li>
            <li>
              <strong className="text-foreground">Theming System:</strong> Advanced theming with support for Light/Dark modes, RTL direction, and multiple color themes (Teal, Pink, Blue, Purple, Red).
            </li>
            <li>
              <strong className="text-foreground">Data Visualization:</strong> Recharts integration for interactive financial charts with theme-aware colors.
            </li>
            <li>
              <strong className="text-foreground">Form Handling:</strong> React Hook Form with Zod validation for type-safe form management.
            </li>
            <li>
              <strong className="text-foreground">Responsive Design:</strong> Mobile-first approach ensuring a seamless experience across all devices.
            </li>
            <li>
              <strong className="text-foreground">Developer Experience:</strong> Strictly typed with TypeScript, linted with ESLint, and formatted for consistency.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold tracking-tight pt-6">
            Project Structure
          </h2>
          <p className="leading-7">
            The project follows a well-organized structure for maintainability and scalability:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            <code>{`budgetiq-react/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Shadcn UI primitives
│   │   ├── dashboard/   # Dashboard-specific widgets
│   │   ├── layout/      # Layout components (Header, Sidebar)
│   │   └── docs/        # Documentation components
│   ├── pages/           # Page components (routes)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main app router
│   ├── main.tsx         # Application entry point
│   └── globals.css      # Global styles and CSS variables
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts`}</code>
          </pre>

          <h2 className="text-2xl font-semibold tracking-tight pt-6">
            Technology Stack
          </h2>
          <div className="space-y-3">
            <div>
              <strong className="text-foreground">Core:</strong>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-1">
                <li>React 19.1.1 - UI library</li>
                <li>Vite 7.1.7 - Build tool and dev server</li>
                <li>TypeScript 5.9.3 - Type safety</li>
                <li>React Router DOM 7.9.4 - Client-side routing</li>
              </ul>
            </div>
            <div>
              <strong className="text-foreground">Styling:</strong>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-1">
                <li>Tailwind CSS 4.1.16 - Utility-first CSS framework</li>
                <li>CSS Variables - Dynamic theming</li>
                <li>OKLCH Color Space - Perceptually uniform colors</li>
              </ul>
            </div>
            <div>
              <strong className="text-foreground">UI Components:</strong>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-1">
                <li>Radix UI - Accessible component primitives</li>
                <li>Shadcn UI - Pre-styled component library</li>
                <li>Lucide React - Icon library</li>
              </ul>
            </div>
            <div>
              <strong className="text-foreground">Data & Forms:</strong>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-1">
                <li>Recharts 2.15.4 - Chart library</li>
                <li>React Hook Form 7.65.0 - Form management</li>
                <li>Zod 4.1.12 - Schema validation</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button asChild>
              <Link to="/docs/installation">Next: Installation</Link>
            </Button>
          </div>
        </div>
      </div>
    </DocPage>
  );
}

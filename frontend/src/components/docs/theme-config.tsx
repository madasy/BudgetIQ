import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DocPage } from "./doc-page";

export default function ThemeConfigPage() {
  return (
    <DocPage
      title="Theme & Customization"
      description="Customize styles, components, layout, and functionality."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-muted-foreground">
            BudgetIQ React uses a powerful theming system built on top of <strong>Tailwind CSS 4</strong> and <strong>CSS Variables</strong>. 
            It supports multiple color themes, light/dark modes, and RTL direction out of the box.
          </p>
        </div>

        <div className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-tight">
            1. Global Styles & Variables
          </h2>
          <p>
            All design tokens and color variables are defined in <code>src/globals.css</code>. 
            We use the <strong>OKLCH</strong> color space for consistent perceptual brightness across themes.
          </p>
          <p className="text-muted-foreground text-sm">
            You can customize the primary colors, chart colors, and sidebar colors by modifying the CSS variables in the <code>:root</code> and <code>.dark</code> blocks.
          </p>

          <h2 className="text-2xl font-semibold tracking-tight pt-6">
            2. Theme Provider
          </h2>
          <p>
            The application is wrapped in a <code>ThemeProvider</code> (located in <code>src/components/theme/theme-provider.tsx</code>) which manages:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Theme:</strong> Light / Dark / System</li>
            <li><strong>Color Scheme:</strong> Teal (default), Pink, Blue, Purple, Red</li>
            <li><strong>Layout:</strong> Vertical / Horizontal</li>
            <li><strong>Direction:</strong> LTR / RTL</li>
          </ul>

          <h2 className="text-2xl font-semibold tracking-tight pt-6">
            3. Creating a Custom Theme
          </h2>
          <p>
            To add a new color theme:
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Open <code>src/globals.css</code>.</li>
            <li>Define a new class (e.g., <code>:root.theme-orange</code>) and override the CSS variables.</li>
            <li>Add the new theme key to <code>src/components/theme/default-config.ts</code>.</li>
          </ol>

          <h2 className="text-2xl font-semibold tracking-tight pt-6">
            4. Layout Configuration
          </h2>
          <p>
            The layout system supports both vertical (sidebar) and horizontal (navbar) modes. 
            This is controlled via the <code>ThemeContext</code> and can be toggled at runtime using the <code>ThemeConfig</code> dialog.
          </p>

          <div className="flex gap-4 pt-6">
            <Button asChild>
              <Link to="/docs/components">Next: Components</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/docs/configuration">Back to Configuration</Link>
            </Button>
          </div>
        </div>
      </div>
    </DocPage>
  );
}

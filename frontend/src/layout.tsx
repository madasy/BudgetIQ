// import { QuickAddButton } from "@/components/layout/quick-add-button";
// import { SupportChat } from "@/components/layout/support-chat";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider>
        <Toaster position="top-right" richColors />
        <main className="w-full">{children}</main>
        {/* <QuickAddButton />
      <SupportChat /> */}
      </ThemeProvider>
    </>
  );
}
